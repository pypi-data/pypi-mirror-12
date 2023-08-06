/**
 * Created by xueqing on 2015/10/31.
 */
company=angular.module('company' , ["ui.bootstrap","ngRoute","ngResource"]);

company.config(function($routeProvider){
    $routeProvider.when('/company_list',{templateUrl:"/company/company_list_template/",activetab:'company_list'});
});

company.controller('listgroupCtrl', function ($scope,$route) {
    $scope.$route = $route;
});


