/**
 * The class responsible for sending a feedback regarding exercise outcome
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
        let _this = this;
        this.wordId = wordId;
        let feedbackOptions = this.exerciseFeedbackOptions();
        let inputBox = this.exerciseFeedbackInput();
        swal({
                title: "",
                text: feedbackOptions + inputBox,
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                imageUrl: "static/img/illustrations/zeeguu_balloon.png",
                imageSize: "110x110",
                allowOutsideClick: true,
                html: true
            },
            function () {
                let inputValue = $('#feedback-input-box').val().trim();
                if (inputValue != "") {
                    _this.submitFeedback(wordId,inputValue,_this.resultSubmitSource);
                    _this.successfulFeedback();
                    return;
                }
                swal.close();
            });
        this.bindUIActions();
    }

    /**
     * Success message when the feedback is being submitted
     * */
    successfulFeedback(){
        swal({
            title: "",
            text: "",
            timer: 1000,
            type:"success",
            showConfirmButton: false,
            showCancelButton: false,
            closeOnConfirm: false,
            confirmButtonText: "",
        });
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
     * Returns the input box for the feedback
     * @return {String}, the input box for the feedback
     * */
    exerciseFeedbackInput(){
        return  '<div class="input-group feedback-input">'+
                    '<input type="text" class="form-control" id = "feedback-input-box" placeholder="Something else ?">'+
                '</div>';
    }

    /**
     *	Request the submit for feedback to the Zeeguu API
     *  @param {number}, id, id of the word
     *  @param {String}, feedbackOption, the outcome of the feedback @example: too_easy
     *  @param {String}, resultSubmitSource, the source of submission @example: Recognize_L1W_in_L2T
     **/
    submitFeedback(wordID,feedbackOption,resultSubmitSource){
        //console.log(Settings.ZEEGUU_API + Settings.ZEEGUU_EX_OUTCOME_ENDPOINT + "/" + feedbackOption + resultSubmitSource + "/" + -1 + "/" + wordID + "?session="+this.sessionId);
		$.post(Settings.ZEEGUU_API + Settings.ZEEGUU_EX_OUTCOME_ENDPOINT + "/" + feedbackOption + resultSubmitSource + "/" + -1 + "/" + wordID + "?session="+this.sessionId);
    }
}