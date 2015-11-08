(function () {
    var pictureFactory = function ($http) {
        var factory = {};

        factory.get = function get() {
            ////$http.get('http://thecatapi.com/api/images/get?', {
            ////        'format': 'xml',
            ////        'results_per_page': '1',
            ////        'type': 'jpg',
            ////        'size': 'small'
            ////    })
            //debugger;
            //$http.get('http://thecatapi.com/api/images/get?format=xml&results_per_page=1&type=jpg&size=small')
            //    .then(function onSuccess(response) {
            //        debugger;
            //        return response.data.response.data.images.image.url;
            //    },function errorCallback(response) {
            //        debugger
            //    });
        };

        return factory;
    };
debugger;

    pictureFactory.$inject = ['$http'];

    angular.module('catsApp').factory('pictureFactory',
        pictureFactory);

}());