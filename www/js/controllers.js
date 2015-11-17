angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('allModalsCtrl', function($scope, $http, $stateParams) {
    $http.get('http://localhost:8081/listUsers/' + $stateParams.modelFor).success(function(data) {
        console.log(data);
        $scope.allModals = data;
    });
})


.controller('showItemCtrl', function($scope, $http, $stateParams) {
    $http.get('http://localhost:8081/showItem/' + $stateParams.itemId).success(function(data) {
        console.log(data);
        $scope.item = data;
    });
})


.controller('serchShopCtrl', function($scope, $http) {
    var stringEx = '';
    $http.get('http://localhost:8081/listUsers').success(function(data) {
        console.log(data);
    });
    $scope.shopDetails = [{
        'ShopName': 'Sri Sai Dress Materials(Shop-No : 101)',
        'ShopNo': "Shop No : 101",
        'proieratorName': 'Satyam S',
        'srcPath': 'https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg'
    }, {
        'ShopName': 'Divya Dress Styles',
        'ShopNo': "Shop No : 111",
        'proieratorName': 'Srinivas P',
        'srcPath': 'https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg'
    }, {
        'ShopName': 'Sri Durga Dress Materials',
        'ShopNo': "Shop No : 205",
        'proieratorName': 'Ramayya Ch',
        'srcPath': 'https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg'
    }, {
        'ShopName': 'Sri Durga Textiles',
        'ShopNo': "Shop No : 201",
        'proieratorName': 'Jagadishwar Setty',
        'srcPath': 'https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg'
    }];
})

.controller('favourtesCtrl', function($scope, $http, $stateParams) {
    var itemIds = JSON.parse(window.localStorage['itemIdsBox'] || '{}');
    var items = JSON.stringify(itemIds);
    var v ={"name":"foo","color":"red"};
    $http.post('http://localhost:8081/getIteamsByIds/' + items).success(function(data) {
        console.log(data);
        $scope.favouriteList = data;
    });

    console.log($scope.favouriteList);


})


.controller('perticularModalCtrl', function($scope, $stateParams, $http) {

    var itemIds = JSON.parse(window.localStorage['itemIdsBox'] || '{}');

    $http.get('http://localhost:8081/itemsUnderModel/' + $stateParams.perticularModalId)
        .success(function(data) {
            angular.forEach(data, function(value, key) {
                //value.favourite = false;
                if (!itemIds.length) {
                    value.favourite = false;
                } else {
                    angular.forEach(itemIds, function(value1, key1) {
                        if (value._id == value1) {
                            value.favourite = true;
                        }
                    });
                }
            });
            $scope.items = data;
        });


    $scope.addToFavourites = function(itemId) {
        //window.localStorage['post'] = JSON.stringify(itemIds);

        var addToFavourites = false;
        var itemObj;
        angular.forEach($scope.items, function(eachItemObj, key1) {
            if (eachItemObj._id == itemId) {
                eachItemObj.favourite = !eachItemObj.favourite;
                itemObj = eachItemObj;
            }
        });

        var itemIds = JSON.parse(window.localStorage['itemIdsBox'] || '{}');
        if (!itemIds.length) {
            window.localStorage['itemIdsBox'] = JSON.stringify(new Array(itemId));
        } else if (itemIds.indexOf(itemId) == -1) {
            itemIds.push(itemId);
            window.localStorage['itemIdsBox'] = JSON.stringify(itemIds);
            window.localStorage[itemId] = JSON.stringify(itemObj);
        } else {
            itemIds.splice(itemIds.indexOf(itemId), 1);
            window.localStorage['itemIdsBox'] = JSON.stringify(itemIds);
            window.localStorage[itemId] = '';
        }
    }

});
