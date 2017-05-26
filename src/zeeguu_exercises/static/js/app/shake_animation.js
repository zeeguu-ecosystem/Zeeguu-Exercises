/**
 * This class is responsible for animating elements that have a class attribute "shakable".
 * When an element is clicked with class "shakable", class "shake" is added to its attributes.
 * After the animation is done the "shake" class is removed.
 * In HTML use the class "shakable" for each element that shake property
 * @Example <div class="shakable"></div>
 * */

import $ from 'jquery';

export default class ShakeAnimation{

    constructor(){
        this.bindUIActions();
    }

    /**
     * Make all the actions connected to this module
     * return {void}
     * */
    bindUIActions(){
        var _this = this;
        $('.shakable').on("click", _this.shake.bind(this));
    }

    /**
     * Use the clicked element to invoke shakeElement
     * @return {void}
     * */
    shake(){
        this.shakeElement($(this));
    }

    /**
     * Function adds class shake, after the animation is done,
     * the class shake is removed from the element
     * @param {jQuery element}, elem
     * @return {void}
     * */
    shakeElement(elem){
        var animationEvent = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
        elem.addClass('shake wrongAlert');
        elem.one(animationEvent, function(event) {
            elem.removeClass('shake')
        });
    }

    /**
     * Make the given element shakable
     * @param {Object}, element
     * @return {void}
    * */
    makeShakable(elem){
        elem.addClass('shakable');
        this.bindUIActions();
    }
}
