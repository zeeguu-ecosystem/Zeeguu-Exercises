/**Generator Ex*/

Generator = function(set){
	this.init(set);
};

Generator.prototype = {
	/************************** SETTINGS ********************************/	
	data: 0,
	set: 0,
	size: 0,
	index: 0,	
	startTime: 0,
	session: 11010001, //for now hardcoded session number
	bookmarksURL: "https://zeeguu.unibe.ch/bookmarks_to_study/",
	templateURL: '../static/template/exercise.html',	
	currentEx: 0,
	
	/**
	*	Saves the common dom in chache
	**/
	cacheDom: function(){
		this.$elem 				= $("#ex-module");		
		this.$container  		= this.$elem.find("#ex-container");
		this.$loader 			= this.$elem.find('#loader');
	},
	
	/**
	*	Generator initialaizer
	**/
	init: function(set){		
		this.set = set;
		var _this = this;		
		events.on('exerciseCompleted',function(){_this.nextEx();});
		$.when(this.createDom()).done(function(){
			_this.cacheDom();
			_this.start();			
		});
	},	
	
	
	restart: function(){
		this.start();
	},
	
	/**
	*	Call to load the data from API
	**/
	start: function ()
	{
		var _this = this;
		this.size = this.calcSize(this.set,this.set.length);
		$.when(this.getBookmarks()).done(function (ldata) {		
			_this.data = ldata; 												
			_this._constructor();	
		});			
	},
	
	/**
	*	The main constructor
	**/
	_constructor: function (){			
		ProgressBar.init(0,this.size);	
		this.index = 0;		
		this.startTime = new Date();			
		this.engine();
	},
	
	engine: function(){			
		var _this = this;		
		this.nextEx();			
	},
	
	nextEx: function(){
		console.log("I am here: " + this.index);
		if(this.index === this.set.length){
			this.onExSetComplete();
			return;
		}
		var ex = this.set[this.index][0];
		var size = this.set[this.index][1];
		var startingIndex = this.calcSize(this.set,this.index);
		
		
		console.log("New set with Ex" + ex + ", size: " + size + ",startingInex: "+ startingIndex);
		this.currentEx = null;
		delete this.currentEx;
		switch(ex) {
			case 1:
				this.currentEx = new Ex1(this.data,startingIndex,size);
				break;
			case 2:
				this.currentEx = new Ex2(this.data,startingIndex,size);
				break;
			case 3:
				this.currentEx = new Ex3(this.data,startingIndex,size);
				break;
			case 4:
				this.currentEx = new Ex4(this.data,startingIndex,size);
				break;
		}
		
		this.index++;
	},
	
	calcSize: function(set,length){
		var sum = 0;
		for(var i = 0; i<length; i++){
		  sum += set[i][1];
		}
		return sum;
			
	},
	
	/**
	*	Request the submit API
	**/
	/*submitResults: function(){
		for(var i = 0; i< this.data.length;i++){
			$.post("https://www.zeeguu.unibe.ch/report_exercise_outcome/Too easy/Recognize/1000/"+this.data[i].id+"?session="+34563456);		
		}
	},*/
	
	/**
	*	Check selected answer with success condition
	**/
	calcSessionTime: function (){
		var endTime = new Date();
		var total = endTime.getMinutes()-this.startTime.getMinutes();
		return (total <= 1)?"1 minute":total + " minutes";
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
				_this.restart();
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