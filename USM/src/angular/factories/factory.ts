///<reference path="./../../../typings/tsd.d.ts"/>
//import angular = require('angular');

(() => {

    function myfactory($http, $q) {
        
        let fact = {
            //Get Request
            get: (getUrl)=>{
                var defer = $q.defer();

                $http.get(getUrl)
                .success(function (d) {
                    defer.resolve(d);
                })
                .error(function () {
                    defer.reject("Failed!");
                });
    
                return defer.promise;
            },
            //Post Request
            post: (postUrl, postData)=>{
                console.log('Ang Factory: '+ JSON.stringify(postData));
                 var defer = $q.defer();
                $http.post(postUrl, JSON.stringify(postData), { /* headers: { 'RequestVerificationToken': forgreykey },*/ contentType: 'application/json; charset=utf-8', cache: false })
                .success(function (d) {
                    defer.resolve(d);
                })
                .error(function () {
                    defer.reject("Failed!");
                });
                return defer.promise;
            },
            //Put Request
            put: (postUrl, postData)=>{
                 var defer = $q.defer();
                $http.put(postUrl, JSON.stringify(postData), { /* headers: { 'RequestVerificationToken': forgreykey },*/ contentType: 'application/json; charset=utf-8', cache: false })
                .success(function (d) {
                    defer.resolve(d);
                })
                .error(function () {
                    defer.reject("Failed!");
                });
                return defer.promise;
                
            },
            //Delete Request
            delete: (postUrl, id)=>{
                 var defer = $q.defer();
                $http.delete(postUrl+id, { /* headers: { 'RequestVerificationToken': forgreykey },*/ contentType: 'application/json; charset=utf-8', cache: false })
                .success(function (d) {
                    defer.resolve(d);
                })
                .error(function () {
                    defer.reject("Failed!");
                });
                return defer.promise;
                
            }
        };

        return fact;
        
    }; //myFactory Closng 
    
        angular.module('appJS').factory('myfactory', myfactory);
        myfactory.$inject = ['$http','$q'];
})();