/** Modular Zeeguu Powered Exercise @author Martin Avagyan
 *  Initialize it using Exercise.init(percent,size);
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
	},
	
	/**
	 *	Exercise initialaizer
	**/
	init: function(){
		ex = this.settings;
		this.bindUIActions();
		this.start();
	},	

	start: function ()
	{
		$.when(this.getBookmarks()).then(function (ldata) {
			ex.data = ldata;
			Exercise.reset();
		});			
	},
	
	restart: function (){
		this.start();
	},
	
	reset: function (){				
		ProgressBar.init(0,ex.size);	
		ex.index=0;		
		ex.startTime = new Date();		
		this.next();
	},

	next: function (){
				
		ex.elem.find("#ex-to").html("\""+ex.data[ex.index].to+"\"");
		ex.elem.find("#ex-context").html(ex.data[ex.index].context);
		ex.elem.find("#ex-main-input").val("");
		//Remove the ex desciption when the ex is started
		if(ex.index != 0){
			ex.elem.find("#ex-descript").fadeOut(300, function() { $(this).remove(); });
		}
	},

	
	/**
	 *	Binding UI with Controller functions
	**/
	bindUIActions: function(){
		//Bind UI action of Hint/Show solution to the function
		ex.elem.find("#show_solution").on("click", function() {
			Exercise.showAnswer();
		});
		//Bind UI action of Check answer to the function
		ex.elem.find("#check_answer").on("click", function() {
			Exercise.checkAnswer();
		});
		//Bind UI Text click
		ex.elem.find(".clickable-text").on("click",function() {
			var t = Util.getSelectedText();
			ex.elem.find("#ex-main-input").value = t;
		});
		//Bind UI Enter pressed
		ex.elem.find("#ex-main-input").keyup(function(event){
			if(event.keyCode == 13){
				$("#check_answer").click();
			}
		});
	},
	

	/**
	 *	Ajax get request to the Zeeguu API to get new bookmarks
	 *	To populate the excersise
	**/
	getBookmarks: function(){	
		ex.elem.addClass('hide');
		$('#loading').removeClass('hide');
		address = ex.bookmarksURL+ex.size+"?session="+ex.session;
		return $.ajax({	  
		  type: 'GET',
		  dataType: 'json',
		  url: address,
		  data: ex.data,
		  success: function(data) {
			ex.elem.removeClass('hide');
			$('#loading').addClass('hide');
		  },
		  async: true
		});
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
		if (ex.elem.find("#ex-main-input").val().trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === ex.data[ex.index].from.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "")){		
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
			setTimeout(this.next, 2000);		
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
		ex.elem.find("#ex-status").html('<div id = "ex-status-container" class = "status-animation"><svg id = "temp-ex-success" class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div>');
		setTimeout(function(){
		  if (ex.elem.find('#ex-status-container').length > 0) {
			ex.elem.find('#ex-status-container').remove();
		  }
		}, 2000);	
	},

	showAnswer: function (){
		ex.elem.find("#ex-main-input").val(ex.data[ex.index].from);
	},

	calcSessionTime: function (){
		ex.endTime = new Date();
		var total = ex.endTime.getMinutes()-ex.startTime.getMinutes();
		return (total <= 1)?"1 minute":total + " minutes";
	},
}