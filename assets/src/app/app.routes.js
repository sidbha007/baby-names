/**
 * Created by sbhask1 on 5/25/15.
 */

(function() {
  'use strict';

  angular
    .module('babyn')
    .config(routesConfig);

  routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function routesConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'src/app/home/home.html',
        controller: 'Home'
      })
      .state('addname', {
        url: '/name/new',
        templateUrl: 'src/app/name/name.html',
        controller: 'Name',
        data: {
          requiredLogin: true,
          action: 'add'
        }
      })
  }


})();
