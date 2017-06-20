/**
 * Class for reading the text
 * */
export default class Speaker {

    /**
     * @param {String} txt - the text to be read.
     * @param {String} lang - red the text in language. Defualt english.
     */
    static speak(txt, lang = 'nl-NL') {
        let spkr = new SpeechSynthesisUtterance();
        spkr.text = txt;
        spkr.lang = lang;
        speechSynthesis.speak(spkr);
    }
};