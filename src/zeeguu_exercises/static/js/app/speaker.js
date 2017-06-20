/**
 * Class for reading the text
 * */
export default class Speaker {

    /**
     * @param {String} txt - the text to be read.
     * @param {String} lang - red the text in language. Defualt english.
     */
    speak(txt, lang = 'en-US') {
        let spkr = new SpeechSynthesisUtterance();
        spkr.text = text;
        spkr.lang = language;
        speechSynthesis.speak(spkr);
    }
};