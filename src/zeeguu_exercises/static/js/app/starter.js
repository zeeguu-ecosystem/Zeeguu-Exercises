/**
 * Starter module, inherits from Home
 * */
import Home from './home';

function Starter(){

	/** @Override */


	/** @Override */
	this.next = function (){
		this.$to.html("\""+this.data[this.index].to+"\"");
		this.$context.html(this.data[this.index].context);
		this.$input.val("");
	};
}

Starter.prototype = Object.create(Home.prototype, {
	constructor: Starter,
	/************************** SETTINGS ********************************/
	customTemplateURL: {value: 'static/template/exercise/ex1.html'},
});

export default Starter;