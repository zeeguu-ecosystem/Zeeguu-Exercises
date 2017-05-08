/** Validator class takes care of the input for generator
 *  It asks for bookmarks from the server
 *  Based on the result, it decided on how to generate exercises
 *  If number of bookmarks == 0 then show no bookmarks page
 *  If number of bookmarks < requested number then generate exercises that fit
 *  If number of bookmarks >= requested number simply generate exercises
 **/

class Validator{

    constructor(){

    }

    /**
    *	Ajax get request to the Zeeguu API to get new bookmarks
    **/
    static getBookmarks(){
        var _this = this;
        var address = this.bookmarksURL+this.size+"?session="+this.session;
        return $.ajax({
            type: 'GET',
            dataType: 'json',
            url: address,
            data: this.data,
            success: function(data) {
                _this.loadingAnimation(false);
            },
            async: true
        });
    }

    /**
     *  @param args is matrix of exercise name and number of bookmarks,
     *         example: [[1,3],[2,4]] 3 bookmarks for ex1 and 4 bookmarks for ex2
     *  @return matrix of exercises similar to its input
     * */
    static checkBookmakrs(){

    }



}

export default Validator;