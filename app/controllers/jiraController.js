(function () {

    var JiraController = function ($scope, $http) {
        var CUSTOM_FIELD = 'customfield_11301';
        var data = {};
        var labels = [];
        var values = [];

        data.dateToPlot = {};

        function getData(thisData) {
            thisData = thisData.fields[CUSTOM_FIELD];

            if (thisData) {
                return thisData.split('_');
            } else {
                return thisData;
            }
        }

        function setData(thisData) {
            var dateToPlot = null;
            var plotValue = 0;

            if (!thisData) {
                return;
            }

            dateToPlot = new Date(parseInt(thisData[1]));
            plotValue = thisData[1] - thisData[0]; //in ms

            dateToPlot = dateToPlot.toISOString().split('T')[0];

            if (!data.dateToPlot[dateToPlot]) {
                data.dateToPlot[dateToPlot] = [];
            }
            data.dateToPlot[dateToPlot].push(plotValue);
        }

        var get = function () {

            $http.get('http://stage-jira.lenslogistics.int/rest/api/2/search', {
                    type: 'GET',
                    headers: {
                        'Authorization': 'Basic am9hYm9pOiFHc3hyNzU9IV9sZW5zd2F5'
                    },
                    params: {
                        'jql': 'status changed from Open to "In Progress" AFTER "-365d"',
                        'maxResults': '10',
                        'validateQuery': 'true',
                        'fields': 'customfield_11301'
                    }
                })
                .then(function onSuccess(response) {
                        var issues = response.data.issues;
                        var issuesCount = issues.length;
                        var thisAverage = 0;
                        var k = 0;
                        var dateToPlotLength = 0;

                        for (var i = 0; i < issuesCount; i++) {
                            setData(getData(issues[i]));
                        }

                        thisAverage = 0

                        for (var dt in data.dateToPlot) {
                            labels.push(dt);

                            k = 0;
                            dateToPlotLength = data.dateToPlot[dt].length;

                            for (; k < dateToPlotLength; k++) {
                                thisAverage += data.dateToPlot[dt][k];
                            }

                            values.push(thisAverage / dateToPlotLength);
                        }


                    },
                    function errorCallback(response) {
                        $scope.errorMessage = 'No cats today';
                    });
        };

        get();
    };

    JiraController.$inject = ['$scope', '$http'];

    angular.module('app')
        .controller('JiraController', JiraController);
}());