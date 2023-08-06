/**
 * Created by xueqing on 2015/10/19.
 */
/**
 * Created by xueqing on 2015/8/16.
 */
usercenter= angular.module('usercenter',["ngRoute","ngResource"]);

usercenter.controller('login_form',function($scope,$http,$window){
        $scope.login = function(){
            url='/rest-auth/login/';
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';
            $http({
                method:'POST',
                url:url,
                data:$scope.loginuser,
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(data){
                $window.sessionStorage.token = data.key;
                window.location="/";
            }).error(function(data){
                $scope.loginErrorMessage = data;
            });
        }
});

usercenter.controller('register_form',function($scope,$http){
        $scope.registerErrorMessage='';
        $scope.register = function(){
            url='/rest-auth/registration/';
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';
            $http({
                method:'POST',
                url:url,
                data:$scope.registeruser,
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(d){
                window.location="/usercenter/login";
            }).error(function(data){
                $scope.registerErrorMessage = data;
            });
        }
});

usercenter.controller('changepwd_form',function($scope,$http){
        $scope.changepwdErrorMessage='';
        $scope.changepwd = function(){
            url='/rest-auth/password/change/';
            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';
            $http({
                method:'POST',
                url:url,
                data:$scope.newpwd,
                headers:{'Content-Type': 'application/json;charset=UTF-8'}
            }).success(function(d){
                window.location="/usercenter/index";
            }).error(function(data){
                $scope.changepwdErrorMessage = data;
            });
        }
});
