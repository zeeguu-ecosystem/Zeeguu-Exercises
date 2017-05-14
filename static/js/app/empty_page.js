/**
 * Created by Martin on 5/14/2017.
 */
import $ from 'jquery';
import {Loader} from "./loader";

var EmptyPage = function(){
    this.init();
};

EmptyPage.prototype = {

    /************************** SETTINGS ********************************/
    emptyTemplate: 'static/template/empty_page.html',

    /*********************** General Functions ***************************/
    /**
     *	Saves the dom
     **/
    cacheDom: function(){
    },


    /**
     *	Exercise initialaizer
     **/
    init: function(){
        this.start();
    },

    /**
     *	The main constructor
     **/
    start: function (){
        var _this = this;
        $.when(Loader.loadTemplateIntoElem(_this.emptyTemplate,$("#main-content"))).done(function(){
            // Create the DOM and start the generator
            _this.cacheDom();
            _this.bindUIActions();
        });
    },

    bindUIActions: function(){
    },

    terminate: function(){
        //If any events terminate here
    },
};

export default Home;

