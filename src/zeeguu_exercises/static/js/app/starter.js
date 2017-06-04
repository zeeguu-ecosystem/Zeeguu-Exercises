/**
 * Starter module, inherits from Home
 * */
import $ from 'jquery';
import Home from './home';

function Starter(){
	this.init();

	/** @Override */
	this.cacheDom =  function(){
		this.$elem 			= $("#starter-body");
		this.$exCards 		= this.$elem.find("#exercieses-cards");
		this.$attribution 	= this.$elem.find("#attribution");
		this.$credits 		= this.$elem.find("#credits");
	}
}

Starter.prototype = Object.create(Home.prototype, {
	constructor: Starter,
	/************************** SETTINGS ********************************/
	screenTemplateURL: {value:  'static/template/starter/starter.html'},
	cardTemplateURL: {value: 'static/template/starter/plan_card.html'},
	currentInvocation: {value: 'starterScreenRestart'},
	exNames: {
		value: [
			{
				name: "Casual",
				exID: [[1, 3]],
				info: 'Find the word in the context',
				icon: 'static/img/icons/search-engine.svg',
				gradientColor: 'starter-btn-header-casual'
			},
			{
				name: "Regular",
				exID: [[2, 4]],
				info: 'Choose the word that fits the context',
				icon: 'static/img/icons/test.svg',
				gradientColor: 'starter-btn-header-regular'
			},
			{
				name: "Serious",
				exID: [[3, 4]],
				info: 'Match each word with its translation',
				icon: 'static/img/icons/question.svg',
				gradientColor: 'starter-btn-header-serious'
			},
		]
	},
});

export default Starter;