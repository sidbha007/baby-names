/**
 * Created by sbhask1 on 5/25/15.
 */

(function() {

  'use strict';
  angular
    .module('babyn')
    .controller('App', App);

  App.$inject = ['$scope', '$mdSidenav', '$mdBottomSheet', '$q', '$state'];
  function App($scope, $mdSidenav, $mdBottomSheet, $q, $state){
    var vm = $scope;
    vm.selectPg = selectPg;
    vm.toggleList   = toggleUsersList;
    vm.isSelected   = isSelected;

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectPg ( nm ) {
      vm.toggleList();
    }

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    function isSelected(nm){
      return $state.current.name===nm;
    }
  }
})();
