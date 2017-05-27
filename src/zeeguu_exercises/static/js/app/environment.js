/**
 * Created by Martin on 5/12/2017.
 */

import $ from 'jquery';
import LoadingAnimation from './animations/loading_animation';

class Environment{

    static bindAjaxEnviromentFunctions(){
        let loadingAnimation = new LoadingAnimation();
        let $_document =  $(document);

        $_document.bind("ajaxStart.loader", function() {
            loadingAnimation.loadingAnimation(true);
        });

        $_document.bind("ajaxComplete.loader", function() {
            loadingAnimation.loadingAnimation(false);
        });
    }

    static unbindAjaxEnviromentFunctions(){
        let $_document =  $(document);
        $_document.unbind(".loader");
    }


}

export default Environment;