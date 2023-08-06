/**
 * Created by xueqing on 2015/10/22.
 */
lunchapp=angular.module('lunchapp' , ["ui.bootstrap","ngRoute","ngResource"]);

lunchapp.config(function($routeProvider){
    $routeProvider.when('/aaaa',{templateUrl:"/lunch/aaaa/",activetab:'aaaa'});
    $routeProvider.when('/product_category_add_template',{templateUrl:"/lunch/product_category_add_template/",activetab:'product_category_list'});
    $routeProvider.when('/product_category_list',{templateUrl:"/lunch/product_category_list_template/",activetab:'product_category_list'});
    $routeProvider.when('/product_category_detail/:category_id/',{templateUrl:"/lunch/product_category_detail_template/",activetab:'product_category_list'});
    $routeProvider.when('/product_list',{templateUrl:"/lunch/product_list_template/",activetab:'product_list'});
    $routeProvider.when('/product_detail/:product_id',{templateUrl:"/lunch/product_detail_template/",activetab:'product_list'});
    $routeProvider.when('/order_add',{templateUrl:"/lunch/order_add_template/",activetab:'order_add'});
    $routeProvider.when('/account_charge',{templateUrl:"/lunch/account_charge_template/",activetab:'account_charge'});
    $routeProvider.when('/my_orders',{templateUrl:"/lunch/my_orders_template/",activetab:'my_orders'});
    $routeProvider.when('/order_line_operation',{templateUrl:"/lunch/order_line_operation_template/",activetab:'order_line_operation'});
    $routeProvider.when('/all_orders',{templateUrl:"/lunch/all_orders_template/",activetab:'all_orders'});
    $routeProvider.when('/all_cashmoves',{templateUrl:"/lunch/all_cashmove_template/",activetab:'all_cashmoves'});
    $routeProvider.when('/my_cashmoves',{templateUrl:"/lunch/my_cashmove_template/",activetab:'my_cashmoves'});
});

lunchapp.controller('listgroup', function ($scope,$route) {
    $scope.$route = $route;
});

