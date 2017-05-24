/**
 * Animation class is for general animations within the application
 * The GeneralAnimation class is a singleton class,
 * meaning that there is at most 1 instance of the class available
 * */
import $ from 'jquery';
import {Loader} from "./loader";

let animationInstance = null;

class LoadingAnimation {
    constructor(){
        if(animationInstance){
            return animationInstance;
        }
        /** Class parameters*/
        this.animationURL =  'static/template/animation.html';
        this.$loader = null;
        this.createDom();
    }

    /**
     * Load the dom from the specified file
     * */
    createDom(){
        let _this = this;
        $.when(Loader.loadTemplateIntoElem(_this.animationURL,$('body'),true)).done(function(){
            _this.updateCache();
        });
    }

    /**
     * Update/save the cache of the dom
     * */
    updateCache(){
        this.$loader = $('#loader');
    }

    static loadingAnimation(activate) {
        if (activate === true) {
            $('body').children('div').addClass('hide');
             $('#loader').removeClass('hide');
        } else {
            $('body').children('div').removeClass('hide');
            $('#loader').addClass('hide');
        }
    }
}

export default LoadingAnimation;