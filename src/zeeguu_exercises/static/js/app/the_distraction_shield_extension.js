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
        var url = window.location.href;
        var regex = new RegExp("[?&]redirect(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results || !results[2]) return null;
        var newUrl = decodeURIComponent(results[2].replace(/\+/g, " "));
        if (newUrl.indexOf('?') > -1) {
            newUrl += "&tds_exComplete=true";
        } else {
            newUrl += "?tds_exComplete=true";
        }
        return newUrl
    }

}