/** Validator class takes care of the input for generator
 *  It asks for bookmarks from the server
 *  Based on the result, it decided on how to generate exercises
 *  If number of bookmarks == 0 then show no bookmarks page
 *  If number of bookmarks < requested number then generate exercises that fit
 *  If number of bookmarks >= requested number simply generate exercises
 *  @param  example: [[2,3],[1,3],[3,3],[4,3],[1,3]]
 **/

import LoadingAnimation from './loading_animation';
import $ from 'jquery';
import Settings from "./settings";
import Session from "./session";
import Util from "./util";

class Validator{
    constructor(set){
        /** Class parameters*/
        this.set = set;
        this.loadingAnimation = new LoadingAnimation();
        this.data = 0;
        this.session = Session.getSession();
        this.totalValidSize = 0;
    }

    /**
    *	Ajax get request to the Zeeguu API to get new bookmarks
    **/
    getBookmarks(totalSize){
        let _this = this;
        var address = Settings.ZEEGUU_API + Settings.ZEEGUU_STUDY_BOOKMARKS + totalSize + "?session=" + _this.session;
        return $.ajax({
            beforeSend: function(){
                _this.loadingAnimation.loadingAnimation(true);
            },
            complete: function(){
                _this.loadingAnimation.loadingAnimation(false);
            },
            type: 'GET',
            dataType: 'json',
            url: address,
            data: this.data,
            async: true,
        });
    }
    /**
     *  @param args is matrix of exercise name and number of bookmarks,
     *         example: [[1,3],[2,4]] 3 bookmarks for ex1 and 4 bookmarks for ex2
     *  @return matrix of exercises similar to its input
     * */
    getValidBookMarks(callback){
        let _this = this;
        //Calculate the size
        console.log(this.set);
        let totalSize = Util.calcSize(this.set,this.set.length);
        this.totalValidSize = totalSize;
        $.when(this.getBookmarks(totalSize)).done(function (ldata) {
            _this.data = (ldata);
            console.log("Pass1");
            _this.validateSet(totalSize);
            callback(ldata);
        });
        console.log("Pass2");
    }

    validateSet(totalSize){
        //Main check
        if(this.data.length == 0){/** bookmarks.length == 0, no-bookmarks page*/
            //TODO no bookmarks page
            alert("no bookmarks" + " bokmrLen: " + this.data.length + ", needLen: " + totalSize);
        }
        else if(this.data.length < totalSize){/** bookmarks.length < set.length, fit the ex*/
            alert("does not fit" + " bokmrLen: " + this.data.length + ", needLen: " + totalSize);
        }
        else{/** bookmarks.length < set.length, gen the ex*/
            alert("its all good" + " bokmrLen: " + this.data.length + ", needLen: " + totalSize);
        }
    }

    noBookmarkPage(){

    }

    get validSize(){
        return this.totalValidSize;
    }
}

export default Validator;