Home = function(){
	this.init();
};

Home.prototype = {
	
	/************************** SETTINGS ********************************/	
	homeTemplateURL: '../static/template/home.html',
	cardTemplateURL: '../static/template/card.html',
	exNames: [{name: "Find",      exID: [[1,3],[3,1]]},
			  {name: "Choose",    exID: [[2,3]]},
			  {name: "Match",     exID: [[3,3]]},
			  {name: "Translate", exID: [[4,3]]},
			  {name: "General",   exID: [[1,3],[2,3],[3,3],[4,3]]},
			  {name: "General2",  exID: [[1,1],[2,1]]}],
	currentGenerator: 0,
	eventFunc: 0,
	/*********************** General Functions ***************************/	
	/**
	*	Loads the HTML exercise template from static
	**/
	createDom: function(){
		$("#main-content").html(this.loadTemplate(this.homeTemplateURL));	
	},
	
	loadTemplate: function(tempUrl){
		return $.ajax({	  
		  type: 'GET',
		  dataType: 'html',
		  url: tempUrl,
		  async: false
		}).responseText;		
	},
	
	
	
	/**
	*	Saves the dom 
	**/
	cacheDom: function(){
		this.$elem 			= $("#home-container");		
		this.$exCards 		= this.$elem.find("#exercieses-cards");	
	},
	
	
	/**
	*	Exercise initialaizer
	**/
	init: function(){	
		var _this = this;
		
		// "bind" event
		this.eventFunc = function(){_this.reset();};
		events.on('generatorCompleted',this.eventFunc);
	
		this.start();		
	},	
	
	/**
	*	The main constructor
	**/
	start: function (){	
		var _this = this;
		$.when(this.createDom()).done(function(){		
			_this.cacheDom();		
			_this.generateEx();			
			_this.bindUIActions();
		});	
	},

	bindUIActions: function(){	
	
		//Bind UI action of button clicks to the function
		var exs = this.$exCards.children();
		
		for(var i = 0; i<exs.length; i++){
			var id = exs[i].getAttribute("ex-id");
			$(exs[i]).on("click", this.newEx.bind(this,id));
		}	
	},
	
	generateEx: function(){		
		var cardTemplate = this.loadTemplate(this.cardTemplateURL);		
		var cardNames = {Exercises: this.exNames};	
		
		this.$exCards.append(Mustache.render(cardTemplate,cardNames));
	},
	
	/**
	* Parse string into 2D array for generator arguments
	*/
	exArrayParser: function(stringArray){		
		var arr = stringArray.split(",").map(function(x){return parseInt(x)});
		var newArr = [];
		while(arr.length) newArr.push(arr.splice(0,2));
		console.log(newArr);
		return newArr;
	},
	
	reset: function(){
		this.currentGenerator = null;
		delete this.currentGenerator;	
		this.start();
	},
	
	terminate: function(){
		events.off('generatorCompleted',this.eventFunc);
	},
	
	newEx: function(exID){
		this.currentGenerator = new Generator(this.exArrayParser(exID));
	},
};