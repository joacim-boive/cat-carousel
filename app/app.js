(function(){
    var app = angular.module('app', ['ngRoute','xml']);

    app.config(function ($httpProvider, $routeProvider) {
        $httpProvider.interceptors.push('xmlHttpInterceptor');

        $routeProvider
            .when('/', {
                controller: 'CatController',
                templateUrl: 'app/views/list.html'
                //controller: 'JiraController',
                //templateUrl: 'app/views/list.html'
            })
            .otherwise({ redirectTo: '/' });

    });
}());