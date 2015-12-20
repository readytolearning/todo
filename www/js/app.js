// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})


.config(function($stateProvider, $urlRouterProvider) {



    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/searchShop.html',
                controller: 'serchShopCtrl'
            }
        }
    })

    .state('app.createItems', {
        url: '/createItems',
        views: {
            'menuContent': {
                templateUrl: 'templates/createItems.html',
                controller: 'createItemsCtrl'
            }
        }
    })


    .state('app.browse', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/browse.html'
                }
            }
        })
        .state('app.modals', {
            url: '/modals/:modelFor',
            views: {
                'menuContent': {
                    templateUrl: 'templates/allModals.html',
                    controller: 'allModalsCtrl'
                }
            }
        })

    .state('app.mainPage', {
        url: '/mainPage',
        views: {
            'menuContent': {
                templateUrl: 'templates/mainPage.html',
                controller: 'allModalsCtrl'
            }
        }
    })


    .state('app.favourites', {
        url: '/favourites',
        views: {
            'menuContent': {
                templateUrl: 'templates/favourites.html',
                controller: 'favourtesCtrl'
            }
        }
    })

    .state('app.shopOwner', {
        url: '/shopOwner',
        views: {
            'menuContent': {
                templateUrl: 'templates/shopOwner.html',
                controller: 'shopOwnerCtrl'
            }
        }
    })

    .state('app.visitedItems', {
        url: '/visitedItems/:shopId/:numberOfResults',
        views: {
            'menuContent': {
                templateUrl: 'templates/top5Visited.html',
                controller: 'visitedItemsCtrl'
            }
        }
    })
    .state('app.favouritedItems', {
        url: '/favouritedItems/:shopId/:numberOfResults',
        views: {
            'menuContent': {
                templateUrl: 'templates/top5Favourited.html',
                controller: 'favouritedItemsListCtrl'
            }
        }
    })

    .state('app.shopInfo', {
        url: '/shopInfo/:shopId',
        views: {
            'menuContent': {
                templateUrl: 'templates/shopInfo.html',
                controller: 'shopInfoCtrl'
            }
        }
    })

    .state('app.itemsUnderModelAndShop', {
        url: '/itemsUnderModelAndShop/:shopId/:modelFor/:modelName',
        views: {
            'menuContent': {
                templateUrl: 'templates/perticularModal.html',
                controller: 'itemsUnderModelAndShopCtrl'
            }
        }
    })

    .state('app.showItem', {
        url: '/showItem/:itemId',
        views: {
            'menuContent': {
                templateUrl: 'templates/showItem.html',
                controller: 'showItemCtrl'
            }
        }
    })

    .state('app.perticularModal', {
        url: '/perticularModal/:perticularModalId',
        views: {
            'menuContent': {
                templateUrl: 'templates/perticularModal.html',
                controller: 'perticularModalCtrl'
            }
        }
    });


    // if none of the above states are matched, use this as the fallback
    //  $urlRouterProvider.otherwise('/app/playlists');
    $urlRouterProvider.otherwise('/app/mainPage');

});
