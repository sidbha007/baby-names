/**
 * Created by sbhask1 on 5/25/15.
 */

(function() {

  'use strict';
  angular
    .module('babyn')
    .controller('Home', Home);

  Home.$inject = ['$scope', 'dataservice','$document', 'logger', '$timeout'];
  function Home($scope, dataservice, $document, logger, $timeout){
    var vm= $scope;
    vm.loadNames    = loadNames;
    vm.selectedLtr  = 'A';
    vm.gender       = 'g';
    vm.setLetter    = setLetter;
    vm.pageChange   = pageChange;
    vm.pgntn = {
          currPage: 1
      };
    vm.names        = [ ];
    vm.letters        = [ ];
    vm.loading        = false;
    vm.addToFavs    = addToFavs;
    activate();

    function activate(){
      for (var i = 65; i <= 90; i++) {
        vm.letters.push({ltr:String.fromCharCode(i)});
      }
      loadNames(getCrit());
    }

    function addToFavs(nm, add){
      dataservice.saveName(nm.id, {fv:add}).then(function(nameRec){
        logger.info( nm.nm +
        (add?' saved as a favorite!!': ' removed from favorite!!'));
        nm.fv=add;
      });
    }

    function pageChange(){
      var lastEc = angular.element($document[0].querySelector("#content"));
      lastEc[0].scrollTop = 0;
    }


    function loadNames(crit){
      vm.loading = true;
      dataservice.getNames(crit || getCrit())
        .then(function (data) {
          vm.names = data;
          vm.loading = false;
          $timeout(function() {
            vm.pgntn.currPage = 1;
          }, 0);
        });

    }

    function getCrit(){
      var whereCond = {
        where: {
        },
        sort: 'nm'
      };
      if(vm.gender === 'favs'){
        whereCond.where.fv = true;
      }else{
        whereCond.where.nm = {'startsWith':vm.selectedLtr};
        if(vm.gender){
          whereCond.where.sx = vm.gender;
        }
      }
      return whereCond;
    }

    function setLetter(ltr){
      vm.selectedLtr = ltr;
      loadNames(getCrit());
    }

  }
})();

