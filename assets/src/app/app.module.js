/**
 * Created by sbhask1 on 5/25/15.
 */

(function() {
  'use strict';

  angular
    .module('babyn', [
      'babyn.services'
    ]);

  angular
    .module('babyn')
    .config(mdThemeConfig)
    .config(paginationTemplate);


  mdThemeConfig.$inject = ['$mdThemingProvider', '$mdIconProvider'];
  function mdThemeConfig($mdThemingProvider, $mdIconProvider){
    $mdIconProvider
      .defaultIconSet("./svg/avatars.svg", 128)
      .icon("menu"       , "./svg/menu.svg"        , 24)
      .icon("share"      , "./svg/share.svg"       , 24)
      .icon("google_plus", "./svg/google_plus.svg" , 512)
      .icon("hangouts"   , "./svg/hangouts.svg"    , 512)
      .icon("twitter"    , "./svg/twitter.svg"     , 512)
      .icon("phone"      , "./svg/phone.svg"       , 512);

    $mdThemingProvider.theme('default')
      .primaryPalette('deep-orange')
      .accentPalette('amber');
  }

  paginationTemplate.$inject = ['paginationTemplateProvider'];
  function paginationTemplate(paginationTemplateProvider){
    paginationTemplateProvider.setPath('./bower_components/angular-utils-pagination/dirPagination.tpl.html');
  }



})();
