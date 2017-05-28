/** Modular Zeeguu Powered Exercise @author Martin Avagyan
 *  @initialize it using: new Exercise();
 *  @customize it by using prototypal inheritance
**/

import $ from 'jquery';
import swal from 'sweetalert';
import events from '../pubsub';
import Util from '../util';
import Settings from '../settings';
import Session from '../session';
import {Loader} from '../loader';
import ShakeAnimation from "../animations/shake_animation";

var Exercise = function(data,index,size){
	this.init(data,index,size);	
	//TODO unbind method
};

Exercise.prototype = {
	
	/************************** SETTINGS ********************************/	
	data: 0,	
	customTemplateURL: 0,
	index: 0,
	startIndex: 0,
	size: 0, //default number of bookmarks
	description:  "Solve the exercise",  //default description
	session: Session.getSession(), //Example of session id 34563456 or 11010001
	startTime: 0,
	isHintUsed: false,
    minRequirement: 1,
	resultSubmitSource: Settings.ZEEGUU_EX_SOURCE_RECOGNIZE,//Defualt submission
	successAnimationTime: 2000,
	
	/*********************** General Functions ***************************/	
	/**
	*	Loads the HTML exercise template from static
	**/
	
	createCustomDom: function(){
        Loader.loadTemplateIntoElem(this.customTemplateURL,$("#custom-content"));
	},
	
	/**
	*	Saves the common dom in chache
	**/
	cacheDom: function(){
		this.$elem 				= $("#ex-module");		
		this.$container  		= this.$elem.find("#ex-container");
		this.$description  		= this.$elem.find("#ex-descript");
		this.$loader 			= this.$elem.find('#loader');
		this.$status 			= this.$elem.find("#ex-status");		
		this.$statusContainer 	= this.$elem.find('#ex-status-container');
		this.cacheCustomDom();
	},
	
	/**
	*	Exercise initialaizer
	**/
	init: function(data,index,size){
		var _this = this;
		$.when(Loader.loadTemplateIntoElem(_this.customTemplateURL,$("#custom-content"))).done(function(){
			_this.cacheDom();	
			_this.bindUIActions();
			_this._constructor(data,index,size);	
		});		
	},	
	
	
	/**
	*	The main constructor
	**/
	_constructor: function (data,index,size){		
		this.data  = data;
		this.index = index;
		this.startIndex = index;
		this.size  = size;
		this.shake = new ShakeAnimation();
		this.setDescription(); 	
		this.next();
        this.startTime = Date.now();
	},
		
	/**
	*	Populates custom exercise description
	**/
	setDescription: function(){
		this.$description.html(this.description);
	},
	
	/**
	*	When the ex are done, notify the observers
	**/
	onExComplete: function (){		
		setTimeout(function() { events.emit('exerciseCompleted');}, 2000);
	},
	
	/**
	*	Check selected answer with success condition
	**/
	checkAnswer: function (chosenWord){
		if (this.successCondition(chosenWord)){		
			this.onSuccess();
			return;
		}			
		this.wrongAnswerAnimation();
		this.submitResult(this.data[this.index].id,Settings.ZEEGUU_EX_OUTCOME_WRONG);
	},



	
	/**
	*	Actions taken when the succes condition is true
	**/
	onSuccess: function(){
		$("#ex-footer-primary").removeClass ('mask-appear');
		$("#ex-footer-secondary").toggleClass('mask-appear');
		this.handleSuccessCondition();
	},

	revertPrimary: function () {
		$("#ex-footer-primary").toggleClass ('mask-appear');
		$("#ex-footer-secondary").removeClass('mask-appear');
	},

	handleSuccessCondition: function () {
		var _this = this;
        this.animateSuccess();
        //Submit the result of translation
        this.submitResult(this.data[this.index].id,Settings.ZEEGUU_EX_OUTCOME_CORRECT);
        // Notify the observer
        events.emit('progress');
        this.index++;
	},

    /**
     * On success condition true, generate new exercise
     * */
    onRenderNextEx: function () {
		this.revertPrimary();
        // The current exercise set is complete
        if(this.index == this.size + this.startIndex){
            this.onExComplete();
            return;
        }
        this.next();
		this.startTime = Date.now();
    },
	
	/**
     *	Request the submit to the Zeeguu API
	 *  e.g. https://www.zeeguu.unibe.ch/api/report_exercise_outcome/Correct/Recognize/1000/4726?session=34563456 
     **/
    submitResult: function(id,exOutcome){
    	let _this = this;
		//If the user used the hint, do not register correct solution, resent the hint, move on
		if(this.isHintUsed && exOutcome == Settings.ZEEGUU_EX_OUTCOME_CORRECT) {
			this.isHintUsed = false;
			return;
		}
		//If hint is used twice, ignore request
		if(this.isHintUsed && exOutcome == Settings.ZEEGUU_EX_OUTCOME_HINT) return;
		//Calculate time taken for single exercise
		var exTime = Util.calcTimeInMilliseconds(this.startTime);
		//Request back to the server with the outcome
		console.log(Settings.ZEEGUU_API + Settings.ZEEGUU_EX_OUTCOME_ENDPOINT + exOutcome +  _this.resultSubmitSource + "/" + exTime + "/" + id + "?session="+this.session);
        $.post(Settings.ZEEGUU_API + Settings.ZEEGUU_EX_OUTCOME_ENDPOINT + exOutcome +  _this.resultSubmitSource + "/" + exTime + "/" + id + "?session="+this.session);
    },

	
	/**
	*	Removes focus of page elements
	**/
	prepareDocument: function(){
		if (document.activeElement != document.body) document.activeElement.blur();
	},
	
	/**
	*	User hint handler
	**/
	handleHint: function(){
		this.submitResult(this.data[this.index].id,Settings.ZEEGUU_EX_OUTCOME_HINT);
		this.isHintUsed = true;

		this.giveHint();
	},
	
	
	/*********************** Interface functions *****************************/
	/**
	*	Binding UI with Controller functions
	**/
	bindUIActions: function(){},
	
	/**
	*	Condition used by checkAnswer 
	*	If true, then a correct answer was given
	**/
	successCondition: function(){},
	
	
	/**
	*	Gives a hint when the hint button is pressed
	**/
	giveHint: function (){},
	
	/**
	*	Populates the next exercise
	**/
	next: function (){},
	
	/**
	*	Cahes custom dom of the exercise
	**/
	cacheCustomDom: function(){},

	/**
	*	Animation for wrong solution
	**/
	wrongAnswerAnimation: function(){},

	/************************** Animations ********************************/	

	/**
	*	Animation for successful solution
	**/
	animateSuccess: function(){
		let _this = this;
		this.$statusContainer.removeClass('hide');
		setTimeout(function(){
			if (_this.$statusContainer.length > 0) {
				_this.$statusContainer.addClass('hide');
			}
		}, _this.successAnimationTime);
	},	
};

export default Exercise;