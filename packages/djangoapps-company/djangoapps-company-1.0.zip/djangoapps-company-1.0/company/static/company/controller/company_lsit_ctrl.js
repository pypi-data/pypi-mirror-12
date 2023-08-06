/**
 * Created by xueqing on 2015/11/2.
 */

company.controller('companyCtrl', function ($scope,$rootScope,$uibModal,CompanyList,CompanyDetail) {
  CompanyList.getCompanyList().success(function(data){
    $scope.companies = data
  });
  $scope.animationsEnabled = true;
  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl:'/company/company_edit_template/',
      controller: 'companyEditCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };
  $scope.changeModal = function(size,index){
    //取出数据
    CompanyDetail.getCompanyDetail($scope.companies[index].id).success(function(data){
      $rootScope.company=data;
    });

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl:'/company/company_change_template/',
      controller: 'companyChangeCtrl',
      size: size,
      resolve: {
        company: function () {
          return $scope.companies;
        }
      }
    });
  }
});

company.controller('companyEditCtrl', function ($http,$scope, $modalInstance,CompanyList) {

  $scope.addcompany = function(){
    CompanyList.createCompany().success(function(){
          $scope.cancel();
          window.location='/company/#/company_list/'
    });
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});


company.controller('companyChangeCtrl',function($http,$scope,$rootScope,$modalInstance,CompanyDetail){

  $scope.updateCompanyDetail =function(){
      CompanyDetail.updateCompanyDetail($rootScope.company.id).success(function(){
        $scope.cancel();
        window.location='/company/#/company_list/';
      })
    };

    $scope.deleteCompanyDetail =function(){
      CompanyDetail.deleteCompanyDetail($rootScope.company.id).success(function(){
        $scope.cancel();
        window.location='/company/#/company_list/';
      })
    };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});