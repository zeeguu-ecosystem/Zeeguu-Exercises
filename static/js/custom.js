/** Modular Zeeguu Powered Exercise @author Martin Avagyan
 *  Initialize it using Exercise.init();
**/

var ex,Exercise = {
	settings: {
		data: 0,
		session: 11010001, //for now hardcoded session number
		bookmarksURL: "https://zeeguu.unibe.ch/bookmarks_to_study/",
		index: 0,
		startTime: 0,
		endTime: 0,
		size: 3, //default number of bookmarks
		elem: $("#ex-container"),
		description: "Find the word in the context",
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
		this.$statusContainer 	= this.$elem.find('#ex-status-container')
	},
	
	/**
	 *	Exercise initialaizer
	**/
	init: function(){
		ex = this.settings;
		this.cacheDom();		
		this.bindUIActions();
		this.start();
	},	

	render: function(){
		
	},
	
	start: function ()
	{
		$.when(this.getBookmarks()).then(function (ldata) {
			ex.data = ldata;
			Exercise.constructor();
		});			
	},
	
	restart: function (){
		this.start();
	},
	
	constructor: function (){		
		this.setDescription();
		ProgressBar.init(0,ex.size);	
		ex.index=0;		
		ex.startTime = new Date();		
		this.next();
	},
	
	setDescription: function(){
		this.$description.html(ex.description);
	},
	
	removeDescription: function(){
		if(ex.index != 0){
			this.$description.fadeOut(300, function() { $(this).remove(); });
		}
	},
	
	next: function (){	
		this.$to.html("\""+ex.data[ex.index].to+"\"");
		this.$context.html(ex.data[ex.index].context);
		this.$input.val("");
	},

	
	/**
	 *	Binding UI with Controller functions
	**/
	bindUIActions: function(){
		var tempDom;
		//Bind UI action of Hint/Show solution to the function		
		this.$showSolution.on("click", function() {
			Exercise.showAnswer();
		});
		//Bind UI action of Check answer to the function
		this.$checkAnswer.on("click", function() {			
			Exercise.checkAnswer();
			Exercise.removeDescription();
		});
		//Bind UI Text click		
		tempDom = this.$input;
		this.$clickableText.on("click",function() {
			var t = Util.getSelectedText();
			tempDom.val(t);			
		});
		//Bind UI Enter pressed
		var tempDom = this.$checkAnswer;
		this.$input.keyup(function(event){
			if(event.keyCode == 13){
				tempDom.click();
			}
		});
	},
	

	/**
	 *	Ajax get request to the Zeeguu API to get new bookmarks
	 *	To populate the excersise
	**/
	getBookmarks: function(){
		this.loadingAnimation(true);
		address = ex.bookmarksURL+ex.size+"?session="+ex.session;
		return $.ajax({	  
		  type: 'GET',
		  dataType: 'json',
		  url: address,
		  data: ex.data,
		  success: function(data) {
			Exercise.loadingAnimation(false);
		  },
		  async: true
		});
	},
	
	loadingAnimation(activate){	
		if(activate == true){			
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
		swal({
			  title: "You rock!",
			  text: "That took less than "+ Exercise.calcSessionTime() + ". practice more?",
			  type: "success",
			  showCancelButton: true,
			  confirmButtonColor: "#7eb530",
			  confirmButtonText: "Let's do it!",
			  closeOnConfirm: true
			},
			function(){
			  Exercise.restart();
			});
		ex.index = 0;
	},

	checkAnswer: function (){
		if (this.$input.val().trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === ex.data[ex.index].from.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "")){		
			if(ex.index != ex.data.length-1){
				this.animateSuccess();			
			}
			ProgressBar.move();
			ex.index++;
			//The exersises are complete
			if(ex.index == ex.data.length){
				Exercise.onExComplete();
				return;
			}
			setTimeout(this.next(), 2000);		
		}else{
			swal({
			  title: "Wrong answer...",
			  allowOutsideClick: true,
			  type: "error",
			  text: "Hint: the word starts with \"" +ex.data[ex.index].from.trim().charAt(0)+ "\"",
			  confirmButtonText: "ok",
			  showConfirmButton: true,
			  allowEscapeKey:true,
			  showLoaderOnConfirm:true,
			});
		}		
	},

	animateSuccess: function(){
		var _this = this;
		_this.$statusContainer.removeClass('hide');
		setTimeout(function(){
			if (_this.$statusContainer.length > 0) {
				_this.$statusContainer.addClass('hide');
			}
		}, 2000);	
	},

	showAnswer: function (){
		this.$input.val(ex.data[ex.index].from);
	},

	calcSessionTime: function (){
		ex.endTime = new Date();
		var total = ex.endTime.getMinutes()-ex.startTime.getMinutes();
		return (total <= 1)?"1 minute":total + " minutes";
	},
}