lunchapp.controller('AddProductCategoryModalCtrl', function ($scope, $uibModal, $log) {
  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      //templateUrl: 'myModalContent.html',
      templateUrl:'/lunch/product_category_add_template/',
      controller: 'CategoryAddCtrl',
      size: size,
      resolve:{
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

lunchapp.controller('CategoryAddCtrl', function ($scope,$http,$rootScope,$modalInstance) {
  $scope.product_category_add=function(){
            url='/lunch/product_category_add/';
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';
            $http({
                method:'POST',
                url:url,
                data:$rootScope.category,
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(){
                $http({
                    method:'GET',
                    url:'/lunch/product_category_list/',
                    headers:{'Content-Type': 'application/json;charset=UTF-8'}
                        }).success(function(data){
                    $rootScope.categories=data;
                }).success(function(){
                    $modalInstance.close();
                });
            })
  };
  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

lunchapp.controller('CategoryListCtrl',function($scope,$http,$rootScope){
    $http({
        method:'GET',
        url:'/lunch/product_category_list/',
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(data){
        $rootScope.categories=data;
    })
});

lunchapp.controller('CategoryDetailCtrl',function($scope,$http,$route){
    console.log($route.current.params.category_id);
    $http({
        method:'GET',
        url:'/lunch/product_category_detail/'+$route.current.params.category_id+'/',
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
    }).success(function(data){
        $scope.category_detail=data;
    });

    $scope.update_category_detail=function(){
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';
            $http({
                method:'POST',
                url:'/lunch/product_category_detail/'+$route.current.params.category_id+'/',
                data:$scope.category_detail,
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(){
                window.location="/lunch/#/product_category_list";
            })
    };

    $scope.category_delete = function(){
        $http({
                method:'get',
                url:'/lunch/product_category_delete/'+$route.current.params.category_id+'/',
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(){
                window.location="/lunch/#/product_category_list";
            })
    }
});


lunchapp.controller('AddProductModalCtrl', function ($scope, $uibModal, $log) {
  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      //templateUrl: 'myModalContent.html',
      templateUrl:'/lunch/product_add_template/',
      controller: 'ProductAddCtrl',
      size: size,
      resolve:{
      }
    });



    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

lunchapp.controller('ProductAddCtrl', function ($scope,$http,$rootScope,$modalInstance) {

   $http({
        method:'GET',
        url:'/lunch/product_category_list/',
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(data){
        $rootScope.categories=data;
    });

  $scope.product_add=function(){
            console.log($rootScope.product);
            url='/lunch/product_add/';
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';
            $http({
                method:'POST',
                url:url,
                data:$rootScope.product,
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(){
                $http({
                    method:'GET',
                    url:'/lunch/product_list/',
                    headers:{'Content-Type': 'application/json;charset=UTF-8'}
                        }).success(function(data){
                    $rootScope.products=data;
                }).success(function(){
                    $modalInstance.close();
                });
            })
  };
  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});


lunchapp.controller('ProductListCtrl',function($scope,$http,$rootScope){
    $http({
        method:'GET',
        url:'/lunch/product_list/',
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(data){
        $rootScope.products=data;
    })
});


lunchapp.controller('ProductDetailCtrl',function($scope,$http,$route){

    $http({
        method:'GET',
        url:'/lunch/product_detail/'+$route.current.params.product_id+'/',
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
    }).success(function(data){
        $scope.product_detail=data;

    });


   $http({
        method:'GET',
        url:'/lunch/product_category_list/',
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(data){
        $scope.categories=data;
    });



    $scope.update_product_detail=function(){
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';
            $http({
                method:'POST',
                url:'/lunch/product_detail/'+$route.current.params.product_id+'/',
                data:$scope.product_detail,
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(){
                window.location="/lunch/#/product_list";
            })
    };

    $scope.product_delete = function(){
        $http({
                method:'get',
                url:'/lunch/product_delete/'+$route.current.params.product_id+'/',
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(){
                window.location="/lunch/#/product_list";
            })
    }
});

//order_add starts
lunchapp.controller('OrderAddCtrl',function($http,$scope,$route) {
    $scope.boughtList = [];
    $http({
        method: 'GET',
        url: '/lunch/product_list/',
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }).success(function (data) {
        $scope.products = data;
    });

    $scope.buy = function (index) {
        $scope.products[index].qty = 1;
        $scope.boughtList.push($scope.products[index]);
        $scope.products.splice(index, 1);
    };

    $scope.total = function () {
        var total = 0;
        for (var i in $scope.boughtList) {
            if ($scope.boughtList[i]) {
                if ($scope.boughtList[i].qty <= 0) {
                    delete $scope.boughtList[i].qty;
                    $scope.products.push($scope.boughtList[i]);
                    $scope.boughtList.splice(i, 1);
                    return total
                }
                else {
                    total += $scope.boughtList[i].price * $scope.boughtList[i].qty
                }
            }
        }
        return total
    };

    $scope.confirm_buy=function(){
            console.log($scope.boughtList)
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';
            $http({
                method:'POST',
                url:'/lunch/order_add/',
                data:$scope.boughtList,
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(){
                window.location="/lunch/#/my_orders";
            })
    }
});
//order_add ends

//my orders starts
lunchapp.controller('my_orders',function($scope,$http){
    $http({
        method: 'GET',
        url: '/lunch/orders_get/',
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }).success(function (data) {
        $scope.orders = data;
    });

    $scope.cancel_order_line =function(order_index,order_line_index){
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
    $http({
                method:'POST',
                url:'/lunch/order_line_cancel/',
                data:$scope.orders[order_index].order_set[order_line_index],
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
    }).success(function(data){
        $scope.orders[order_index].order_set[order_line_index]=data;
    })
    }

});

//my orders ends

//order_operates_starts
lunchapp.controller('order_lines_operation',function($scope,$http){
    $http({
        method: 'GET',
        url: '/lunch/orderlines_get/',
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }).success(function (data) {
        $scope.orderlines = data;
    });

    $scope.order_line_confirm=function(index){
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
        $http({
                method:'POST',
                url:'/lunch/order_line_operate/',
                data:$scope.orderlines[index],
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function(data){
            $scope.orderlines[index]=data;
        })
    }
});


lunchapp.controller('all_orderlines',function($scope,$http){
    $http({
        method: 'GET',
        url: '/lunch/all_orderlines_get/',
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    }).success(function (data) {
        $scope.orderlines = data;
        console.log(data)
    });
});

lunchapp.controller('chargeCtrl',function($scope,$http){
    $scope.create_cashmove=function(){
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';
            $http({
                method: 'POST',
                url: '/lunch/create_cashmove/',
                data:$scope.cashmove,
                headers: {'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function (data) {
               window.location="/lunch/#/all_cashmoves";
            });


    }
});


lunchapp.controller('allcashCtrl',function($scope,$http){
        $http({
            method: 'GET',
            url: '/lunch/all_cashmove/',
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.cashmoves = data;
            console.log(data)
        });

});


lunchapp.controller('allcashCtrl',function($scope,$http){
        $http({
            method: 'GET',
            url: '/lunch/all_cashmove/',
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.cashmoves = data;
            console.log(data)
        });
});

lunchapp.controller('mycashCtrl',function($scope,$http){
        $http({
            method: 'GET',
            url: '/lunch/my_cashmove/',
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).success(function (data) {
            $scope.cashmoves = data;
            console.log(data)
        });
});