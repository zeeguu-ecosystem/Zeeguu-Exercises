import Session from '../session';
Session.setSession();
let redirect = window.location.protocol + "//" + window.location.hostname;
window.location.href = (redirect === "http://127.0.0.1")? redirect+":5000":redirect;
