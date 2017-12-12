/** Custom exercise form finding word in a context. Inherited from Exercise.js
 *  @initialize it using: new Ex1();
 *  @customize it by using prototypal inheritance 
**/

import $ from 'jquery';
import Exercise from './exercise';
import Util from '../util';
import Settings from "../settings";


function Ex1(data,index,size){
	
	this.init(data,index,size);
	
	/** @Override */
	this.cacheCustomDom = function(){	
		this.$to 					= this.$elem.find("#ex-to");
		this.$context 				= this.$elem.find("#ex-context");
		this.$input 				= this.$elem.find("#ex-main-input");
		this.$showSolution 			= this.$elem.find("#show_solution");
		this.$checkAnswer 			= this.$elem.find("#check_answer");
		this.$clickableText 		= this.$elem.find(".clickable-text");
		this.$nextExercise			= this.$elem.find('#next-exercise');
        this.$feedbackBtn			= this.$elem.find('#feedback');
	};
	
	/** @Override */
	this.bindUIActions = function(){
		//Bind UI action of Hint/Show solution to the function		
		this.$showSolution.on("click", this.handleHint.bind(this));
		
		//Bind UI action of Check answer to the function
		this.$checkAnswer.on("click", this.checkAnswer.bind(this));
		
		//Bind UI Text click		
		this.$clickableText.on("click",this.updateInput.bind(this));
		
		// Bind UI Enter Key
		this.$input.keyup(this.enterKeyup.bind(this));

		//Next exercise clicked
		this.$nextExercise.on("click",this.onRenderNextEx.bind(this));

        //Feedback for the previous bookmark: this.index
		this.$feedbackBtn.click(() => {this.giveFeedbackBox(this.index);});
	};
	
	/** @Override */
	this.next = function (){
		this.$to.html("\""+this.data[this.index].to+"\"");
		this.$context.html(this.data[this.index].context);
		this.$input.val("").attr("placeholder", "");
		this.reStyleDom();
	};
	
	this.updateInput = function() {
		var t = Util.getSelectedText();
		this.$input.val(this.$input.val().trim() + " " + t);
	};
	
	this.enterKeyup = function(event){
		if(event.keyCode == 13){
			if(!this.getInstanceState())//If in the primary state of footer
				this.$checkAnswer.click();
			else //If in the secondary state of footer
				this.$nextExercise.click();
		}
	};

	/**
	 * Formats the string for comparing
	 * @param {String}, text, to be formatted
	 * @return {String}, the formatted string
	 * removes numbers and symbols, multiple space, tabs, new lines are replaced by single space
	 * */
	this.formatStringForCheck = function (text) {
		return text.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "").replace(/\s\s+/g, ' ');
	};
	
	/** @Override */
	this.giveHint = function (){
		// Reveal X letters of the answer, where X is the number of times the Hint button was clicked.
		var answer = this.data[this.index].from;
		var hint = answer.slice(0, this.hintsUsed);
		var numberOfDots = answer.length - hint.length;
		
		// Add dots after the revealed letters, to show how long the answer is.
		var hintWithDots = hint;
		for (var i = 0; i < numberOfDots; i++) {
			hintWithDots += ".";
		}
		
		this.$input.attr("placeholder", hintWithDots);
	};
	
	/** @Override */
	this.successCondition = function(){
		return (this.formatStringForCheck(this.$input.val()) === this.formatStringForCheck(this.data[this.index].from));
	};


	/** @Override */
	this.wrongAnswerAnimation = function(){
		this.shake.shakeElement(this.$input);
	};

}

Ex1.prototype = Object.create(Exercise.prototype, {
	constructor: Ex1,
	/************************** SETTINGS ********************************/	
	description: {value: "Find the word in the context:"},
	customTemplateURL: {value: 'static/template/exercise/ex1.html'},
	resultSubmitSource: {value: Settings.ZEEGUU_EX_SOURCE_RECOGNIZE},
});

export default Ex1;