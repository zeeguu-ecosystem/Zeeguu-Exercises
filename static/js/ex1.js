/** Custom exercise form finding word in a context. Inherited from Exercise.js
 *  @initialize it using: new Ex1();
 *  @customize it by using prototypal inheritance 
**/

function Ex1(){
	this.init();
	
	/** @Override */
	this.customCacheDom = function(){	
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
		this.$showSolution.on("click", _this.giveHint.bind(this));
		
		//Bind UI action of Check answer to the function
		this.$checkAnswer.on("click", _this.checkAnswer.bind(this));
		
		//Bind UI Text click		
		this.$clickableText.on("click",updateInput.bind(this));
		
		// Bind UI Enter Key
		  this.$input.keyup(enterKeyup.bind(this));
	}
	
	/** @Override */
	this.next = function (){	
		this.$to.html("\""+this.data[this.index].to+"\"");
		this.$context.html(this.data[this.index].context);
		this.$input.val("");
	}
	
	updateInput = function() {
		var t = Util.getSelectedText();
		this.$input.val(t);
	}
	
	enterKeyup = function(event){
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
	size: 		 {value: 3}, 
	description: {value: "Find the word in the context!"},
	templateURL: {value: '../static/template/ex1.html'},	
});