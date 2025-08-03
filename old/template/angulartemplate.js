(function(){
	
 
  var app = angular.module('productCategoryModule', []);
  app.controller('ProductCategoryController',function($scope, $http) {
	     
	    
	    /*$http.get("/model/ProductCategory/list")
	    .then(function (response) {
	    	$scope.productCategoryList = response.data;
	    
	    });*/
	  
	  $scope.productCategoryList = [{code: "code1", name:"name1",description:"description1"},{code:"code2",name:"name2",description:"description2"}];
  });
})();

