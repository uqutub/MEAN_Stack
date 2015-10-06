///<reference path="./../../../typings/tsd.d.ts"/>
//import angular = require('angular');
(function () {
    function todoController($scope, $http) {
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
                    $scope.task = { Task: '', CreatedBy: '', CreatedOn: Date.now, Status: 0 };
                    $scope.loadData();
                }
            }, function (response) {
                // failed
            });
        };
        //Delete
        $scope.Delete = function (id) {
            $http({
                url: '/todo/delete/' + id,
                method: "GET"
            })
                .then(function (response) {
                if (response.data.status == "200") {
                    alert('Deleted');
                    $scope.loadData();
                }
            }, function (response) {
                // failed
            });
        };
        //init function
        (function () {
            $scope.loadData();
        })();
    }
    ; //todoCtrl Function Closing
    angular.module('appJS').controller('todoController', todoController);
    todoController.$inject = ['$scope', '$http'];
})();
