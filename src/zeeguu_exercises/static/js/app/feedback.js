/**
 * Created by Martin on 6/1/2017.
 */
import * as Mustache from "mustache";
import $ from "jquery";
import Settings from "./settings";

export default class Feedback {

    /**
     * Construct the feedback class
     * @param {number}, id of the current word
     * @param {String}, resultSubmitSource,
     * */
    constructor(resultSubmitSource, sessionId){
         /** Class parameters*/
        this.wordId = -1;//will be set whenever the feedback box is called
        this.resultSubmitSource = resultSubmitSource;
        this.sessionId = sessionId;
    }

    /**
     * Bind all the actions connected to this module
     * return {void}
     * */
    bindUIActions(){
        //Bind UI action of credits to the function
        $('.btn-feedback-option').click((event) => {this.feedbackAction($(event.target));});
    }

    /**
     * The action performed predefined option is clicked
     * @param {Object}, elem, the element that is clicked
     * */
    feedbackAction(elem){
        this.submitFeedback(this.wordId,elem.attr('value'),this.resultSubmitSource);
        this.successfulFeedback();
    }

    /**
     * @param {number}, session id
     * @param {String}, resultSubmitSource,
     * */
    exerciseFeedbackBox (wordId) {
        this.wordId = wordId;
        let _this = this;
        let feedbackOptions = this.exerciseFeedbackOptions();
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
                _this.submitFeedback(wordId,inputValue,_this.resultSubmitSource);
                _this.successfulFeedback();
            });
        this.bindUIActions();
    }

    /**
     * Success message when the result is being submitted
     * */
    successfulFeedback(){
        swal("Awesome!", "Your feedback will be used to improve our service.", "success");
    }

    /**
     * Feedback fields for the feedback box within the exercise
     * Using html template and Mustache to render the content
     * @return {String} rendered html
     * */
    exerciseFeedbackOptions(){
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

    /**
     *	Request the submit for feedback to the Zeeguu API
     *  @param {number}, id, id of the word
     *  @param {String}, feedbackOption, the outcome of the feedback @example: too_easy
     *  @param {String}, resultSubmitSource, the source of submission @example: Recognize_L1W_in_L2T
     **/
    submitFeedback(wordID,feedbackOption,resultSubmitSource){
        console.log(Settings.ZEEGUU_API + Settings.ZEEGUU_EX_OUTCOME_ENDPOINT + "/" + feedbackOption + resultSubmitSource + "/" + -1 + "/" + wordID + "?session="+this.sessionId);
		$.post(Settings.ZEEGUU_API + Settings.ZEEGUU_EX_OUTCOME_ENDPOINT + "/" + feedbackOption + resultSubmitSource + "/" + -1 + "/" + wordID + "?session="+this.sessionId);
    }
}