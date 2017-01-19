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
	index: 0,
	startTime: 0,
	size: 3, //default number of bookmarks
	description:  "Solve the exercise",  //default description
	/////////////////////////////////////////////////////////////////////
	
	
	createDom: function(){
		var xhr= new XMLHttpRequest();
		xhr.open('GET','../static/template/exercise.html', true);
		xhr.onreadystatechange= function() {
			if (this.readyState!==4) return;
			if (this.status!==200) return;
			document.getElementById('main-content').innerHTML= this.responseText;
		};
		xhr.send();
	},	
	
	cacheDom: function(){
		this.$elem 				= $("#ex-module");		
		this.$container  		= this.$elem.find("#ex-container");
		this.$description  		= this.$elem.find("#ex-descript");
		this.$to 				= this.$elem.find("#ex-to");
		this.$context 			= this.$elem.find("#ex-context");
		this.$input 			= this.$elem.find("#ex-main-input");
		this.$showSolution 		= this.$elem.find("#show_solution");
		this.$checkAnswer 		= this.$elem.find("#check_answer");
		this.$clickableText 	= this.$elem.find(".clickable-text");
		this.$loader 			= this.$elem.find('#loader');
		this.$status 			= this.$elem.find("#ex-status");		
		this.$statusContainer 	= this.$elem.find('#ex-status-container');
	},
	
	
	/**
	 *	Exercise initialaizer
	**/
	init: function(){
		_this = this;
		$.when(this.createDom()).then(function(){
			alert(document.innerHTML);
			_this.cacheDom();		
			_this.bindUIActions();
			_this.start();
		});			
	},	
	
	start: function ()
	{
		var _this = this;
		$.when(this.getBookmarks()).then(function (ldata) {
			_this.data = ldata;
			_this._constructor();
		});			
	},
	
	restart: function (){
		this.start();
	},
	
	_constructor: function (){		
		this.setDescription();
		ProgressBar.init(0,this.size);	
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
	
	next: function (){	
		this.$to.html("\""+this.data[this.index].to+"\"");
		this.$context.html(this.data[this.index].context);
		this.$input.val("");
	},

	
	/**
	 *	Binding UI with Controller functions
	**/
	bindUIActions: function(){
		var _this = this;
		//Bind UI action of Hint/Show solution to the function		
		this.$showSolution.on("click", _this.showAnswer.bind(this));
		
		//Bind UI action of Check answer to the function
		this.$checkAnswer.on("click", _this.checkAnswer.bind(this));
		
		//Bind UI Text click		
		this.$clickableText.on("click",_this.updateInput.bind(this));
		
		//Bind UI Enter pressed		
		this.$input.keyup(_this.enterKeyup.bind(this));
	},
	
	updateInput: function() {
		var t = Util.getSelectedText();
		this.$input.val(t);
	},
	
	enterKeyup: function(event){
		if(event.keyCode == 13){
			this.$checkAnswer.click();
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
	
	showAnswer: function (){
		this.$input.val(this.data[this.index].from);
	},
	
	checkAnswer: function (){
		if (this.$input.val().trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === this.data[this.index].from.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "")){		
			if(this.index != this.data.length-1){
				this.animateSuccess();			
			}
			ProgressBar.move();
			this.index++;
			//The exersises are complete
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