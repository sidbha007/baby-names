
(function() {
    'use strict';


    angular
        .module('babyn.services')
        .factory('dataservice', dataservice);

        dataservice.$inject = ['$http', '$resource',  'logger'
        ];

    function dataservice($http, $resource, logger
        ) {




        ///////////////////////
        var namesResource = $resource(
                '/name',
            {}, {
                query : {
                    method : 'GET',
                    url :  '/name',
                    params : {},
                    isArray : true,
                    cache : false
                }
            });


        function getNames(criteria){
            return namesResource.query(criteria)
             .$promise
             .then(getNamesComplete)
             .catch(getNamesFailed);

             function getNamesComplete(response) {
                logger.debug('json data getNames:  ');
             return response;
             }

             function getNamesFailed(error) {
                logger.error('Failed to get names data.', error.data, error.status);
             }
        }

        function getName(id){
            return nameResource.get({'id': id})
                .$promise
                .then(getNameComplete)
                .catch(getNameFailed);

            function getNameComplete(response) {
                logger.debug('json data getPipeline:  ', angular.toJson(response));
                return response;
            }

            function getNameFailed(error) {
                logger.error('Failed to get pipeline data.', error.data, error.status);
            }
        }


        ////////////////////////////////
        var nameResource = $resource('/name/ ',
            {}, {
                addnew : {
                    method : 'POST',
                    params : {},
                    isArray : false
                },
                get : {
                    method : 'GET',
                    url :  '/name/:id',
                    params: {},
                    isArray : false
                },
                save : {
                    method : 'PUT',
                    url :  '/name/:id',
                    params: {},
                    isArray : false
                },
                remove : {
                    method : 'DELETE',
                    url :  '/name/:id',
                    params: {},
                    isArray : false
                }
            });



        function addName(payload){
            logger.info('Name creation in progress!');
            return nameResource.addnew(payload)
                .$promise
                .then(addNameComplete)
                .catch(addNameFailed);

            function addNameComplete(response) {
                logger.debug('Name submitted successfully!', response);
                return response;
            }

            function addNameFailed(error) {
                logger.error('Name could not be submitted successfully!', error, error.status);
            }
        }

        function saveName(id, payload){
            return nameResource.save({'id': id}, payload)
                .$promise
                .then(saveNameComplete)
                .catch(saveNameFailed);

            function saveNameComplete(response) {
                logger.debug('Name saved successfully!', response);
                return response;
            }

            function saveNameFailed(error) {
                logger.error('Name could not be saved successfully!', error.data, error.status);
            }
        }


        return {
          getNames: getNames,
          getName:getName,
          addName: addName,
          saveName: saveName
        };



    }


})();
