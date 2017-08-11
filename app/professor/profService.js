/**
 * Created by tiago on 10/08/2017.
 */
/**
 * Created by tiago on 10/08/2017.
 */
(function() {
    'use strict';
    angular.module('evolucional')
        .factory('profService', Service);

    Service.$inject = ['$http', '$q'];

    function Service($http, $q) {
        var service = this;

        //properties
        service.classes = null;
        service.degrees = null;
        service.teaches = null;
        service.matters = null;

        //public methods
        service.getCollection = getCollection;
        service.getClasses = getClasses;
        service.getDegrees = getDegrees;
        service.getTeaches = getTeaches;
        service.getMatters = getMatters;
        service.getStudents = getStudents;


        return service;

        function getCollection() {
            var future = $q.defer();

            $http.get('json/relationships.json')
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

        function getTeaches() {
            var future = $q.defer();

            if (!service.teaches) {

                $http.get('json/teachers.json')
                    .then(function(response) {
                        service.teaches = response.data;
                        future.resolve(response.data);
                    })
                    .catch(function(data, status) {
                        future.reject({
                            data: data,
                            status: status
                        });
                    });
            } else {
                future.resolve(service.teaches);
            }

            return future.promise;
        }

        function getMatters() {
            var future = $q.defer();

            if (!service.matters) {

                $http.get('json/matters.json')
                    .then(function(response) {
                        service.matters = response.data;
                        future.resolve(response.data);
                    })
                    .catch(function(data, status) {
                        future.reject({
                            data: data,
                            status: status
                        });
                    });
            } else {
                future.resolve(service.matters);
            }

            return future.promise;
        }

        function getStudents() {
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


    }

    return Service;
})();
