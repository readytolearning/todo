angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $rootScope) {

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


    var itemIds = JSON.parse(window.localStorage['itemIdsBox'] || '{}');
    $rootScope.favCount = itemIds.length;
    if($rootScope.favCount == ''){
      $rootScope.favCount = 0;
    }


    $scope.showFavourites = function(){
      var itemIds = JSON.parse(window.localStorage['itemIdsBox'] || '{}');
      var items = JSON.stringify(itemIds);
      console.log(items);
    /*  $http.post('http://localhost:8081/getIteamsByIds/' + items).success(function(data) {
      //console.log(data);
      angular.forEach(data, function(eachItemObj, key) {
        eachItemObj.favourite = true;
      });

      $http.post('http://localhost:8081/getIteamsByIds' + items).success(function(data) {
      //console.log(data);
      angular.forEach(data, function(eachItemObj, key) {
        eachItemObj.favourite = true;
      });*/

  $http({
    url: "http://localhost:8081/getIteamsByIds",
    dataType: "json",
    method: "POST",
    data : 'val1=value1&items='+items,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
}).success(function(response){
  //  $scope.response = response;
    $scope.favouriteList = [];
    $scope.favouriteList = response;
}).error(function(error){
    $scope.error = error;
});


}

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
        $scope.modelFor = $stateParams.modelFor;
        $scope.allModals = data;
    });
})
.controller('shopOwnerCtrl', function($scope, $http, $stateParams) {

})


.controller('shopInfoCtrl', function($scope, $http, $stateParams) {
  $http.get('http://localhost:8081/shopInfo/' + $stateParams.shopId).success(function(data) {
      console.log(data);
      $scope.shopObj = data[0];
      var changeModel = function(obj){
        console.log(obj)
      }
  });

})

.controller('visitedItemsCtrl', function($scope, $http, $stateParams) {
  $http.get('http://localhost:8081/visitedItems/' + $stateParams.shopId+'/'+$stateParams.numberOfResults).success(function(data) {
      console.log(data);
      $scope.items = data;
  });

})


.controller('favouritedItemsListCtrl', function($scope, $http, $stateParams) {
  $http.get('http://localhost:8081/favouritedItemsListCtrl/' + $stateParams.shopId+'/'+$stateParams.numberOfResults).success(function(data) {
      console.log(data);
      $scope.items = data;
  });

})

.controller('showItemCtrl', function($scope, $http, $stateParams) {
    $http.get('http://localhost:8081/showItem/' + $stateParams.itemId).success(function(data) {
        console.log(data);
        $scope.item = data;
    });
})

.controller('itemsUnderModelAndShopCtrl', function($scope, $http, $stateParams) {
    $http.get('http://localhost:8081/itemsUnderModelAndShop/' + $stateParams.shopId +"/" +$stateParams.modelFor+"/"+$stateParams.modelName).success(function(data) {
        console.log(data);
        var tempArray = [];
        $scope.items = [];
        for(var i=0;i<data.length;i++){

          if (i%2 !== 0) {
            tempArray.push(data[i]);
            $scope.items.push(tempArray);
          } else {
            tempArray = []
            tempArray.push(data[i]);
          }

        }
    });
})


.controller('serchShopCtrl', function($scope, $http) {
    var stringEx = '';
    $http.get('http://localhost:8081/listShops').success(function(data) {
        console.log(data);
        $scope.shopDetails = data;
    });
})

.controller('createItemsCtrl', function($scope, $http) {
  $scope.uploadFile = function(files) {

  var data = new FormData();
  console.log(files[0]);
  //data.append('file',  files[0]);
  console.log(data);


  AWS.config.region = ''; // 1. Enter your region
AWS.config.secretAccessKey =  "";
AWS.config.accessKeyId = "";

//var BUCKET_NAME = 'readytolearning';


     var bucketName = 'readytolearning'; // Enter your bucket name
     var bucket = new AWS.S3();


     var params = {
                   Key: "Images11/image1",
                   Bucket: bucketName,
                   ContentType: files[0].type,
                   Body: files[0],
                   ACL: 'public-read'
               };


           bucket.upload(params, function(err, data) {
               if (err) {
                  console.log("error");
               } else {
                    console.log("success");
               }
           });

}

})

