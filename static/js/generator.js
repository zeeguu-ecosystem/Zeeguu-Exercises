/**Generator Ex*/

Generator = function(set){
	this.init(set);
};

Generator.prototype = {
	/************************** SETTINGS ********************************/	
	data: 0,
	index: 0,
	session: 11010001, //for now hardcoded session number
	bookmarksURL: "https://zeeguu.unibe.ch/bookmarks_to_study/",
	templateURL: '../static/template/exercise.html',
	
	
	/**
	*	Generator initialaizer
	**/
	init: function(set){
		_this = this;
		events.on('exerciseCompleted', this.nextEx);
		$.when(this.createDom()).done(function(){
			_this.start();															
			_this._constructor();
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
		});			
	},
	
	/**
	*	The main constructor
	**/
	_constructor: function (){			
		ProgressBar.init(0,this.size);		
	},
	
	engine: function(){
			
	},
	
	nextEx: function(currentEx){
		//currentEx.unBind();TODO unbind the EX
		//delete currentEx TODO
		var a = 
	},
	
	/***********************  ***************************/	
	/**
	*	When the ex are done perform an action
	**/
	onExSetComplete: function (){				
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
				//_this.restart();TODO RESTART 
			});
	},
	
	/**
	*	Loads the HTML general exercise template from static
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
}	