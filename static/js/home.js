Home = function(){
	this.init();
};

Home.prototype = {
	
	/************************** SETTINGS ********************************/	
	templateURL: '../static/template/home.html',	
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
	
	/**
	*	Saves the common dom in chache
	**/
	cacheDom: function(){
		this.$elem 			= $("#home-container");		
		this.$btn1  			= this.$elem.find("#btn1");
		this.$btn2  			= this.$elem.find("#btn2");
		this.$btn3 			= this.$elem.find('#btn3');
		this.$btn4 			= this.$elem.find("#btn4");		
	},
	
	
	/**
	*	Exercise initialaizer
	**/
	init: function(){	
		_this = this;
		$.when(this.createDom()).done(function(){		
			_this.cacheDom();		
			_this.bindUIActions();
		});			
	},	

	
	
	
	bindUIActions: function(){		
		//Bind UI action of button 1 click to the function
		this.$btn1.on("click", this.newEx.bind(this,1));
		
		//Bind UI action of button 2 click to the function
		this.$btn2.on("click", this.newEx.bind(this,2));
		
		//Bind UI action of button 3 click to the function
		this.$btn3.on("click", this.newEx.bind(this,3));
		
		//Bind UI action of button 4 click to the function
		this.$btn4.on("click", this.newEx.bind(this,4));	
	},
	
	newEx: function(exIdx){
		switch(exIdx) {
			case 1:
				new Ex1();
				break;
			case 2:
				new Ex2();
				break;
			case 3:
				new Ex3();
				break;
			case 4:
				new Ex4();
				break;
		}
	},
};