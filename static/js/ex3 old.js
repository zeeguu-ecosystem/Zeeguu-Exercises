/** Modular Zeeguu Powered Exercise @author Vlad Turbureanu
 *  Initialize it using Exercise.init(percent,size);
**/

var ex,Exercise = {
	settings: {
		data: 0,
		session: 11010001, //for now hardcoded session number
		bookmarksURL: "https://zeeguu.unibe.ch/bookmarks_to_study/",
		index: 0,
		startTime: 0,
		endTime: 0,
		size: 12, //default number of bookmarks
		elem: $("#ex-container"),
		choices: 0,				// arr of indexes of possible choices
		answers: 0,				// arr of indexes of possible answers
		chosenButton: 0,  	// ID of currently selected button
		correctAnswers: 0,	// number of correct answers
	},
	
	/**
	 *	Exercise initialaizer
	**/
	init: function(){
		ex = this.settings;
		this.bindUIActions();
		this.start();
	},
	
	/**
	 *	Binding UI with Controller functions
	**/
	bindUIActions: function(){
	
		ex.elem.find("#btn1").on("click", function() {
			Exercise.selectChoice(1);
		});
		ex.elem.find("#btn2").on("click", function() {
			Exercise.selectChoice(2);
		});
		ex.elem.find("#btn3").on("click", function() {
			Exercise.selectChoice(3);
		});
		
		
		ex.elem.find("#btn4").on("click", function() {
			Exercise.selectAnswer(4);
		});
		ex.elem.find("#btn5").on("click", function() {
			Exercise.selectAnswer(5);
		});
		ex.elem.find("#btn6").on("click", function() {
			Exercise.selectAnswer(6);
		});
		
	},
	
	
	next: function (){
				
		//ex.elem.find("#ex-to").html("\""+ex.data[ex.index].to+"\"");
		//ex.elem.find("#ex-context").html(ex.data[ex.index].context);
		//ex.elem.find("#ex-main-input").val("");
		
		//Remove the ex description when the ex is started
		if(ex.index != 0){
			ex.elem.find("#ex-descript").fadeOut(300, function() { $(this).remove(); });
		}
		
		//Random options
		var answer2 = Math.floor((Math.random() * ex.data.length) );
				while(answer2 == ex.index){
			answer2 = Math.floor((Math.random() * ex.data.length)); 
		}
		
		var answer3 = Math.floor((Math.random() * ex.data.length));	
		while(answer2 == answer3 || ex.index == answer3){
			answer3 = Math.floor((Math.random() * ex.data.length)); 
		}
		
		// random numbers between 1 and 3
	     choices  = Exercise.randomNums(3);
		
		// random numbers between 4 and 6
		 answers = Exercise.randomNums(3);
		for (var i=0; i<answers.length; i++){
			answers[i] = answers[i] + 3;
		}
		
		//Populate buttons
		document.getElementById("btn"+choices[0]).innerHTML = ex.data[ex.index].from;
		document.getElementById("btn"+choices[1]).innerHTML = ex.data[answer2].from;
		document.getElementById("btn"+choices[2]).innerHTML = ex.data[answer3].from;
		
		document.getElementById("btn"+answers[0]).innerHTML = ex.data[ex.index].to;
		document.getElementById("btn"+answers[1]).innerHTML = ex.data[answer2].to;
		document.getElementById("btn"+answers[2]).innerHTML = ex.data[answer3].to;
		
		console.log ( choices+ "  " +answers);
	},
	
	randomNums: function(size){
	var arr = []
		while(arr.length < size){
			var randomnumber = Math.ceil(Math.random()*3)
			if(arr.indexOf(randomnumber) > -1) continue;
			arr[arr.length] = randomnumber;
		}
	return arr;
	},
	
	
	selectChoice: function(btnID){
		chosenButton = btnID;
	},
	
	selectAnswer: function(btnID){
		if(answers.indexOf(btnID) == choices.indexOf(chosenButton)){
	
			// disable buttons
			
			var elem = $("#btn"+btnID);
			elem.prop('disabled', true);
			elem.removeClass("btn-danger");
			
			elem = $("#btn"+chosenButton);
			elem.prop('disabled', true);
			elem.removeClass("btn-danger");
			
			// if the user has given all 3 answers, proceed to next exercise
			ex.correctAnswers++;
			console.log(ex.correctAnswers);
			if(ex.correctAnswers == 3){
				Exercise.move();
			}
		}else{
				swal({
				  title: "Wrong answer...",
				  allowOutsideClick: true,
				  type: "error",
				  text:  chosenButton + " means " + answers.indexOf(chosenButton),
				  confirmButtonText: "ok",
				  showConfirmButton: true,
				  allowEscapeKey:true,
				  showLoaderOnConfirm:true,
				});
			}
	},
	
	resetBtns: function(){
	
		for(var idx = 1; idx<=6; idx++){
			var elem = $('#btn'+idx);
			elem.prop('disabled', false);
			elem.removeClass("btn-danger");
		}
	},
	
	move: function (){
		this.animateSuccess();
		ProgressBar.move();
		ex.index++;
		
		// reset buttons and answers
		Exercise.resetBtns();
		ex.correctAnswers = 0;
		
		//The exersises are complete
		if(ex.index == ex.data.length){
			Exercise.onExComplete();
			return;
		}
		setTimeout(Exercise.next, 2000);		

	},
}