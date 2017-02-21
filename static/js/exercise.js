/** Modular Zeeguu Powered Exercise @author Martin Avagyan
 *  @initialize it using: new Exercise();
 *  @customize it by using prototypal inheritance 
**/
Exercise = function(data,index,size){
	this.init(data,index,size);	
	//TODO unbind method
};

Exercise.prototype = {
	
	/************************** SETTINGS ********************************/	
	data: 0,	
	customTemplateURL: 0,
	index: 0,
	startIndex: 0,
	size: 0, //default number of bookmarks
	description:  "Solve the exercise",  //default description
	
	/*********************** General Functions ***************************/	
	/**
	*	Loads the HTML exercise template from static
	**/
	
	createCustomDom: function(){
		var _this = this;
		return $.ajax({	  
		  type: 'GET',
		  dataType: 'html',
		  url: _this.customTemplateURL,
		  data: this.data,
		  success: function(data) {
			$("#custom-content").html(data);	
		  },
		  async: true
		});
	},
	
	/**
	*	Saves the common dom in chache
	**/
	cacheDom: function(){
		this.$elem 				= $("#ex-module");		
		this.$container  		= this.$elem.find("#ex-container");
		this.$description  		= this.$elem.find("#ex-descript");
		this.$loader 			= this.$elem.find('#loader');
		this.$status 			= this.$elem.find("#ex-status");		
		this.$statusContainer 	= this.$elem.find('#ex-status-container');
		this.cacheCustomDom();
	},
	
	/**
	*	Exercise initialaizer
	**/
	init: function(data,index,size){	
		var _this = this;
		$.when(_this.createCustomDom()).done(function(){
			_this.cacheDom();	
			_this.bindUIActions();
			_this._constructor(data,index,size);	
		});		
	},	
	
	
	/**
	*	The main constructor
	**/
	_constructor: function (data,index,size){		
		this.data  = data;
		this.index = index;
		this.startIndex = index;
		this.size  = size;			
		this.setDescription(); 	
		this.next();
	},
		
	/**
	*	Populates custom exercise description
	**/
	setDescription: function(){
		this.$description.html(this.description);
	},
	
	/**
	*	When the ex are done, notify the observers
	**/
	onExComplete: function (){		
		setTimeout(function() { events.emit('exerciseCompleted');}, 2000);
	},
	
	/**
	*	Check selected answer with success condition
	**/
	checkAnswer: function (chosenWord){
		if (this.successCondition(chosenWord)){		
			this.onSuccess();
			return;
		}	
		this.wrongAnswerAnimation();					
	},
	
	/**
	*	Actions taken when the succes condition is true
	**/
	onSuccess: function(){		
		var _this = this;
		this.animateSuccess();
		// Notify the observer
		events.emit('progress');
		this.index++;
		// The current exercise set is complete
		if(this.index == this.size + this.startIndex){						
			this.onExComplete();
			return;
		}			
		setTimeout(function() { _this.next(); }, 2000);
	},
	
	
	/*********************** Interface functions *****************************/
	/**
	*	Binding UI with Controller functions
	**/
	bindUIActions: function(){},
	
	/**
	*	Condition used by checkAnswer 
	*	If true, then a correct answer was given
	**/
	successCondition: function(){},
	
	/**
	*	Gives a hint when the hint button is pressed
	**/
	giveHint: function (){},
	
	/**
	*	Populates the next exercise
	**/
	next: function (){},
	
	/**
	*	Cahes custom dom of the exercise
	**/
	cacheCustomDom: function(){},	
	
	
	
	/************************** Animations ********************************/	
	/**
	*	Animation for wrong solution
	**/
	wrongAnswerAnimation: function(){
		swal({
			title: "Wrong answer...",
			allowOutsideClick: true,
			type: "error",
			text: "Hint: the translation of \"" + this.data[this.index].to + "\" starts with " + this.data[this.index].from.trim().charAt(0)+ "\"",
			confirmButtonText: "ok",
			showConfirmButton: true,
			allowEscapeKey:true,
			showLoaderOnConfirm:true,
		});
	},

	/**
	*	Animation for successful solution
	**/
	animateSuccess: function(){
		this.$statusContainer.removeClass('hide');		
		var _this = this;
		setTimeout(function(){
			if (_this.$statusContainer.length > 0) {
				_this.$statusContainer.addClass('hide');
			}
		}, 2000);	
	},	
};
