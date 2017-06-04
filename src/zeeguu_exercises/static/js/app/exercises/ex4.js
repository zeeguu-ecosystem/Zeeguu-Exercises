/** Custom exercise for translating the word given in the context. Inherited from Exercise.js
 *  @initialize it using: new Ex4();
 *  @customize it by using prototypal inheritance 
**/

import $ from 'jquery';
import Exercise from './exercise';
import Util from '../util';
import Settings from "../settings";

function Ex4(data,index,size){
	
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
	}
	
	/** @Override */
	this.bindUIActions = function(){
		var _this = this;
		//Bind UI action of Hint/Show solution to the function		
		this.$showSolution.on("click", this.handleHint.bind(this));
		
		//Bind UI action of Check answer to the function
		this.$checkAnswer.on("click", this.checkAnswer.bind(this));
		
		//Bind UI Text click		
		//this.$clickableText.on("click",updateInput.bind(this));
		
		// Bind UI Enter Key
		this.$input.keyup(this.enterKeyup.bind(this));

		//Next exercise clicked
		this.$nextExercise.on("click",this.onRenderNextEx.bind(this));

        //Next exercise clicked
		this.$feedbackBtn.on("click",this.giveFeedbackBox.bind(this));
	}
	
	/** @Override */
	this.next = function (){			
		this.$to.html("\""+this.data[this.index].from +"\"");
		this.$context.html(this.generateContext());
		this.$input.val("");
	}
	
	this.updateInput = function() {
		var t = Util.getSelectedText();
		this.$input.val(t);
	}
	
	this.enterKeyup = function(event){
		if(event.keyCode == 13){
			this.$checkAnswer.click();
		}
	}
	
	this.generateContext = function(){
		var contextString = this.data[this.index].context;
		var res = this.data[this.index].from.split(" ");	
		
		for (var i = 0; i <res.length; i++){
			contextString = contextString.replace(res[i], res[i].bold());
		}
			
		return contextString;		
	};
	
	
	/** @Override */
	this.giveHint = function (){
		this.$input.val(this.data[this.index].to[0]);
	}
	
	/** @Override */
	this.successCondition = function(){	
		// Check all the possible answers
		for (var i = 0; i<  this.data[this.index].to.length; i++)
		 if (this.$input.val().trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === this.data[this.index].to[i].trim().toUpperCase().replace(/[^a-zA-Z ]/g, ""))
			return true;
			
		return false;
	}

	/** @Override */
	this.wrongAnswerAnimation = function(){
		this.shake.shakeElement(this.$input);
	}

};
Ex4.prototype = Object.create(Exercise.prototype, {
	constructor: Ex4,
	/************************** SETTINGS ********************************/	
	description: {value: "Translate the word given in the context."},
	customTemplateURL: {value: 'static/template/exercise/ex4.html'},
	resultSubmitSource: {value: Settings.ZEEGUU_EX_SOURCE_TRANSLATE},
});

export default Ex4;

