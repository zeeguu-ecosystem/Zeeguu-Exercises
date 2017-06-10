/**
 * Created by Martin on 6/9/2017.
 */
import page from "page";
import Generator from './generator';
import Starter from './pages/starter';
import NotFound from './pages/not_found';

page('/', index);
page('/get-ex', getEx);
page('/practice/:practicePlan', practice);
page('*', notFound);
page({hashbang:true});
page.start();

/**
 * Main starter screen route
 * */
function index() {
    window.onload = new Starter();
}

/**
 * Main starter screen route
 * */
function getEx() {
    window.onload = new Generator([[1,5],[2,3]]);
}

/**
 * Practice route
 * */
function practice(ctx) {
    window.onload = new Generator(Starter.prototype.exNames[ctx.params.practicePlan].exID);
}

/**
 * Not found page
 * */
function notFound(){
    window.onload = new NotFound();
}






