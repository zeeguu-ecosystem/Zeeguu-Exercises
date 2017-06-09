/**
 * Created by Martin on 6/9/2017.
 */
import page from "page";
import Generator from './generator';
import Starter from './starter';



page('/', index);
page('/get-ex', getEx);
page('/practice/:practicePlan', practice);
page();

/**
 * Main starter screen route
 * */
function index() {
        window.onload = ()=> {new Starter()};
}

/**
 * Main starter screen route
 * */
function getEx() {
    (function() {
        window.onload = new Generator([[1,5],[2,3]]);
    })();
}

/**
 * Practice route
 * */
function practice(ctx) {
    //console.log(Starter.prototype.exNames[ctx.params.practicePlan].exID);
   (function() {
        window.onload = new Generator([[1,3],[2,3]]);
    })();
}





