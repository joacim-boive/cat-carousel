(function(){
    var app = angular.module('catsApp', ['ngRoute','xml']);

    app.config(function ($httpProvider, $routeProvider) {
        $httpProvider.interceptors.push('xmlHttpInterceptor');

        $routeProvider
            .when('/', {
                controller: 'ListController',
                templateUrl: 'app/views/list.html'
            })
            .otherwise({ redirectTo: '/' });

    });
}());