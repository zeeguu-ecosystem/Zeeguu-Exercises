
var session = 11010001;
var INDEX;
var START_TIME;
var END_TIME;
var SIZE = 12;
var ADDRESS = "https://zeeguu.unibe.ch/bookmarks_to_study/"+SIZE+"?session="+session;


console.log(ADDRESS);
var data;

/**
 *	Ajax get request to the Zeeguu API to get new bookmarks
 *	To populate the excersise
**/
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

/**
 *	Initializes the INDEX and populates ex-fields with content using next
**/
function init(){
	ProgressBar.init(0,SIZE);
	INDEX=0;
	next();
}

/**
 *	Initializes the INDEX and populates ex-fields with concent using next
**/
function next(){
	//The exersises are complete
	if(INDEX == data.length){
		onExComplete();
		return;
	}	
	
	console.log("inside init:" +data[INDEX]);
	document.getElementById("ex-to").innerHTML = "\""+data[INDEX].to+"\"";
	document.getElementById("ex-context").innerHTML = data[INDEX].context;
	document.getElementById("ex-main-input").value = "";
	
	//Remove the ex desciption when the ex is started
	if(INDEX !=0){
		$("#ex-descript").fadeOut(300, function() { $(this).remove(); });
	}
}

/**
 *	When the ex are done perform an action
**/
function onExComplete(){
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
	INDEX = 0;
}

function checkAnswer(){
	if (document.getElementById("ex-main-input").value.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === data[INDEX].from.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "")){		
		if(INDEX != data.length-1){
			document.getElementById("ex-status").innerHTML = '<div id = "ex-status-container" class = "status-animation"><svg id = "temp-ex-success" class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div>';
			setTimeout(function(){
			  if ($('#ex-status-container').length > 0) {
				$('#ex-status-container').remove();
			  }
			}, 2000);				
		}
		ProgressBar.move();
		INDEX++;
		setTimeout(next, 2000);		
	}else{
		swal({
		  title: "Wrong answer...",
		  allowOutsideClick: true,
		  type: "error",
		  text: "Hint: the word starts with \"" +data[INDEX].from.trim().charAt(0)+ "\"",
		  confirmButtonText: "ok",
		  showConfirmButton: true,
		  allowEscapeKey:true,
		  showLoaderOnConfirm:true,
		});
	}
	
}

function restart(){
	ProgressBar.restart();
	start();
}

function showAnswer(){
	document.getElementById("ex-main-input").value =  data[INDEX].from;
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

