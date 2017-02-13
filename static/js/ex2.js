function Ex2(data,index,size){
	this.init(data,index,size);
	
	/** @Override */
	this.cacheCustomDom = function(){	
		this.$context 				= this.$elem.find("#ex-context");
		this.$showSolution 			= this.$elem.find("#show_solution");
		this.$checkAnswer 			= this.$elem.find("#check_answer");		
		this.$btn1 					= this.$elem.find("#btn1");
		this.$btn2 					= this.$elem.find("#btn2");
		this.$btn3 					= this.$elem.find("#btn3");		
	}
	
	/** @Override */
	this.bindUIActions = function(){
		var _this = this;
		//Bind UI action of Hint/Show solution to the function		
		this.$showSolution.on("click", _this.giveHint.bind(this));
		
		//Bind UI action of Check answer to the function
		this.$checkAnswer.on("click", _this.checkAnswer.bind(this));
		
		//Bind UI action of button 1 click to the function
		this.$btn1.on("click", btnSelect.bind(this,1));
		
		//Bind UI action of button 2 click to the function
		this.$btn2.on("click", btnSelect.bind(this,2));
		
		//Bind UI action of button 3 click to the function
		this.$btn3.on("click", btnSelect.bind(this,3));
	}
	
	/** @Override */
	this.next = function(){		
		//Populate context
		this.generateContext();			
		this.resetBtns();
		var _this = this;
		
		//Random options	
		var idxs = randomNums(this.data.length-1);
		this.btns = randomNums(this.optionNum);
		
		
		//Populate buttons
		function populateButton(buttonID, value) {
			_this["$btn"+buttonID].text(value);
		}

		populateButton(this.btns[0], this.data[this.index].from);
		populateButton(this.btns[1], this.data[idxs[0]].from);
		populateButton(this.btns[2], this.data[idxs[1]].from);
	}
	
	/** @Override */
	this.giveHint = function (){
		var elem = $('#btn'+this.btns[1]);
		elem.prop('disabled', true);
		elem.addClass("btn-danger");
	}
	
	/** @Override */
	this.successCondition = function(chosenWord){
		return (chosenWord.trim().toUpperCase().replace(/[^a-zA-Z ]/g, "") === this.data[this.index].from.trim().toUpperCase().replace(/[^a-zA-Z ]/g, ""));
	}
	
	btnSelect = function(arg){
		var chosenWord = document.getElementById("btn"+arg).innerHTML;	
		this.reGenerateContext(chosenWord);	
		this.checkAnswer(chosenWord);	
	}

	this.resetBtns = function(){
		var elem = $('#btn'+this.btns[1]);
		elem.prop('disabled', false);
		elem.removeClass("btn-danger");
	}
	
	randomNums = function(size){
		var arr = [];
		while(arr.length < size){
			var randomnumber = Math.ceil(Math.random()*size);
			if(arr.indexOf(randomnumber) > -1) continue;
			arr[arr.length] = randomnumber;
		}
		return arr;
	};
	
	this.generateContext = function(){
		var contextString = this.data[this.index].context;
		var res = this.data[this.index].from.split(" ");	
		
		for (i = 0; i <res.length; i++){
			contextString = contextString.replace(res[i]," ______ ");
		}
		this.$context.html(contextString);
	};
	
	this.reGenerateContext = function(chosenWord){
		var contextString = this.$context.html();
		var res = chosenWord.split(" ");	
		
		for (i = 0; i <res.length; i++){
			contextString = contextString.replace(" ______ ",res[i].bold());
		}	
		this.$context.html (contextString);
	};
	
	
};

Ex2.prototype = Object.create(Exercise.prototype, {
	constructor: Ex2,
	/************************** SETTINGS ********************************/	
	description: {value: "Choose the word that fits the context"},
	customTemplateURL: {value: '../static/template/ex2.html'},
	btns: 		 {writable: true, value:[1,2,3]}, 
	optionNum:	 {value: 3},
	/*******************************************************************/
});