.controller('favourtesCtrl', function($scope, $http, $stateParams,$rootScope) {




    $scope.addToFavourites = function(itemId) {
        //window.localStorage['post'] = JSON.stringify(itemIds);
         console.log("Add to favourites");
        //var addToFavourites = false;
        var itemObj;

        angular.forEach($scope.favouriteList, function(eachItemObj, key1) {
            if (eachItemObj._id == itemId) {
                eachItemObj.favourite = !eachItemObj.favourite;
                itemObj = eachItemObj;
                $scope.favouriteList.splice(key1, 1);
            }
        });

        if( $rootScope.favCount == ''){
          $rootScope.favCount = 0;
        }

        var itemIds = JSON.parse(window.localStorage['itemIdsBox'] || '{}');
        if (!itemIds.length) {
            console.log("1")
            window.localStorage['itemIdsBox'] = JSON.stringify(new Array(itemId));
            $http.post('http://localhost:8081/makeFavourite/'+itemId).success(function(data) {
            });
            $rootScope.favCount = $rootScope.favCount+1;
        } else if (itemIds.indexOf(itemId) == -1) {
            console.log("2")
            itemIds.push(itemId);
            $rootScope.favCount = $rootScope.favCount+1;
            $http.post('http://localhost:8081/makeFavourite/'+itemId).success(function(data) {
            });
            window.localStorage['itemIdsBox'] = JSON.stringify(itemIds);
            window.localStorage[itemId] = JSON.stringify(itemObj);
        } else {
          console.log("----")
            itemIds.splice(itemIds.indexOf(itemId), 1);
            $rootScope.favCount = $rootScope.favCount-1;
            window.localStorage['itemIdsBox'] = JSON.stringify(itemIds);
            window.localStorage[itemId] = '';
        }
    }

    console.log($scope.favouriteList);


})


.controller('perticularModalCtrl', function($scope, $stateParams, $http, $rootScope) {

    var itemIds = JSON.parse(window.localStorage['itemIdsBox'] || '{}');

    $http.get('http://localhost:8081/itemsUnderModel/' + $stateParams.modelFor + '/'+$stateParams.perticularModalName)
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

          var tempArray = [];
          $scope.items = [];
          for(var i=0;i<data.length;i++){

            if (i%2 !== 0) {
              tempArray.push(data[i]);
              $scope.items.push(tempArray);
            } else {
              tempArray = []
              tempArray.push(data[i]);
            }

          }
          console.log($scope.items);
          //  $scope.items = data;
        });


    $scope.addToFavourites = function(itemId) {
        //window.localStorage['post'] = JSON.stringify(itemIds);

        var addToFavourites = false;
        var itemObj;
        angular.forEach($scope.items, function(eachItemObj1, key2) {
          angular.forEach(eachItemObj1, function(eachItemObj, key1) {
            if (eachItemObj._id == itemId) {
                eachItemObj.favourite = !eachItemObj.favourite;
                itemObj = eachItemObj;
            }
          });
        });

        if( $rootScope.favCount == ''){
          $rootScope.favCount = 0;
        }

        var itemIds = JSON.parse(window.localStorage['itemIdsBox'] || '{}');
        if (!itemIds.length) {
            window.localStorage['itemIdsBox'] = JSON.stringify(new Array(itemId));
            $http.post('http://localhost:8081/makeFavourite/'+itemId).success(function(data) {
            });
            $rootScope.favCount = $rootScope.favCount+1;
        } else if (itemIds.indexOf(itemId) == -1) {
            itemIds.push(itemId);
            $rootScope.favCount = $rootScope.favCount+1;
            $http.post('http://localhost:8081/makeFavourite/'+itemId).success(function(data) {
            });
            window.localStorage['itemIdsBox'] = JSON.stringify(itemIds);
            window.localStorage[itemId] = JSON.stringify(itemObj);
        } else {
            itemIds.splice(itemIds.indexOf(itemId), 1);
            $rootScope.favCount = $rootScope.favCount-1;
            window.localStorage['itemIdsBox'] = JSON.stringify(itemIds);
            window.localStorage[itemId] = '';
        }
    }

});
