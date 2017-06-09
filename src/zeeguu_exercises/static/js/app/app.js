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
    (function () {
        window.onload = ()=> {new Starter()};
    })();
}

/**
 * Main starter screen route
 * */
function getEx() {
    alert('get ex');
    (function() {
        window.onload = new Generator([[1,3],[2,3]]);
    })();
}
/**
 * Practice route
 * */
function practice(ctx) {
    Starter.prototype.newEx(Starter.prototype.exNames[ctx.params.practicePlan].exID);
}





