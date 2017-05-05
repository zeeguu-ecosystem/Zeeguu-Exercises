/** Custom exercise form finding word in a context. Inherited from Exercise.js
 *  @initialize it using: new Ex1();
 *  @customize it by using prototypal inheritance 
**/

import $ from 'jquery';
import Exercise from './exercise';
import Util from '../util';


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
	}
	
	/** @Override */
	this.bindUIActions = function(){
		var _this = this;
		//Bind UI action of Hint/Show solution to the function		
		this.$showSolution.on("click", _this.handleHint.bind(this));
		
		//Bind UI action of Check answer to the function
		this.$checkAnswer.on("click", _this.checkAnswer.bind(this));
		
		//Bind UI Text click		
		this.$clickableText.on("click",_this.updateInput.bind(this));
		
		// Bind UI Enter Key
		this.$input.keyup(_this.enterKeyup.bind(this));
	}
	
	/** @Override */
	this.next = function (){
		this.$to.html("\""+this.data[this.index].to+"\"");
		this.$context.html(this.data[this.index].context);
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
	
	/** @Override */
	this.giveHint = function (){
		this.$input.val(this.data[this.index].from);
	}
	
	/** @Override */
	this.successCondition = function(){
		return (this.$input.val().trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === this.data[this.index].from.trim().toUpperCase().replace(/[^a-zA-Z ]/g, ""));
	}
};
Ex1.prototype = Object.create(Exercise.prototype, {
	constructor: Ex1,
	/************************** SETTINGS ********************************/	
	description: {value: "Find the word in the context:"},
	customTemplateURL: {value: 'static/template/ex1.html'},	
});

export default Ex1;