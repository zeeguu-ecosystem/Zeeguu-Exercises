var bar,ProgressBar = {
	settings:{
		persent: 0,
		size: SIZE,
		amount: 100/SIZE,
		elem: document.getElementById("ex-bar"),
	},
	
	init: function(size,persent){
		this.settings.persent = persent;
		this.settings.size = size;
		
		this.bindUIActions();
		
		bar = this.settings;
		bar.persent = persent;
		bar.size = size;
	},
	
	restart: function(){
		bar.persent = 0;
		bar.elem.style.width = persent;
	},
	
	bindUIActions: function() {
		
	},	
	move: function() {  
		  var width = bar.persent;
		  var id = setInterval(frame, 10);
		  var max_move = bar.persent+bar.amount;
		  function frame() {
			if (width >= max_move || width >=100) {
			  clearInterval(id);
			} else {
			  width++; 			  
			  bar.elem.style.width = width + '%'; 
			}
			bar.persent = max_move;
		}
	},
};
