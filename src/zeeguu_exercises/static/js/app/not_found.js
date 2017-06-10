/**
 * Not found page, inherits from Empty Page
 * */
import EmptyPage from './empty_page';

function NotFound(){
	this.init();
}

NotFound.prototype = Object.create(EmptyPage.prototype, {
	constructor: NotFound,
	/************************** SETTINGS ********************************/
	templateFields: {
        value: [
            {
                icon: 'static/img/illustrations/ntd_cloud.png',
                title: "I Found Nothing",
                info: "Let's pretend this never happened.",
                btnPrime: false,
                btnPrimeText: false,
                btnSecond: false,
                btnSecondText: false,
            },
        ]
	},
});
export default NotFound;