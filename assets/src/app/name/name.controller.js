/**
 * Created by sbhask1 on 5/25/15.
 */

(function() {

  'use strict';
  angular
    .module('babyn')
    .controller('Name', Name);

  Name.$inject = ['$scope', '$state', 'dataservice', '$location', 'logger'];
  function Name($scope, $state, dataservice, $location, logger) {
    var vm = $scope;
    vm.name = {};
    vm.submit = submit;
    vm.cancel = cancel;
    vm.action = $state.current.data.action;

    activate();
    function activate(){
      if(vm.action === 'add'){
        vm.name.sx= 'g';
      }
    }

    function submit(){
      if (vm.nameForm.$valid) {
        if(vm.action==='add'){
          dataservice.addName(vm.name).then(function(data){
            logger.info('Name saved successfully!!');
            $location.path('/');
          });
        }
      } else {
        logger.warning('Validation error(s). Please check field values.');
      }
    }

    function cancel(){
      $location.path('/');
    }
  }

})();
