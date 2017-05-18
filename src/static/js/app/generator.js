/** Modular Zeeguu Exercise Generator @authors Martin Avagyan, Vlad Turbureanu
 *  @initialize it using: new Generator(args);
 *  @param args is matrix of exercise name and number of bookmarks,
 *         example: [[1,3],[2,4]] 3 bookmarks for ex1 and 4 bookmarks for ex2
 *  @customize it by using prototypal inheritance
 **/

import $ from 'jquery';
import Ex1 from './exercises/ex1';
import Ex2 from './exercises/ex2';
import Ex3 from './exercises/ex3';
import Ex4 from './exercises/ex4';
import ProgressBar from './progress_bar';
import events from './pubsub';
import swal from 'sweetalert';
import Session from './session';
import {Loader} from './loader';
import Util from './util';
import Validator from './validator';


 
var Generator = function(set){
    this.init(set);
};

Generator.prototype = {
    /************************** SETTINGS ********************************/
    data: 0,		//bookmakrs from zeeguu api
    set: 0,			//matrix for initialaizer
    index: 0,		//current index from set
    startTime: new Date(),
    session: Session.getSession()  , //Example of session id 34563456 or 11010001
    templateURL: 'static/template/exercise.html',

    /**
     *	Saves the common dom in chache
     **/
    cacheDom: function(){
    },

    /**
     * The function caches imports in local scope for later to be referenced as a string
     * */
    cacheExerciseImports: function(){
        this.Ex1 = Ex1;
        this.Ex2 = Ex2;
        this.Ex3 = Ex3;
        this.Ex4 = Ex4;
    },

    /**
     *	Generator initialaizer
     **/
    init: function(set){
        this.set = set;
        var _this = this;

        this.validator = new Validator(set);

        // "bind" event
        this.$eventFunc = function(){_this.nextEx()};
        events.on('exerciseCompleted',this.$eventFunc);

        this.start();
    },

    restart: function(){
        this.start();
    },

    /**
     *	Call to load the data from API
     **/
    start: function ()
    {
        let _this= this;
        //Callback wait until the bookmarks are loaded
        this.validator.getValidBookMarks(function(ldata) {
            _this.data = (ldata);
            _this.set = _this.validator.validSet;
            //Terminate generator if not enough bookmarks
            if(_this.set ==null || _this.set <=0) {
                _this.terminateGenerator();
                return;
            }
            //Loads the HTML general exercise template from static
            $.when(Loader.loadTemplateIntoElem(_this.templateURL,$("#main-content"))).done(function(){
                // Create the DOM and start the generator
                ProgressBar.init(0, _this.validator.validSize);
                _this.cacheDom();
                _this.cacheExerciseImports();
                _this._constructor();
            });
        });
    },

    filterArray: function(bookmarksData)
    {
        for(var i = 0; i< bookmarksData.length;i++){
            var tempIdx = indexOf(bookmarksData[i]);
            if(tempIdx == -1 || tempIdx == i){
                continue;
            }
            bookmarksData.splice(i, 1);
        }
        return bookmarksData;
    },
    /**
     *	The main constructor
     **/
    _constructor: function (){
        this.index = 0;
        this.startTime = new Date();
        this.nextEx();
    },

    /**
     *	Add Ex here
     **/
    nextEx: function(){
        if(this.index >= this.set.length){
            this.onExSetComplete();
            return;
        }
        var ex = this.set[this.index][0];
        var size = this.set[this.index][1];
        var startingIndex = Util.calcSize(this.set,this.index);

        this.$currentEx = null;
        delete this.$currentEx;
        //Local scope reference
        this.$currentEx = new (this['Ex'+ex])(this.data,startingIndex,size);
        this.index++;
    },
    /**
     *	Request the submit API
     **/
    submitResults: function(){
        //TODO submit user feedback if any
    },

    /**
     *	When the ex are done perform an action
     **/
    onExSetComplete: function (){
        var _this = this;
        var redirect = _this.distractionShieldOriginalDestination();
		_this.submitResults();
        swal({
                title: "You rock!",
                text: "That took less than "+ Util.calcTimeInMinutes(_this.startTime) + ". practice more?",
                type: "success",
                showCancelButton: true,
                confirmButtonColor: "#7eb530",
                confirmButtonText: "Let's do it!",
                cancelButtonText: redirect!=null?"Take me away!":"Go home!",
                closeOnConfirm: true
            },
            function(isConfirm){
                if(isConfirm){
                    _this.restart();
                    return;
                }
                _this.terminateGenerator();
                _this.restartHome();
                if (redirect!=null) {
                    window.location = redirect;
                }
            });
    },

    terminateGenerator: function(){
        events.off('exerciseCompleted',this.$eventFunc);
        events.emit('generatorCompleted');
    },
    restartHome: function(){
        events.emit('homeRestart');
    },

    /**
     * Extraction of redirect url for Distraction Shield
     **/
    distractionShieldOriginalDestination: function() {
        var url = window.location.href;
        var regex = new RegExp("[?&]redirect(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results || !results[2]) return null;
        var newUrl = decodeURIComponent(results[2].replace(/\+/g, " "));
        if (newUrl.indexOf('?') > -1) {
            newUrl += "&tds_exComplete=true";
        } else {
            newUrl += "?tds_exComplete=true";
        }
        return newUrl
    },
}	

export default Generator;