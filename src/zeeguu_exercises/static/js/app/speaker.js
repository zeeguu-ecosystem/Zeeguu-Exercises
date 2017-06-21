/**
 * Class for reading the text
 * */
export default class Speaker {

    /**
     * @param {String} txt - the text to be read.
     * @param {String} lang - red the text in language. @example 'nl-NL'
     */
    static speak(txt, lang) {
        lang  = Speaker.formatLanguage(lang);
        let spkr = new SpeechSynthesisUtterance();
        spkr.text = txt;
        spkr.lang = lang;
        speechSynthesis.speak(spkr);
    }

    /**
     * Format the language from zeeguu API to SpeechSynthesisUtterance API
     * For now given the 4 languages this solution works, later it will need modification
     * */
    static formatLanguage(lang) {
        return lang + "-" + lang.toUpperCase();
    }
};