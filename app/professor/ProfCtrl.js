/**
 * Created by tiago on 10/08/2017.
 */
(function() {
    'use strict';

    angular.module('evolucional')
        .controller('profCtrl', Controller);

    Controller.$inject = ['$scope', '$uibModal','profService','$filter'];

    function Controller($scope, $uibModal, profService, $filter) {
        var vm = this;

        vm.titulo = "Professores";
        vm.professor = [];
        vm.pessSerie = {};
        vm.pessClasse = {};
        vm.tempCollection = [];


        vm.openModal = openModal;
        function openModal(serie) {
            var model =  serie;

            var modal = $uibModal.open({
                animation: true,
                templateUrl: 'app/professor/profModalView.html',
                controller: 'profModalCtrl as vm',
                backdrop: 'static',
                keyboard: false,
                size: '900',
                resolve: {
                    Model: function() {
                        return model;
                    }
                }

            });

        }

        function  init() {
            profService.getCollection()
                .then(function (response) {
                    vm.professor = response;
                })
                .catch(function (response) {

                })
                .finally(function () {
                    vm.tempCollection = vm.professor;
                });

            profService.getTeaches()
                .then(function(response) {
                    vm.teaches = response;
                })
                .catch(function(response) {

                })
                .finally(function() {
                });

            profService.getMatters()
                .then(function(response) {
                    vm.matters = response;
                })
                .catch(function(response) {

                })
                .finally(function() {
                });

            profService.getClasses()
                .then(function(response) {
                    vm.classes = response;
                })
                .catch(function(response) {

                })
                .finally(function() {
                });

            profService.getDegrees()
                .then(function(response) {
                    vm.degrees = response;
                })
                .catch(function(response) {

                })
                .finally(function() {
                });
        }

        vm.teachesName = teachesName;
        function teachesName(id) {
            var n = "";
            angular.forEach(vm.teaches, function(item) {

                if (id == item.id ) {
                    n = item.name;
                }
            });
            return n;
        }

        vm.matterName = matterName;
        function matterName(id) {
            var n = "";
            angular.forEach(vm.matters, function(item) {

                if (id == item.id ) {
                    n = item.name;
                }
            });
            return n;
        }

        vm.className = className;
        function className(id) {
            var n = "";
            angular.forEach(vm.classes, function(item) {

                if (id == item.id ) {
                    n = item.name;
                }
            });
            return n;
        }

        vm.degreesName = degreesName;
        function degreesName(id) {
            var n = "";
            angular.forEach(vm.degrees, function(item) {

                if (id == item.id ) {
                    n = item.name;
                }
            });
            return n;
        }

        vm.tableFilter = tableFilter;
        function tableFilter() {
            var collection = [];
            vm.professor = vm.tempCollection;

            if (vm.pessSerie) {
                    angular.forEach(vm.professor, function (item) {
                      angular.forEach(item.degrees, function (serie) {
                          console.log(serie.degreeId);
                          if(serie.degreeId == vm.pessSerie){
                              collection.push(item);
                          }
                      });

                });
                if(collection.length){
                    vm.professor = collection;
                }

            }

            if (vm.pessClasse) {
                angular.forEach(vm.professor, function (item) {
                    angular.forEach(item.degrees, function (serie) {
                        angular.forEach(serie.classes, function (classe) {
                            if (classe.classId == vm.pessClasse) {
                                collection.push(item);
                            }
                        });
                    });
                });
            }

            if(collection.length){
                console.log(collection);

                vm.professor = collection;
            }else{
                vm.professor =[];
            }

        }

        vm.trezentos = trezentos;
        function trezentos() {
            var x = 0;
            var id = vm.professor.length +1;
            while (x <300){
                var c = Math.floor((Math.random() * 6) + 1);

                var m = Math.floor((Math.random() * 4) + 1);
                var prof = Math.floor((Math.random() * vm.professor.length) + 1);
                var d = Math.floor((Math.random() * 13) + 1);
                vm.teaches.push({
                    "id":id,
                    "name":"Professor " + id
                });
                vm.professor.push({
                    "id": id,
                    "teacherId": prof,
                    "matterId": m,
                    "degrees": [
                        {
                            "degreeId": d,
                            "classes": [
                                {
                                    "classId": c
                                }
                            ]
                        }
                    ]
                });

                x++;
                id++;
            }
            $rootScope.alunos = vm.alunos;
            dadosChart($rootScope.degrees ,vm.alunos);
        }

        init();

    }
})();