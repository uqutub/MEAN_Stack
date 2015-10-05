///<reference path="./../../../typings/tsd.d.ts"/>
//import angular = require('angular');

(() => {
	function userController($scope, myfactory) {
		let f = myfactory;
	
	
	$scope.Users = [];
	$scope.user = {_id: null, FirstName: "", LastName: "",	UserName: "",	Email: "",	Password: "",	Address: ""};
	
		
	$scope.AddUser = () =>{
		if($scope.user.Email.length > 2 && $scope.user.Password.length > 2) {
		
			$scope.user.UserName = $scope.user.Email;
			
			f.post("/user/Create/",$scope.user).then(function (d) {
				if(d.status == "200"){
					$scope.user = {_id: null, FirstName: "", LastName: "",	UserName: "",	Email: "",	Password: "",	Address: "" };
					$scope.GetAllUsers();
					alert('successfuly inserted');
				}
				}, (response) => { // optional
				 		// failed
				});
				
				// $http.post("/user/Create/",$scope.user).then(function(response) {
				// 	if(response.data.status == "200")
				// 	{
				// 		//$scope.Users.push($scope.user);
				// 		$scope.user = {_id: null, FirstName: "", LastName: "",	UserName: "",	Email: "",	Password: "",	Address: "" };
				// 		$scope.GetAllUsers();
				// 		alert('successfuly inserted');
				// 		//$scope.loadData();
				// 	}
				// }, 
				// function(response) { // optional
				// 		// failed
				// });	
				
		} //closing if checking length 
	}; //closing adduser
	
	$scope.EditUser = () =>{
		if($scope.user._id) {
			f.put("/user/Edit/",$scope.user).then(function (d) {
				if(d.status == "200")
				{
					$scope.user = {_id: null, FirstName: "", LastName: "",	UserName: "",	Email: "",	Password: "",	Address: "" };
					$scope.GetAllUsers();
					alert('successfuly updated');
				}	
			}, function(response) { // optional
						// failed
			});
		
				//$http.put("/user/Edit/",$scope.user).then(function(response) {
				//	if(response.data.status == "200")
				//	{
				//		//$scope.Users.push($scope.user);
				//		$scope.user = {_id: null, FirstName: "", LastName: "",	UserName: "",	Email: "",	Password: "",	Address: "" };
				//		$scope.GetAllUsers();
				//		alert('successfuly updated');
				//		//$scope.loadData();
				//	}
				//}, 
				//function(response) { // optional
						// failed
				//});	
		} //closing if
	}; //closing Edituser
	
	$scope.DeleteUser = (id: string) => {
		f.delete("/user/Edit/",$scope.user).then(function (d) {
				if(d.status == "200")
				{
					$scope.user = {_id: null, FirstName: "", LastName: "",	UserName: "",	Email: "",	Password: "",	Address: "" };
					$scope.GetAllUsers();
					alert('successfuly Delete');	
				}
		}
		//$http.delete("/user/Delete/"+id).then(function(response){
			//if(response.data.status == "200")
			//		{
						////$scope.Users.push($scope.user);
						//$scope.user = {_id: null, FirstName: "", LastName: "",	UserName: "",	Email: "",	Password: "",	Address: "" };
						//$scope.GetAllUsers();
						//alert('successfuly Delete');
						///$scope.loadData();
					//}
		//});
	}; //closing Delete User
	
	
	$scope.GetAllUsers = ()=> {
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
	};//GetAllUSers
	
	$scope.EditUserGet = (id) => {
		$scope.user = $scope.Users[id];
	};
	
	//Init Function
	function init(){
		$scope.GetAllUsers();
	}
	init();
	
		
	};//usmCtrl Function Closing
	
	angular.module('appJS').controller('userController', userController);
	userController.$inject=['$scope', 'myfactory'];
	
})();
