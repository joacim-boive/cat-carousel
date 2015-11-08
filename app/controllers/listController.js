(function () {

    var ListController = function ($rootScope, $scope, $http) {
        var counter = 0;
        $scope.picture = {};
        $scope.picture.even = {};
        $scope.picture.odd = {};

        var get = function(){
            if($rootScope.getNewImage){
                $rootScope.getNewImage = false
            }else{
                return;
            }

            $http.get('http://thecatapi.com/api/images/get?format=xml&results_per_page=1&type=jpg&size=small')
                .then(function onSuccess(response) {
                    var url = response.data.response.data.images.image.url;

                    if(counter %2 !== 0){
                        $scope.picture.even.url = url;
                    }else{
                        $scope.picture.odd.url = url;
                    }

                        counter++;
                    },
                    function errorCallback(response) {
                        debugger
                    });
        };

        $rootScope.$watch('getNewImage',get);
        $rootScope.getNewImage = true;
    };

    ListController.$inject = ['$rootScope','$scope', '$http'];

    angular.module('catsApp')
        .controller('ListController', ListController);
}());