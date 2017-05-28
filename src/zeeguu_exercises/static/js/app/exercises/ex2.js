import $ from 'jquery';
import Exercise from './exercise';
import Settings from "../settings";

function Ex2(data,index,size){
	this.init(data,index,size);
	
	/** @Override */
	this.cacheCustomDom = function(){	
		this.$context 				= this.$elem.find("#ex-context");
		this.$showSolution 			= this.$elem.find("#show_solution");
		this.$checkAnswer 			= this.$elem.find("#check_answer");		
		this.$btn1 					= this.$elem.find("#btn1");
		this.$btn2 					= this.$elem.find("#btn2");
		this.$btn3 					= this.$elem.find("#btn3");
		this.$nextExercise			= this.$elem.find('#next-exercise');
        this.$feedbackBtn			= this.$elem.find('#feedback');
	}
	
	/** @Override */
	this.bindUIActions = function(){
		var _this = this;
		//Bind UI action of Hint/Show solution to the function		
		this.$showSolution.on("click", this.handleHint.bind(this));
		
		//Bind UI action of Check answer to the function
		this.$checkAnswer.on("click", this.checkAnswer.bind(this));
		
		//Bind UI action of button 1 click to the function
		this.$btn1.on("click", this.btnSelect.bind(this,1));
		
		//Bind UI action of button 2 click to the function
		this.$btn2.on("click", this.btnSelect.bind(this,2));
		
		//Bind UI action of button 3 click to the function
		this.$btn3.on("click", this.btnSelect.bind(this,3));

		//Next exercise clicked
		this.$nextExercise.on("click",this.onRenderNextEx.bind(this));

        //Next exercise clicked
		this.$feedbackBtn.on("click",this.giveFeedbackBox.bind(this));
	}
	
	/** @Override */
	this.next = function(){		
		
		// Prepare the document
		this.prepareDocument();
		
		//Populate context
		this.generateContext();			
		this.resetBtns();
		var _this = this;
		
		//Random options	
		var idxs  = this.randomNumsInRange(2,this.data.length-1);
		this.btns = this.arrayWithRandomNumsUpTo(this.optionNum);
		
		
		//Populate buttons
		function populateButton(buttonID, value) {
			_this["$btn"+buttonID].text(value);
		}

		populateButton(this.btns[0], this.data[this.index].from);
		populateButton(this.btns[1], this.data[idxs[0]].from);
		populateButton(this.btns[2], this.data[idxs[1]].from);
	}
	
	/** @Override */
	this.giveHint = function (){
		var elem = $('#btn'+this.btns[1]);
		elem.prop('disabled', true);
		elem.addClass("btn-danger");
	}
	
	/** @Override */
	this.successCondition = function(chosenWord){
		return (chosenWord.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === this.data[this.index].from.trim().toUpperCase().replace(/[^a-zA-Z ]/g, ""));
	}

	/** @Override */
	this.wrongAnswerAnimation = function(){
		this.shake.shakeFocusedElement();
	}
	
	this.btnSelect = function(arg){
		var chosenWord = this["$btn"+arg].text();	
		if (this.successCondition(chosenWord)) this.reGenerateContext(chosenWord);
		this.checkAnswer(chosenWord);	
	}

	this.resetBtns = function(){
		var elem = $('#btn'+this.btns[1]);
		elem.prop('disabled', false);
		elem.removeClass("btn-danger");
	}
	
	this.arrayWithRandomNumsUpTo = function(size){
		var arr = [];
		while(arr.length < size){
			var randomnumber = Math.ceil(Math.random()*size);
			if(arr.indexOf(randomnumber) > -1) continue;
			arr[arr.length] = randomnumber;
		}
		return arr;
	};
	
	/** Generates an array of random numbers of given size
	* @param {int} size:  defines how many random numbers we want
	* @param {int} range: defines the upper limit of the numbers: [1,range]
	*/
	this.randomNumsInRange = function(size,range){
		var arr = [];	
		while(arr.length < size){
			var randomnumber = Math.ceil(Math.random()*range);	
			if((arr.indexOf(randomnumber) > -1) || randomnumber==this.index) continue;
			arr[arr.length] = randomnumber;
		}		
		return arr;
	};
	
	
	this.generateContext = function(){
		var contextString = this.data[this.index].context;
		var res = this.data[this.index].from.split(" ");	
		
		for (var i = 0; i <res.length; i++){
			contextString = contextString.replace(res[i]," ______ ");
		}
		this.$context.html(contextString);
	};
	
	this.reGenerateContext = function(chosenWord){
		var contextString = this.$context.html();
		var res = chosenWord.split(" ");	
		
		for (var i = 0; i <res.length; i++){
			contextString = contextString.replace(" ______ ",res[i].bold());
		}	
		this.$context.html (contextString);
	};
};

Ex2.prototype = Object.create(Exercise.prototype, {
	constructor: Ex2,
	/** ************************** SETTINGS **************************** **/
	description: {value: "Choose the word that fits the context"},
	customTemplateURL: {value: 'static/template/ex2.html'},
	btns: 		 {writable: true, value:[1,2,3]}, 
	optionNum:	 {value: 3},
    minRequirement: { writable: true, value:3},	// minimum number required for the ex
	resultSubmitSource: {value: Settings.ZEEGUU_EX_SOURCE_SELECT},
	/** *************************************************************** **/
});

export default Ex2;
