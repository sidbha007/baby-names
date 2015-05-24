(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', 'dataservice','$document',
          UserController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav, $mdBottomSheet, $log, $q, dataservice, $document) {
    var self = this;

    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;
    self.share        = share;
    self.loadNames    = loadNames;
    self.selectedLtr  = 'A';
    self.gender       = 'g';
    self.setLetter    = setLetter;
    self.pageChange   = pageChange;

    self.names        = [ ];
    self.letters        = [ ];
    // Load all registered users

    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[0];
          });

    loadNames(getCrit());


    for (var i = 65; i <= 90; i++) {
      self.letters.push({ltr:String.fromCharCode(i)});
      //$(select).append('<option>' + string.fromCharCode(i) + '</option>');
    }


    function pageChange(){
      var lastEc = angular.element($document[0].querySelector("#content"));
      lastEc[0].scrollTop = 0;
    }


    function loadNames(crit){
      dataservice.getNames(crit || getCrit())
        .then(function (data) {
          self.names = data;
          self.currentPage = 1;
        });

    }

    function getCrit(){
      var whereCond = {
        where: {
        nm:{'startsWith':self.selectedLtr}
      },
        sort: 'nm'
      };

      if(self.gender){
        whereCond.where.sx = self.gender;
      }
      return whereCond;
    }

    function setLetter(ltr){
      self.selectedLtr = ltr;
      loadNames(getCrit());
    }


    // *********************************
    // Internal methods
    // *********************************

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

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
      self.toggleList();
    }

    /**
     * Show the bottom sheet
     */
    function share($event) {
        var user = self.selected;

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: '/src/users/view/contactSheet.html',
          controller: [ '$mdBottomSheet', UserSheetController],
          controllerAs: "vm",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function UserSheetController( $mdBottomSheet ) {
          this.user = user;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
