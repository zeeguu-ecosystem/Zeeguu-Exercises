/** Modular Zeeguu Powered Exercise @author Martin Avagyan
 *  Initialize it using Exercise.init();
**/
Exercise = function(){
	this.init();
};

Exercise.prototype = {
	
	/////////////////////////////// SETTINGS ////////////////////////////
	data: 0,
	session: 11010001, //for now hardcoded session number
	bookmarksURL: "https://zeeguu.unibe.ch/bookmarks_to_study/",
	templateURL: '../static/template/exercise.html',
	index: 0,
	startTime: 0,
	size: 3, //default number of bookmarks
	description:  "Solve the exercise",  //default description
	/////////////////////////////////////////////////////////////////////
	
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
	
	
	cacheDom: function(){
		this.$elem 					= $("#ex-module");		
		this.$container  				= this.$elem.find("#ex-container");
		this.$description  			= this.$elem.find("#ex-descript");
		this.$loader 					= this.$elem.find('#loader');
		this.$status 					= this.$elem.find("#ex-status");		
		this.$statusContainer 	= this.$elem.find('#ex-status-container');
		this.customCacheDom();
	},
	
	
	customCacheDom: function(){	
	},
	
	/**
	 *	Exercise initialaizer
	**/
	init: function(){	
		_this = this;
		$.when(this.createDom()).done(function(){		
			_this.cacheDom();		
			_this.bindUIActions();
			_this.start();	
		});			
	},	
	
	start: function ()
	{
		var _this = this;
		$.when(this.getBookmarks()).done(function (ldata) {		
			_this.data = ldata;  												// TO DO
			_this._constructor();
		});			
	},
	
	restart: function (){
		this.start();
	},
	
	_constructor: function (){	
		this.setDescription();				
		ProgressBar.init(0,this.size);				// TO DO
		this.index=0;			
		this.startTime = new Date();		
		this.next();
	},
	
	setDescription: function(){
		this.$description.html(this.description);
	},
	
	removeDescription: function(){
		if(this.index !== 0){
			this.$description.fadeOut(300, function() { $(this).remove(); });
		}
	},

	/**
	 *	Ajax get request to the Zeeguu API to get new bookmarks
	 *	To populate the excersise
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
	
	loadingAnimation: function(activate){	
		if(activate === true){			
			this.$container.addClass('hide');
			this.$loader.removeClass('hide');
		}else{
			this.$container.removeClass('hide');
			this.$loader.addClass('hide');
		}
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
	
	checkAnswer: function (){
		if (this.successCondition()){		
			if(this.index != this.data.length-1){
				this.animateSuccess();			
			}
			ProgressBar.move();
			this.index++;
			// The exercises are complete
			if(this.index == this.data.length){
				this.onExComplete();
				return;
			}			
			setTimeout(this.next(), 2000);	
			this.removeDescription();				
		}else{
			this.wrongAnswerAnimation();
		}		
	},
	
	/**
	 *	Binding UI with Controller functions
	**/
	bindUIActions: function(){
	},
	
	/**
	*  Condition used by checkAnswer 
	**/
	successCondition: function(){
	},
	
	/**
	*  Gives a hint when the hint button is pressed
	**/
	giveHint: function (){
	},
	
	/**
	*  Populates the next exercise
	**/
	next: function (){	
	},
	wrongAnswerAnimation: function(){
		swal({
			title: "Wrong answer...",
			allowOutsideClick: true,
			type: "error",
			text: "Hint: the word starts with \"" +this.data[this.index].from.trim().charAt(0)+ "\"",
			confirmButtonText: "ok",
			showConfirmButton: true,
			allowEscapeKey:true,
			showLoaderOnConfirm:true,
		});
	},

	animateSuccess: function(){
		this.$statusContainer.removeClass('hide');		
		var _this = this;
		setTimeout(function(){
			if (_this.$statusContainer.length > 0) {
				_this.$statusContainer.addClass('hide');
			}
		}, 2000);	
	},

	calcSessionTime: function (){
		var endTime = new Date();
		var total = endTime.getMinutes()-this.startTime.getMinutes();
		return (total <= 1)?"1 minute":total + " minutes";
	},
};