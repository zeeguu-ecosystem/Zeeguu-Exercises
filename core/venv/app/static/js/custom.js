
var session = 34563456;
var size = 8;
var ADDRESS = "https://zeeguu.unibe.ch/bookmarks_to_study/"+size+"?session="+session;

console.log(ADDRESS);
var data;

function testGetRequest(){
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
	if(index == data.length){
		alert("Finished with the set");
		index = 0;
		return;
	}
	console.log("inside init:" +data[index]);
	document.getElementById("ex-to").innerHTML = data[index].to;
	document.getElementById("ex-context").innerHTML = data[index].context;
	document.getElementById("ex-main-input").value = "";
}

function checkAnswer(){
	if (document.getElementById("ex-main-input").value == data[index].from){
		move_progress();
		index++;
		next();
	}else{
		alert("wrong answer");
	}	
	
}

function showAnswer(){
	document.getElementById("ex-main-input").value =  data[index].from;
}

function start()
{
	$.when(testGetRequest()).then(function (ldata) {
	  data = ldata;
	  console.log(ldata);
	  init();
	});	
}
window.onload = start;	

