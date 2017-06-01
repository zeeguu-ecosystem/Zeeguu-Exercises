/**
 * Created by Martin on 6/1/2017.
 */
import * as Mustache from "mustache";
import $ from "jquery";

export default class Feedback {

    static bindUIActions(){
        //Bind UI action of credits to the function
        $('.btn-feedback-option').click((event) => {Feedback.feedbackAction($(event.target));});
    }

    static feedbackAction(elem){
        console.log("J here ");
        console.log(elem.attr('value'));
    }


    static exerciseFeedbackBox () {
        let feedbackOptions = Feedback.exerciseFeedbackOptions();
        swal({
                title: "Make Zeeguu Smarter",
                text: feedbackOptions,
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Something else ?",
                imageUrl: "static/img/illustrations/zeeguu_balloon.png",
                imageSize: "140x140",
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
        Feedback.bindUIActions();
    }

    /**
     * Feedback fields for the feedback box within the exercise
     * @return {String} rendered html
     * */
    static exerciseFeedbackOptions(){
        let preDefinedOptions = {
            Options: [
                {name: "Too easy.", icon: 'static/img/emoji/bored.svg', val: 'too_easy'},
                {name: "I know it.", icon: 'static/img/emoji/nerd.svg',val: 'i_already_know_this'},
                {name: "Don't want to see it.", icon: 'static/img/emoji/confused.svg', val: 'dont_show_it_to_me_again'}]
        };
        let preOptionTemplate =
            '{{#Options}}' +
            '<div type = "button" value = {{val}} class = "btn btn-default btn-feedback-option">' +
                '<div class = "emoji-icon"  value = {{val}} style = "background-image: url({{icon}});" ></div>' +
                '<span value = {{val}}>{{name}}</span>' +
            '</div>' +
            '{{/Options}}';

        return (Mustache.render(preOptionTemplate,preDefinedOptions));
    }


}