import Home from './home';

(function() {
	if (sessionID = null){
		console.log("The session is not given");
	}
	window.onload = new Home();	
})();