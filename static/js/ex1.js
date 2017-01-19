function Ex1(){
	this.init();
	
	this.wrongAnswerAnimation = function(){
		swal({
			title: "Wrong Fucking helsssl man...",
			allowOutsideClick: true,
			type: "error",
			text: "Hint: the word starts with \"" +this.data[this.index].from.trim().charAt(0)+ "\"",
			confirmButtonText: "ok",
			showConfirmButton: true,
			allowEscapeKey:true,
			showLoaderOnConfirm:true,
		});
	}
	
	
};
Ex1.prototype = Object.create(Exercise.prototype, {
	constructor: Ex1,
	/////////////////////////////// SETTINGS ////////////////////////////	
	size: 		 {value: 5}, 
	description: {value: "Find the word in the context With guess!"},		
	/////////////////////////////////////////////////////////////////////
	
	
	/*wrongAnswerAnimation: {value: function(){
		swal({
			title: "Wrong Fucking hell man...",
			allowOutsideClick: true,
			type: "error",
			text: "Hint: the word starts with \"" +this.data[this.index].from.trim().charAt(0)+ "\"",
			confirmButtonText: "ok",
			showConfirmButton: true,
			allowEscapeKey:true,
			showLoaderOnConfirm:true,
		});
	}},*/
	
});