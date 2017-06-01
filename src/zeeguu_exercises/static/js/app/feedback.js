/**
 * Created by Martin on 6/1/2017.
 */
import * as Mustache from "mustache";

export default class Feedback {

    static exerciseFeedbackBox () {
        let customHtml = this.generateCustomFields();
        swal({
                title: "Make Zeeguu Smarter",
                text: finalOptions,
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Something else ?",
                imageUrl: "static/img/illustrations/zeeguu_balloon.png",
                imageSize: "160x160",
                html: true
            },
            function (inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("The field can't be empty.");
                    return false
                }

                swal("Awesome!", "Your feedback will be used to improve our service.", "success");

            });
    }

    /**
     * Feedback fields for the feedback box within the exercise
     * @return {String} rendered html
     * */
    generateCustomFields(){
        let preDefinedOptions = {
            Options: [
                {name: "Too easy.", icon: 'static/img/emoji/confused.svg'},
                {name: "I know it.", icon: 'static/img/emoji/nerd.svg'},
                {name: "Don't want to see it.", icon: 'static/img/emoji/bored.svg'},]
        };
        let preOptionTemplate =
            '{{#Options}}' +
            '<div type = "button" class = "btn btn-default">' +
            '<div class = "emoji-icon" style = "background-image: url({{icon}});" ></div>' +
            '<span>{{name}}</span>' +
            '</div>' +
            '{{/Options}}';

        return (Mustache.render(preOptionTemplate,preDefinedOptions));
    }



}