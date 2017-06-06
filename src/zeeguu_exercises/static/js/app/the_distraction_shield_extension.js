/**
 * Created by Martin on 5/29/2017.
 */
/**
 * The following class implements methods for The Distraction Shield browser extension
 * @example of redirect url https://www.zeeguu.unibe.ch/practice/get-ex?redirect=https://www.facebook.com/
 * */
export default class TDS {

    /**
     * Extraction of redirect url for Distraction Shield
     * @return {String}, redirect url or Null if no url is found
     **/
    static distractionShieldOriginalDestination () {
        let url = window.location.href;
        let results = /[?]tds_redirect=(.*)/.exec(url);
        if (!results || !results[1]) { return null; }
        let newUrl = results[1];
        newUrl += (/[?]/.test(newUrl) ? "&" : "?") + "tds_exComplete=true";
        return newUrl;
    }

}