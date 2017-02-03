/** Modular Zeeguu Powered Exercise @author Martin Avagyan
 *  @initialize it using: new Exercise();
 *  @customize it by using prototypal inheritance 
**/
Exercise = function(){
	this.init();
};

Exercise.prototype = {
	
	/************************** SETTINGS ********************************/	
	data: 0,
	session: 11010001, //for now hardcoded session number
	bookmarksURL: "https://zeeguu.unibe.ch/bookmarks_to_study/",
	templateURL: '../static/template/exercise.html',
	customTemplateURL: '../static/template/exercise.html',
	index: 0,
	startTime: 0,
	size: 3, //default number of bookmarks
	description:  "Solve the exercise",  //default description
	
	/*********************** General Functions ***************************/	
	/**
	*	Loads the HTML exercise template from static
	**/
	createDom: function(){
		var _this = this;
		return $.ajax({	  
		  type: 'GET',
		  dataType: 'html',
		  url: _this.templateURL,
		  data: this.data,
		  success: function(data) {
			$("#main-content").html(data);	
		  },
		  async: true
		});
	},
	
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
	init: function(){	
		_this = this;
		$.when(this.createDom()).done(function(){	
			$.when(_this.createCustomDom()).done(function(){
				_this.cacheDom();	
				_this.bindUIActions();
				_this.start();	
			});	
		});			
	},	
	
	/**
	*	Call to load the data
	*	When the loading is complete constructs the exercise
	**/
	start: function ()
	{
		var _this = this;
		$.when(this.getBookmarks()).done(function (ldata) {		
			_this.data = ldata;  												
			_this._constructor();
		});			
	},
	
	/**
	*	The main constructor
	**/
	_constructor: function (){	
		this.setDescription();				
		ProgressBar.init(0,this.size);				
		this.index=0;			
		this.startTime = new Date();		
		this.next();
	},
	
	
	restart: function (){
		this.start();
	},
	
	/**
	*	Populates custom exercise description
	**/
	setDescription: function(){
		this.$description.html(this.description);
	},
	
	/**
	*	Removes the desciption after the first successful solution
	**/
	removeDescription: function(){
		if(this.index !== 0){
			this.$description.fadeOut(300, function() { $(this).remove(); });
		}
	},

	/**
	*	Ajax get request to the Zeeguu API to get new bookmarks
	**/
	getBookmarks: function(){
		var _this = this;
		this.loadingAnimation(true);
		address = this.bookmarksURL+this.size+"?session="+this.session;
		return $.ajax({	  
		  type: 'GET',
		  dataType: 'json',
		  url: address,
		  data: this.data,
		  success: function(data) {
			_this.loadingAnimation(false);
		  },
		  async: true
		});
	},
	
	/**
	*	When the ex are done perform an action
	**/
	onExComplete: function (){
		var _this = this;
		swal({
			  title: "You rock!",
			  text: "That took less than "+ _this.calcSessionTime() + ". practice more?",
			  type: "success",
			  showCancelButton: true,
			  confirmButtonColor: "#7eb530",
			  confirmButtonText: "Let's do it!",
			  closeOnConfirm: true
			},
			function(){
			  _this.restart();
			});
		this.index = 0;
	},
	
	/**
	*	Check selected answer with success condition
	**/
	checkAnswer: function (chosenWord){
		_this = this;
		if (this.successCondition(chosenWord)){		
			if(this.index != this.data.length-1){
				this.animateSuccess();			
			}
			ProgressBar.move();
			this.index++;
			// The exercise set is complete
			if(this.index == this.data.length){
				this.onExComplete();
				return;
			}			
			setTimeout(function() { _this.next(); }, 2000);
			return;
		}		
		this.wrongAnswerAnimation();				
	},
	
	/**
	*	Check selected answer with success condition
	**/
	calcSessionTime: function (){
		var endTime = new Date();
		var total = endTime.getMinutes()-this.startTime.getMinutes();
		return (total <= 1)?"1 minute":total + " minutes";
	},
	
	/**
	*	Request the submit API
	**/
	submitResults: function(){
		for(var i = 0; i< data.length;i++){
			$.post("https://www.zeeguu.unibe.ch/report_exercise_outcome/Too easy/Recognize/1000/"+data[i].id+"?session="+34563456);		
		}
	},
	
	/*********************** Interface functions *****************************/
	/**
	*	Binding UI with Controller functions
	**/
	bindUIActions: function(){},
	
	/**
	*	Condition used by checkAnswer 
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
	*	Custom dom chache for each exercise
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
	
	/**
	*	Animation used for loading
	**/
	loadingAnimation: function(activate){	
		if(activate === true){			
			this.$container.addClass('hide');
			this.$loader.removeClass('hide');
		}else{
			this.$container.removeClass('hide');
			this.$loader.addClass('hide');
		}
	},
};