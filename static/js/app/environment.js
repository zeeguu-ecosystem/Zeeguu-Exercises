/**
 * Created by Martin on 5/12/2017.
 */

import $ from 'jquery';
import LoadingAnimation from './loading_animation';

class Environment{

    static setAjaxEnviromentFunctions(){
        let loadingAnimation = new LoadingAnimation();
        let $_document =  $(document);

        $_document.ajaxStart(function () {
            loadingAnimation.loadingAnimation(true);
        });

        $_document.ajaxComplete(function () {
            loadingAnimation.loadingAnimation(false);
        });
    }
}

export default Environment;