import Home from './home';
import Environment from "./environment";

(function() {
    Environment.setAjaxEnviromentFunctions();
	window.onload = new Home();	
})();