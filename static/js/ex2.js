
var session = 34563456;
var START_TIME;
var END_TIME;
var size = 6;
var ADDRESS = "https://zeeguu.unibe.ch/bookmarks_to_study/"+size+"?session="+session;
var exContentElem;

console.log(ADDRESS);
var data;
var arr;

function getBookmarks(){
	return $.ajax({	  
	  type: 'GET',
	  dataType: 'json',
	  url: ADDRESS,
	  data: data,
	  success: function(data) {
		//
	  },
	  async: false
	});
}

var index;

function init(){
	exContentElem = document.getElementById("")
	index=0;
	next();
}

function next(){
	if(index !=0){
		$("#ex-descript").fadeOut(300, function() { $(this).remove(); });
	}
	
	//The exersises are complete
	if(index == data.length){
		swal({
		  title: "You rock!",
		  text: "That took less than "+ calcSessionTime() + ". practice more?",
		  type: "success",
		  showCancelButton: true,
		  confirmButtonColor: "#7eb530",
		  confirmButtonText: "Let's do it!",
		  closeOnConfirm: true
		},
		function(){
		  restart();
		});
		index = 0;
		submitResults();
		return;
	}

		
	//Populate context
	generateContext(document.getElementById("ex-context"));
	
	//Random options
	var answer2 = Math.floor((Math.random() * data.length) ); 
	var answer3 = Math.floor((Math.random() * data.length)); 	
	arr = randomNums(3);
	
	//Populate buttons
	document.getElementById("btn"+arr[0]).innerHTML = data[index].from;
	document.getElementById("btn"+arr[1]).innerHTML = data[answer2].from;
	document.getElementById("btn"+arr[2]).innerHTML = data[answer3].from;
}

function submitResults(){
	for(var i = 0; i< data.length;i++){
		$.post("https://www.zeeguu.unibe.ch/report_exercise_outcome/Too easy/Recognize/1000/"+data[i].id+"?session="+34563456);		
	}
}

function btnSelect(btnID){
	var contextElem  = document.getElementById("ex-context");
	var chosenWord = document.getElementById("btn"+btnID).innerHTML;	
	reGenerateContext(contextElem,chosenWord);
	
	checkAnswer(chosenWord);	
}

function reGenerateContext(contextElem,chosenWord){
	var contextString = contextElem.innerHTML;
	var res = chosenWord.split(" ");	
	
	for (i = 0; i <res.length; i++){
		contextString = contextString.replace(" ______ ",res[i].bold());
	}	
	contextElem.innerHTML =  contextString;
}

function generateContext(contextElem){
	var contextString = data[index].context;
	var res = data[index].from.split(" ");	
	
	for (i = 0; i <res.length; i++){
		contextString = contextString.replace(res[i]," ______ ");
	}	
	contextElem.innerHTML =  contextString;
}

function randomNums(size){
	var arr = []
	while(arr.length < size){
		var randomnumber = Math.ceil(Math.random()*3)
		if(arr.indexOf(randomnumber) > -1) continue;
		arr[arr.length] = randomnumber;
	}
	return arr;
}

function checkAnswer(chosenWord){
	if (chosenWord.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === data[index].from.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "")){		
		if(index != data.length-1){
				document.getElementById("ex-status").innerHTML = '<div id = "ex-status-container" class = "status-animation"><svg id = "temp-ex-success" class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div>';
				setTimeout(function(){
				  if ($('#ex-status-container').length > 0) {
					$('#ex-status-container').remove();
				  }
				}, 2000);			
		}
		move_progress();
		index++;
		resetBtns();
		setTimeout(next, 2000);
		
	}else{
		swal({
		  title: "Wrong answer...",
		  allowOutsideClick: true,
		  type: "error",
		  text: "Hint: the word starts with \"" +data[index].from.trim().charAt(0)+ "\"",
		  confirmButtonText: "ok",
		  showConfirmButton: true,
		  allowEscapeKey:true,
		  showLoaderOnConfirm:true,
		});
		
		generateContext( document.getElementById("ex-context"));
	}
	
}


function restart(){
	restart_progress_bar();
	start();
}

function showAnswer(){
	var elem = $('#btn'+arr[1]);
	elem.prop('disabled', true);
	elem.addClass("btn-danger");
}
function resetBtns(){
	var elem = $('#btn'+arr[1]);
	elem.prop('disabled', false);
	elem.removeClass("btn-danger");
}


function calcSessionTime(){
	END_TIME = new Date();
	var total = END_TIME.getMinutes()-START_TIME.getMinutes();
	return (total <= 1)?"1 minute":total + " minutes";
}

function start()
{
	$.when(getBookmarks()).then(function (ldata) {
	  data = ldata;
	  console.log(ldata);
	  init();
	  START_TIME = new Date();
	});	
}

window.onload = start;	

