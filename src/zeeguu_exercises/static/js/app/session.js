/**
 * Created by Martin on 5/4/2017.
 */
import CookieHander from './cookie_handler';
import Settings from './settings';

let sessionID = null;

export default class Session {

    /**
     * @param name, name of the session identifier
     * @default from Zeeguu Settings
     * */
    static getSession (name = Settings.ZEEGUU_SESSION_ID) {
        if(sessionID) return sessionID;
        sessionID = CookieHander.getCookie(name);
        return sessionID
    }

    /**
     *  Set the zeeguu sessionID cookie to the default session
     * @param name, cookie identifier
     * @param value, value of the cookie
     * @param days, expiration time
     * @default form Zeeguu Settings
     * */
    static setSession (name = Settings.ZEEGUU_SESSION_ID, value = Settings.ZEEGUU_DEFAULT_SESSION, days = Settings.ZEEGUU_DEFAULT_COOKIE_EXPIRATION ) {
        CookieHander.setCookie(name,value,days);
    }
}