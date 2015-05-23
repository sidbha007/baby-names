/**
 * Created by sbhask1 on 8/25/14.
 */


(function(){
    'use strict';


    angular
        .module('babyn.services')
        .factory('logger',logger);

    logger.$inject = ['$log'];

    function logger($log){

        var service = {
            showToasters: true,
            error: error,
            info: info,
            success: success,
            warning: warning,
            log: $log.log,
            debug: $log.debug
        };

        return service;


        function error(message, data, status){
            if(!(status && (status === 401 || status === 403))){
                //toastr.error(message, 'Error');
            }
            $log.error('Error: ' + message, data);
        }

        function info(message, data){
            //toastr.info(message);
            $log.info('Info: ' + message, data);
        }

        function success(message, data){
            //toastr.success(message, 'Success');
            $log.info('Success: ' + message, data);
        }

        function warning(message, data){
            //toastr.warning(message);
            $log.warn('Warning: ' + message, data);
        }


    }




})();
