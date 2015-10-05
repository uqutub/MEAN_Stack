///<reference path="./../../../typings/tsd.d.ts"/>
//import angular = require('angular');
(function () {
    function userController($scope, $http, myfactory) {
        var f = myfactory;
        $scope.Users = [];
        $scope.user = { _id: null, FirstName: "", LastName: "", UserName: "", Email: "", Password: "", Address: "" };
        $scope.AddUser = function () {
            if ($scope.user.Email.length > 2 && $scope.user.Password.length > 2) {
                $scope.user.UserName = $scope.user.Email;
                f.post("/user/Create/", $scope.user).then(function (d) {
                    console.log('Ang CTRL: ' + JSON.stringify($scope.user));
                    if (d.status == "200") {
                        $scope.user = { _id: null, FirstName: "", LastName: "", UserName: "", Email: "", Password: "", Address: "" };
                        $scope.GetAllUsers();
                        alert('successfuly inserted');
                    }
                }, function (response) {
                    // failed
                });
            } //closing if checking length 
        }; //closing adduser
        $scope.EditUser = function () {
            if ($scope.user._id) {
                $http.put("/user/Edit/", $scope.user).then(function (response) {
                    if (response.data.status == "200") {
                        //$scope.Users.push($scope.user);
                        $scope.user = { _id: null, FirstName: "", LastName: "", UserName: "", Email: "", Password: "", Address: "" };
                        $scope.GetAllUsers();
                        alert('successfuly updated');
                    }
                }, function (response) {
                    // failed
                });
            } //closing if
        }; //closing Edituser
        $scope.DeleteUser = function (id) {
            $http.delete("/user/Delete/" + id).then(function (response) {
                if (response.data.status == "200") {
                    //$scope.Users.push($scope.user);
                    $scope.user = { _id: null, FirstName: "", LastName: "", UserName: "", Email: "", Password: "", Address: "" };
                    $scope.GetAllUsers();
                    alert('successfuly Delete');
                }
            });
        }; //closing Delete User
        $scope.GetAllUsers = function () {
            f.get("/user/user.json").then(function (d) {
                $scope.Users = d;
            });
            // $http.get("/user/user.json")
            // .then(function(response) {
            // 	$scope.Users = response.data;
            // 	  //console.log(JSON.stringify(response.data));
            // })
            // .catch(function(response) {
            // 	console.error('Gists error', response.status, response.data);
            // })
            // .finally(function() {
            // 	//console.log("finally finished gists");
            // });
        }; //GetAllUSers
        $scope.EditUserGet = function (id) {
            $scope.user = $scope.Users[id];
        };
        //Init Function
        function init() {
            $scope.GetAllUsers();
        }
        init();
    }
    ; //usmCtrl Function Closing
    angular.module('appJS').controller('userController', userController);
    userController.$inject = ['$scope', '$http', 'myfactory'];
})();
