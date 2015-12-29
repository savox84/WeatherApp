// MODULE

var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES

weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
});

// SERVICES

weatherApp.service('cityService', function(){
   
    this.cityName = 'Athens,GR';
    
});

// DIRECTIVES

weatherApp.directive('weatherReport', function(){
   
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherReport.htm',
        replace: true
//        scope: {
//            weatherDay: '=',
//            convertToStandard: '&',
//            convertToDate: '&',
//            dateFormat: '@'
//        }
    }
    
});

// CONTROLLERS

weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
 
    $scope.cityName = cityService.cityName;
    
    $scope.$watch('cityName', function(){
        cityService.cityName = $scope.cityName;                                         
    });
    
    $scope.submit = function(){
        $location.path("/forecast");
    };
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$log', '$routeParams', 'cityService', function($scope, $resourse, $log, $routeParams, cityService) {
     
    $scope.cityName = cityService.cityName;
    
    $scope.days = $routeParams.days || '1';                                  
    
    $scope.appID = '2de143494c0b295cca9337e1e96b00e0';
    
    $scope.weatherAPI = 
        
            $resourse("http://api.openweathermap.org/data/2.5/forecast");
        
            $scope.weatherResult = $scope.weatherAPI.get({
                
                q: $scope.cityName,
                cnt: $scope.days,
                appid: $scope.appID
                
            });
            
            $scope.convertToCelcius = function(degK) {
                
                return Math.round(degK - 273.15);
                
            }
            
            $scope.fixDate = function(str){
                
                return str * 1000;
            }

}]);