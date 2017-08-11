/**
 * Created by tiago on 10/08/2017.
 */
(function() {
    'use strict';
    angular.module('evolucional')
        .factory('alunoService', Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var service = this;

        //properties
        service.classes = null;
        service.degrees = null;

        //public methods
        service.getCollection = getCollection;
        service.getClasses = getClasses;
        service.getDegrees = getDegrees;

        return service;

        function getCollection() {
            var future = $q.defer();

            $http.get('json/students.json')
                .then(function(response) {
                    future.resolve(response.data);
                })
                .catch(function(data, status) {
                    future.reject({
                        data: data,
                        status: status
                    });
                });

            return future.promise;
        }

        function getClasses() {
            var future = $q.defer();

            if (!service.classes) {
                $http.get('json/classes.json')
                    .then(function(response) {
                        service.classes = response.data.classes;
                        future.resolve(response.data.classes);
                    })
                    .catch(function(data, status) {
                        future.reject({
                            data: data,
                            status: status
                        });
                    });

            } else {
                future.resolve(service.classes);
            }

            return future.promise;
        }

        function getDegrees() {
            var future = $q.defer();

            if (!service.degrees) {

                $http.get('json/degrees.json')
                    .then(function(response) {
                        service.degrees = response.data;
                        future.resolve(response.data);
                    })
                    .catch(function(data, status) {
                        future.reject({
                            data: data,
                            status: status
                        });
                    });
            } else {
                future.resolve(service.degrees);
            }

            return future.promise;
        }

    }

    return Service;
})();
