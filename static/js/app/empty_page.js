/**
 * Created by Martin on 5/14/2017.
 */
import $ from 'jquery';
import {Loader} from "./loader";
import Mustache from 'mustache';

var EmptyPage = function(){
    this.init();
};

EmptyPage.prototype = {

    /************************** SETTINGS ********************************/
    emptyTemplateURL: 'static/template/empty_page.html',
    templateFields:
                    {
                         icon: 'static/img/illustrations/ntd_cloud.png',
                         title: "Not Enough Bookmarks",
                         info: 'You can get bookmarks when you read articles.',
                         btnText: 'Let\'s Read',
                         btnLink: 'https://www.zeeguu.unibe.ch/reading',
                    },
    emptyTemplate: 0,

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
        $.when(Loader.loadTemplateIntoElem(_this.emptyTemplateURL,$("#main-content"))).done(function(data){
            // Create the DOM and start the generator
            _this.emptyTemplate = data;
            _this.cacheDom();
            _this.genPage();
            _this.bindUIActions();
        });
    },

    genPage: function () {
        let html = Mustache.to_html(this.emptyTemplate,this.templateFields);
        $("#main-content").html(html);
    },

    bindUIActions: function(){
    },

    terminate: function(){
        //If any events terminate here
    },
};

export default EmptyPage;

