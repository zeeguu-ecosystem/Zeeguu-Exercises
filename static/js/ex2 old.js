
function next(){		
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



function btnSelect(btnID){
	var contextElem  = document.getElementById("ex-context");
	var chosenWord = document.getElementById("btn"+btnID).innerHTML;	
	reGenerateContext(contextElem,chosenWord);	
	checkAnswer(chosenWord);	
	generateContext();
}

function reGenerateContext(contextElem,chosenWord){
	var contextString = contextElem.innerHTML;
	var res = chosenWord.split(" ");	
	
	for (i = 0; i <res.length; i++){
		contextString = contextString.replace(" ______ ",res[i].bold());
	}	
	contextElem.innerHTML =  contextString;
}

function generateContext(){
	var contextString = data[index].context;
	var res = data[index].from.split(" ");	
	
	for (i = 0; i <res.length; i++){
		contextString = contextString.replace(res[i]," ______ ");
	}	
	this.$context.html(contextString);
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
	if (){		
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
	}	
}



