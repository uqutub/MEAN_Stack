///<reference path="./../../typings/tsd.d.ts"/>
var angular = require('angular');
(function () {
    var appJS = angular.module('appJS', []);
    appJS.controller('todoController', function ($scope, $http) {
        $scope.task = { Task: '', CreatedBy: '', CreatedOn: Date.now, Status: 0 };
        $scope.loadData = function () {
            $http.get('/todo/todo.json2')
                .then(function (response) {
                $scope.gists = response.data;
            })
                .catch(function (response) {
                console.error('Gists error', response.status, response.data);
            })
                .finally(function () {
                //console.log("finally finished gists");
            });
        };
        //post data
        $scope.post = function () {
            $http({
                url: '/todo/create/',
                method: "POST",
                data: JSON.stringify($scope.task)
            })
                .then(function (response) {
                if (response.data.status == "200") {
                    alert('successfuly inserted');
                    $scope.loadData();
                }
            }, function (response) {
                // failed
            });
        };
        //constructor function
        (function () {
            $scope.loadData();
        })();
    });
})();
