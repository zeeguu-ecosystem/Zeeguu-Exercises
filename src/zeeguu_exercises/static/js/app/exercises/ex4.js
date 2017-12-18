/** Custom exercise for translating the word given in the context. Inherited from Exercise.js
 *  @initialize it using: new Ex4();
 *  @customize it by using prototypal inheritance 
**/

import $ from 'jquery';
import TextInputExercise from './textInputExercise';
import Util from '../util';
import Settings from "../settings";

function Ex4(data,index,size){
	this.init(data,index,size);
	
	/** @Override */
	this.bindUIActions = function(){
		//Bind UI action of Hint/Show solution to the function		
		this.$showSolution.on("click", this.handleHint.bind(this));
		
		//Bind UI action of Check answer to the function
		this.$checkAnswer.on("click", this.checkAnswer.bind(this));
		
		// Bind UI Enter Key
		this.$input.keyup(this.enterKeyup.bind(this));

		//Next exercise clicked
		this.$nextExercise.on("click",this.onRenderNextEx.bind(this));

        //Feedback for the previous bookmark: this.index
		this.$feedbackBtn.click(() => {this.giveFeedbackBox(this.index);});
	};

	/** @Override */
	this.next = function (){			
		this.$to.html("\""+this.data[this.index].from +"\"");
		this.$context.html(this.generateContext());
		this.$input.val("").attr("placeholder", "Type or click a word").focus();
		this.reStyleDom();
		this.answer = this.data[this.index].to;
	};
	
	this.updateInput = function() {
		var t = Util.getSelectedText();
		this.$input.val(t);
	};
	
	this.generateContext = function(){
		var contextString = this.data[this.index].context;
		var res = this.data[this.index].from.split(" ");	
		
		for (var i = 0; i <res.length; i++){
			contextString = contextString.replace(res[i], res[i].bold());
		}
			
		return contextString;		
	};
	
	/** @Override */
	this.successCondition = function(){	
		// Check all the possible answers
		return this.$input.val().trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === this.data[this.index].to.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "");
	};
	
};

Ex4.prototype = Object.create(TextInputExercise.prototype, {
	constructor: Ex4,
	/************************** SETTINGS ********************************/
	description: {value: "Translate the word given in the context."},
	customTemplateURL: {value: 'static/template/exercise/ex4.html'},
	resultSubmitSource: {value: Settings.ZEEGUU_EX_SOURCE_TRANSLATE},
});

export default Ex4;