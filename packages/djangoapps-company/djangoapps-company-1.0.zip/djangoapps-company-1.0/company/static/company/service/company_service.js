/**
 * Created by xueqing on 2015/11/2.
 */

company.factory('CompanyList',['$http','$rootScope',function($http,$rootScope){
  return {
    getCompanyList:function(){
      return $http({
        method:'GET',
        url:'/company/company_list/',
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
      })
    },

    createCompany:function(){
      $http.defaults.xsrfHeaderName = 'X-CSRFToken';
      $http.defaults.xsrfCookieName = 'csrftoken';
      return $http({
        method:'POST',
        url:'/company/company_list/',
        data:$rootScope.company,
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
      })
  }
  }
}]);

company.factory('CompanyDetail',['$http','$rootScope',function($http,$rootScope){

  return {
    getCompanyDetail:function(company_id){
      return $http({
        method:'GET',
        url:'/company/company_detail/'+company_id+'/',
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
      })
    },

    updateCompanyDetail:function(company_id){
      $http.defaults.xsrfHeaderName = 'X-CSRFToken';
      $http.defaults.xsrfCookieName = 'csrftoken';
      return $http({
        method:'PUT',
        url:'/company/company_detail/'+company_id+'/',
        data:$rootScope.company,
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
      })
    },

    deleteCompanyDetail:function(company_id){
       return $http({
        method:'DELETE',
        url:'/company/company_detail/'+company_id+'/',
        data:$rootScope.company,
        headers:{'Content-Type': 'application/json;charset=UTF-8'}
      })
    }
  }
}]);