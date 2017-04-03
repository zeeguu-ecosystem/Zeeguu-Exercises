Home = function(){
	this.init();
};

Home.prototype = {
	
	/************************** SETTINGS ********************************/	
	homeTemplateURL: 'static/template/home.html',
	cardTemplateURL: 'static/template/card.html',
	defaultIcon: 	 'img/icons/placeholder.svg',
	exNames: [
			  {name: "Find",            exID: [[1,6]], 							info: 'Find the word in the context', 			icon: 'static/img/icons/search-engine.svg',  time: 2},
			  {name: "Choose",          exID: [[2,6]], 							info: 'Choose the word that fits the context', 	icon: 'static/img/icons/test.svg', 			time: 2},
			  {name: "Match",           exID: [[3,6]], 							info: 'Match each word with its translation', 	icon: 'static/img/icons/question.svg', 		time: 3},
			  {name: "Translate",	    exID: [[4,6]], 							info: 'Translate the word given in the context',icon: 'static/img/icons/translator.svg', 	time: 2},			  
			  {name: "Short Practice",  exID: [[1,3],[2,3]], 					info: 'General exercise for short practice',	icon: 'static/img/icons/placeholder.svg',	time: 3},
			  {name: "Long Practice",   exID: [[1,3],[2,3],[3,3],[4,3]],		info: 'General exerciese for short practice', 	icon: 'static/img/icons/placeholder.svg',	time: 4},
			  {name: "Random",   		exID: [[2,3],[1,3],[3,3],[4,3],[1,3]], 	info: 'Repeat via random exercises', 			icon: 'static/img/icons/shuffle.svg',		time: 6},
			  
			  ],
	currentGenerator: 0,
	eventFunc: 0,
	creditsOn: false,
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
		this.$elem 			= $("#home-body");		
		this.$exCards 		= this.$elem.find("#exercieses-cards");	
		this.$attribution 	= this.$elem.find("#attribution");	
		this.$credits 		= this.$elem.find("#credits");	
	},
	
	
	/**
	*	Exercise initialaizer
	**/
	init: function(){	
	
		console.log(this.homeTemplateURL);
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
		
		//Bind UI action of credits to the function		
		var _this = this;		
		this.$credits.on("click", _this.giveCredits.bind(this));
		
		for(var i = 0; i<exs.length; i++){
			var id = exs[i].getAttribute("ex-id");
			$(exs[i]).on("click", this.newEx.bind(this,id));
		}	
	},
	
	giveCredits: function(){
		if(this.creditsOn){
			this.creditsOn = false;
			this.$attribution.addClass("hide");
			return;
		}
		this.creditsOn = true;
		this.$attribution.removeClass("hide");
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
