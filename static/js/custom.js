
var session = 11010001;
var START_TIME;
var END_TIME;
var size = 12;
var ADDRESS = "https://zeeguu.unibe.ch/bookmarks_to_study/"+size+"?session="+session;

console.log(ADDRESS);
var data;

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
		return;
	}
	console.log("inside init:" +data[index]);
	document.getElementById("ex-to").innerHTML = "\""+data[index].to+"\"";
	document.getElementById("ex-context").innerHTML = data[index].context;
	document.getElementById("ex-main-input").value = "";
}

function checkAnswer(){
	if (document.getElementById("ex-main-input").value.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === data[index].from.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "")){		
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
	}
	
}
$("#ex-main-input").keyup(function(event){
    if(event.keyCode == 13){
        $("#check_answer").click();
    }
});

function restart(){
	restart_progress_bar();
	start();
}

function showAnswer(){
	document.getElementById("ex-main-input").value =  data[index].from;
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

