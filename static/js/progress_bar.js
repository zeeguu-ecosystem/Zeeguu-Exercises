var persent = 0;
var amount = 100/SIZE;
console.log(amount);
function move_progress() {
  var elem = document.getElementById("ex-bar");   
  var width = persent;
  var id = setInterval(frame, 10);
  var max_move = persent+amount;
  function frame() {
    if (width >= max_move || width >=100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
    persent = max_move;
  }
}

function restart_progress_bar(){
	persent = 0;
	document.getElementById("ex-bar").style.width = persent;
}