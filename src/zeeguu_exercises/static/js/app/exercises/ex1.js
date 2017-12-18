/** Custom exercise form finding word in a context. Inherited from Exercise.js
 *  @initialize it using: new Ex1();
 *  @customize it by using prototypal inheritance 
**/

import $ from 'jquery';
import TextInputExercise from './textInputExercise';
import Util from '../util';
import Settings from "../settings";

function Ex1(data,index,size){
	this.init(data,index,size);
	
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
		this.$input.val("").attr("placeholder", "Type or click a word").focus();
		this.reStyleDom();
		this.answer = this.data[this.index].from;
	};
	
	this.updateInput = function() {
		var t = Util.getSelectedText();
		this.$input.val(this.$input.val().trim() + " " + t);
	};
}

Ex1.prototype = Object.create(TextInputExercise.prototype, {
	constructor: Ex1,
	/************************** SETTINGS ********************************/
	description: {value: "Find the word in the context:"},
	customTemplateURL: {value: 'static/template/exercise/ex1.html'},
	resultSubmitSource: {value: Settings.ZEEGUU_EX_SOURCE_RECOGNIZE},
});

export default Ex1;