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
				name: "Basic",
				exID: [[1, 3]],
				info: '3 minutes is just the 0.2% of your day but you can practice 15 words',
				icon: 'static/img/icons/starter/pinwheel.svg',
				gradientColor: 'starter-btn-header-level1',
				time: 3
			},
			{
				name: "Casual",
				exID: [[2, 4]],
				info: '5 minutes is just the 0.3% of your day but you can practice 25 words',
				icon: 'static/img/icons/starter/apple.svg',
				gradientColor: 'starter-btn-header-level2',
				time: 5
			},
			{
				name: "Regular",
				exID: [[3, 4]],
				info: '8 minutes is just the 0.5% of your day but you can practice 40 words',
				icon: 'static/img/icons/starter/diamond.svg',
				gradientColor: 'starter-btn-header-level3',
				time: 8
			},
		]
	},
});

export default Starter;