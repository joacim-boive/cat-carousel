(function () {
    var animate = function ($rootScope, $timeout) {
        var INTERVAL = 5000;

        var animationend = null;
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                $element.addClass('animated');

                $element.on('load', function () {
                    var previous = document.querySelector('.show');
                    previous = angular.element(previous);

                    function show() {
                        $element.removeClass('bounceIn');
                        $element.addClass('show');
                        $element.off('animationend', show);
                    }

                    function hide() {
                        previous.removeClass('show');
                        previous.removeClass('fadeOut');
                        previous.off('animationend', hide);

                        $element.addClass('bounceIn');

                        $element.on('animationend', function () {
                            if ($rootScope.getNewImage !== true) {
                                $timeout(function () {
                                    $rootScope.getNewImage = true;
                                }, INTERVAL);
                            }

                            $element.off('animationend');
                        })
                    }

                    function getNew() {
                        if ($rootScope.getNewImage !== true) {
                            $timeout(function () {
                                $rootScope.getNewImage = true;
                            }, INTERVAL);
                        }

                        $element.off('animationend', getNew);
                    }

                    $element.on('animationend', show);

                    if (previous.length >0) {
                        previous.addClass('fadeOut');
                        previous.on('animationend', hide);

                    } else {
                        $element.addClass('bounceIn');
                        $element.on('animationend', getNew)
                    }

                });
            }
        }
    };

    animate.$inject = ['$rootScope', '$timeout'];

    angular.module('catsApp')
        .directive('animate', animate);
}());