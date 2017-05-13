/**
 * Created by Martin on 5/10/2017.
 */

import $ from 'jquery';

/**
 * A class responsible for loading templates and other resources
 * */
class Loader {
    /**
     * Return html template
     * @param {String} name of the template
     * @param {bool} asyncQUery, allows to choose the loading method
     *        @default asyncQuery is set to false
     * */
    static loadTemplate(tempUrl, asyncQuery = false) {
        return $.ajax({
            type: 'GET',
            dataType: 'html',
            url: tempUrl,
            async: asyncQuery
        }).responseText;
    }

    /**
     * Return html template and loads it in the given element
     * @param {String} tempUrl of the template
     * @param {jquery object} elem, load the html in this element
     * @param {boolean} append
     * @param {boolean} asyncQUery, allows to choose the loading method
     *        @default asyncQuery is set to true
     * */
    static loadTemplateIntoElem(tempUrl,elem,append = false, asyncQuery = true){
        return $.ajax({
            type: 'GET',
            dataType: 'html',
            url: tempUrl,
            data: this.data,
            success: function(data) {
                if(!append) {elem.html(data);}
                else {elem.append(data);}
            },
            async: asyncQuery
        });
    }
}
export {
    Loader,
}