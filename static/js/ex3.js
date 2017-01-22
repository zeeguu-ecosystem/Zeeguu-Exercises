function Ex3(){
	this.init();
	
	/** @Override */
	this.customCacheDom = function(){	
		this.$context 				= this.$elem.find("#ex-context");	
		this.$btn1 					= this.$elem.find("#btn1");
		this.$btn2 					= this.$elem.find("#btn2");
		this.$btn3 					= this.$elem.find("#btn3");	
		this.$btn4 					= this.$elem.find("#btn4");
		this.$btn5 					= this.$elem.find("#btn5");
		this.$btn6 					= this.$elem.find("#btn6");			
	};
	
	
	/** @Override */
	this.bindUIActions = function(){
		var _this = this;
		//Bind UI action of Hint/Show solution to the function		
		//this.$showSolution.on("click", _this.giveHint.bind(this));
		
		//Bind UI action of Check answer to the function
		//this.$checkAnswer.on("click", _this.checkAnswer.bind(this));
		
		//Bind UI action of button 1 click to the function
		this.$btn1.on("click", selectChoice.bind(this,1));
		
		//Bind UI action of button 2 click to the function
		this.$btn2.on("click", selectChoice.bind(this,2));
		
		//Bind UI action of button 3 click to the function
		this.$btn3.on("click", selectChoice.bind(this,3));
		
		//Bind UI action of button 4 click to the function
		this.$btn4.on("click", selectAnswer.bind(this,4));
		
		//Bind UI action of button 5 click to the function
		this.$btn5.on("click", selectAnswer.bind(this,5));
		
		//Bind UI action of button 6 click to the function
		this.$btn6.on("click", selectAnswer.bind(this,6));
		
	};
	
	
	selectChoice = function(btnID){
	console.log("chosen button: " + btnID);
		chosenButton = btnID;
	};
	
	
	
	selectAnswer = function(btnID){
		if(answers.indexOf(btnID) == choices.indexOf(chosenButton)){
	
			// Disable buttons
			var elem = $("#btn"+btnID);
			elem.prop('disabled', true);
			elem.removeClass("btn-danger");
			
			elem = $("#btn"+ chosenButton);
			elem.prop('disabled', true);
			elem.removeClass("btn-danger");
			
			// If the user has given all 3 answers, proceed to next exercise
			this.correctAnswers ++;
			if(this.correctAnswers == 3){
			
				this.animateSuccess();
				ProgressBar.move();
				this.index++;
		
				// reset buttons and answers
				resetBtns();
				this.correctAnswers = 0;
			
				// The exersises are complete
				if(this.index == this.data.length){
					this.onExComplete();
					return;
				}
				setTimeout(this.next(), 2000);		
			}
		}else{
			this.wrongAnswerAnimation();
		}
	};
	
	resetBtns = function(){
		for(var idx = 1; idx<=6; idx++){
			var elem = $('#btn'+idx);
			elem.prop('disabled', false);
			elem.removeClass("btn-danger");
		}
	};
	
	
	/** @Override */
	this.next = function (){
		
		//Remove the ex description when the ex is started
		if(this.index != 0){
			this.$description.fadeOut(300, function() { $(this).remove(); });
		}
		
		//Random options
		var answer2 = Math.floor((Math.random() * this.data.length) );
				while(answer2 == this.index){
			answer2 = Math.floor((Math.random() * this.data.length)); 
		}
		
		var answer3 = Math.floor((Math.random() * this.data.length));	
		while(answer2 == answer3 || this.index == answer3){
			answer3 = Math.floor((Math.random() * this.data.length)); 
		}
		
		// random numbers between 1 and 3
	     choices  = randomNums(3);
		 
		// random numbers between 4 and 6
		 answers = randomNums(3);
		for (var i=0; i<answers.length; i++){
			answers[i] = answers[i] + 3;
		}
		

		console.log ( choices+ "  " + answers);
		
		//Populate buttons
		document.getElementById("btn"+choices[0]).innerHTML = this.data[this.index].from;
		document.getElementById("btn"+choices[1]).innerHTML = this.data[answer2].from;
		document.getElementById("btn"+choices[2]).innerHTML = this.data[answer3].from;
		
		document.getElementById("btn"+answers[0]).innerHTML = this.data[this.index].to;
		document.getElementById("btn"+answers[1]).innerHTML = this.data[answer2].to;
		document.getElementById("btn"+answers[2]).innerHTML = this.data[answer3].to;
		
		
	};
	
	
	randomNums = function(nr){
	var arr = []
		while(arr.length < nr){
			var randomnumber = Math.ceil(Math.random()*3)
			if(arr.indexOf(randomnumber) > -1) continue;
			arr[arr.length] = randomnumber;
		}
	return arr;
	};
	
};

Ex3.prototype = Object.create(Exercise.prototype, {
	constructor: Ex3,
	/************************** SETTINGS ********************************/	
	size: 		 {value: 3}, 
	description: {value: "Match each word with its translation"},
	templateURL: {value: '../static/template/ex3.html'},
	choices: 	 { writable: true, value:[1,2,3]},				// arr of indexes of possible choices
	answers: 	{ writable: true, value:[1,2,3]},				// arr of indexes of possible answers
	chosenButton: { writable: true, value:0},  	// ID of currently selected button
	correctAnswers: { writable: true, value:0},	// number of correct answers
	/*******************************************************************/
});