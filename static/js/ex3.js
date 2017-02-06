function Ex3(){
	this.init();
	
	/** @Override */
	this.customCacheDom = function(){	
		this.$context 				= this.$elem.find("#ex-context");
		this.$showSolution 			= this.$elem.find("#show_solution");
		this.$btn1 					= this.$elem.find("#btn1");
		this.$btn2 					= this.$elem.find("#btn2");
		this.$btn3 					= this.$elem.find("#btn3");	
		this.$btn4 					= this.$elem.find("#btn4");
		this.$btn5 					= this.$elem.find("#btn5");
		this.$btn6 					= this.$elem.find("#btn6");			
	};
	
	
	/** @Override */
	this.bindUIActions = function(){
		//Bind UI action of Hint/Show solution to the function		
		this.$showSolution.on("click", this.giveHint.bind(this));
		
		//Bind UI action of Check answer to the function
		//this.$checkAnswer.on("click", _this.checkAnswer.bind(this));
		
		//Bind UI action of button 1 click to the function
		this.$btn1.on("click", this.selectChoice.bind(this,1));
		
		//Bind UI action of button 2 click to the function
		this.$btn2.on("click", this.selectChoice.bind(this,2));
		
		//Bind UI action of button 3 click to the function
		this.$btn3.on("click", this.selectChoice.bind(this,3));
		
		//Bind UI action of button 4 click to the function
		this.$btn4.on("click", this.selectChoice.bind(this,4));
		
		//Bind UI action of button 5 click to the function
		this.$btn5.on("click", this.selectChoice.bind(this,5));
		
		//Bind UI action of button 6 click to the function
		this.$btn6.on("click", this.selectChoice.bind(this,6));
		
	};
	
	
	
	this.selectChoice = function(btnID){
	// if no butten was previously selected, select it now
	if(this.chosenButton == -1){
		this.chosenButton = btnID;
	}else{
		// otherwise check the selection
		this.checkAnswer(btnID);
	}
	};
	
	this.successDisableBtn = function(btnID){
		var elem = $("#btn"+btnID);
		elem.prop('disabled', true);
		elem.addClass("btn-success");
	}
	
	this.isDisabled = function(btnID){
		var elem = $("#btn"+btnID);
		return elem.is(':disabled');
	}
	
	this.correctAnswersCheck = function(){
		// If the user has given all 3 answers, proceed to next exercise
		if(this.correctAnswers >= 3){
		
			
			this.index++;
			
			// Reset buttons, answers, hints
			this.resetBtns();
			this.correctAnswers = 0;
			this.hints = 0;
			
			// Show progress
			this.animateSuccess();
			ProgressBar.move();
			
			
			// The exercises are complete
			if(this.index == this.data.length){
				this.onExComplete();
				return;
			}
			// Populate next exercise
			setTimeout(this.next(), 2000);		
		}
	
	}
	
	this.checkAnswer = function(btnID){
		if(this.successCondition(btnID,this.chosenButton)){
			
			this.correctAnswers ++;
			
			// Disable buttons		
			this.successDisableBtn(btnID);
			this.successDisableBtn(this.chosenButton);
			
			
			// check if all the answers were given
			this.correctAnswersCheck();
		}else{
			this.wrongAnswerAnimation();
		}
		this.chosenButton = -1;	
	};
	
	this.successCondition = function(id1,id2){
		return answers.indexOf(id1) == choices.indexOf(id2);
	};
	
	this.resetBtns = function(){
		for(var idx = 1; idx<=6; idx++){
			var elem = $('#btn'+idx);
			elem.prop('disabled', false);
			elem.removeClass("btn-success");
		}
	};
	
	
	/** @Override */
	this.next = function (){
		
		//Remove the ex description when the ex is started
		if(this.index != 0){
			this.$description.fadeOut(300, function() { $(this).remove(); });
		}
		
		//Random options
		var idxs = randomNums(this.data.length-1);
		
		// random numbers between 1 and 3
	     choices  = randomNums(3);
		 
		// random numbers between 4 and 6
		 answers = randomNums(3);
		for (var i=0; i<answers.length; i++){
			answers[i] = answers[i] + 3;
		}
		
		//Populate buttons // TO DO
		document.getElementById("btn"+choices[0]).innerHTML = this.data[this.index].from;
		document.getElementById("btn"+choices[1]).innerHTML = this.data[idxs[0]].from;
		document.getElementById("btn"+choices[2]).innerHTML = this.data[idxs[1]].from;
		
		document.getElementById("btn"+answers[0]).innerHTML = this.data[this.index].to;
		document.getElementById("btn"+answers[1]).innerHTML = this.data[idxs[0]].to;
		document.getElementById("btn"+answers[2]).innerHTML = this.data[idxs[1]].to;		
	};
	
	this.giveHint = function (){
	
		if(this.hints < 1){
			// Disable buttons
			if(!this.isDisabled(answers[2])){
				this.successDisableBtn(choices[2]);
				this.successDisableBtn(answers[2]);
				this.correctAnswers++;
				this.correctAnswersCheck();
				this.hints++;
				return;
			}
			
			if (!this.isDisabled(answers[1])){
				this.successDisableBtn(choices[1]);
				this.successDisableBtn(answers[1]);
				this.correctAnswers++;
				this.correctAnswersCheck();
				this.hints++;
				return;
			}
			
			if (!this.isDisabled(answers[0])){
				this.successDisableBtn(choices[0]);
				this.successDisableBtn(answers[0]);
				this.correctAnswers++;
				this.correctAnswersCheck();
				this.hints++;
				return;
			}
		}
		
	};
	
	randomNums = function(size){
	var arr = []
		while(arr.length < size){
			var randomnumber = Math.ceil(Math.random()*size)
			if(arr.indexOf(randomnumber) > -1) continue;
			arr[arr.length] = randomnumber;
		}
	return arr;
	};
	
};

Ex3.prototype = Object.create(Exercise.prototype, {
	constructor: Ex3,
	/************************** SETTINGS ********************************/	
	size: 		 {value: 6}, 
	description: {value: "Match each word with its translation"},
	templateURL: {value: '../static/template/ex3.html'},
	choices: 	 { writable: true, value:[1,2,3]},				// arr of indexes of possible choices
	answers: 	{ writable: true, value:[1,2,3]},				// arr of indexes of possible answers
	chosenButton: { writable: true, value:-1},  	// ID of currently selected button; -1 means no button is selected
	correctAnswers: { writable: true, value:0},	// number of correct answers
	hints: {writable:true, value:0}				// max number of possible hints is 1
	/*******************************************************************/
});