/** Custom exercise for translating the word given in the context. Inherited from Exercise.js
 *  @initialize it using: new Ex4();
 *  @customize it by using prototypal inheritance 
**/

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
	}
	
	/** @Override */
	this.bindUIActions = function(){
		var _this = this;
		//Bind UI action of Hint/Show solution to the function		
		this.$showSolution.on("click", _this.giveHint.bind(this));
		
		//Bind UI action of Check answer to the function
		this.$checkAnswer.on("click", _this.checkAnswer.bind(this));
		
		//Bind UI Text click		
		//this.$clickableText.on("click",updateInput.bind(this));
		
		// Bind UI Enter Key
		  this.$input.keyup(enterKeyup.bind(this));
	}
	
	/** @Override */
	this.next = function (){			
		this.$to.html("\""+this.data[this.index].from +"\"");
		this.$context.html(this.generateContext());
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
	
	this.generateContext = function(){
		var contextString = this.data[this.index].context;
		var res = this.data[this.index].from.split(" ");	
		
		for (i = 0; i <res.length; i++){
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
		swal({
			title: "Wrong answer...",
			allowOutsideClick: true,
			type: "error",
			text: "Hint: the word starts with \"" +this.data[this.index].to[0].trim().charAt(0)+ "\"",
			confirmButtonText: "ok",
			showConfirmButton: true,
			allowEscapeKey:true,
			showLoaderOnConfirm:true,
		});
	}	
};
Ex4.prototype = Object.create(Exercise.prototype, {
	constructor: Ex4,
	/************************** SETTINGS ********************************/	
	description: {value: "Translate the word given in the context."},
	customTemplateURL: {value: 'static/template/ex4.html'},	
});
