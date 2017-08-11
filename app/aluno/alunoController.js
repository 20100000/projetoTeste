/**
 * Created by tiago on 10/08/2017.
 */
(function() {
    'use strict';

    angular.module('evolucional')
        .controller('alunoCtrl', Controller);

    Controller.$inject = ['$scope', '$uibModal','alunoService','$filter','$rootScope','$q','$timeout'];

    function Controller($scope, $uibModal, alunoService,$filter,$rootScope,$q, $timeout) {
        var vm = this;

        vm.titulo = "Alunos";
        vm.pessNome = "";
        vm.pessSerie = {};
        vm.pessClasse = {};
        $rootScope.dados = {}
        $rootScope.dados.label = [];
        $rootScope.dados.dado = [];
        $rootScope.alunos = [];

        vm.openModal = openModal;
        function openModal(model) {
            model = angular.isUndefined(model) ? {} : model;

            var modal = $uibModal.open({
                animation: true,
                templateUrl: 'app/aluno/alunoFormView.html',
                controller: 'alunoFormCtrl as vm',
                backdrop: 'static',
                keyboard: false,
                size: '900',
                resolve: {
                    Model: function() {
                        return model;
                    }
                }
            });

            modal.result.then(function(model) {
                updateCollection(vm.alunos, model);
                updateCollection(vm.tempCollection, model);
            });
        }

        function updateCollection(collection, model) {
            var insert = true;
            angular.forEach(collection, function(data, index) {
                if (data.id == model.id) {
                    collection[index] = model;
                    insert = false;
                }
            });

            if (insert) {
                collection.push(model);
            }
        }

        function dadosChart() {
            var future = $q.defer();
            var cont =0;
            angular.forEach(vm.degrees , function (item) {
                $rootScope.dados.label.push(item.name);
                angular.forEach(vm.alunos, function (item2) {
                    if (item.id == item2.degreeId) {
                        cont++;
                    }
                });
                $rootScope.dados.dado.push(cont);
                cont = 0;

            });
            future.resolve( $rootScope.dados)

            return future.promise.$$state.value;
        }

        function  init() {
            alunoService.getCollection()
                .then(function(response) {
                    vm.alunos = response;
                    $rootScope.alunos = vm.alunos;
                })
                .catch(function(response) {

                })
                .finally(function() {
                    vm.tempCollection = angular.copy(vm.alunos);
                });

            alunoService.getClasses()
                .then(function(response) {
                    vm.classes = response;
                })
                .catch(function(response) {

                })
                .finally(function() {
                    $rootScope.classes = vm.classes;
                });

            alunoService.getDegrees()
                .then(function(response) {
                    vm.degrees = response;
                })
                .catch(function(response) {

                })
                .finally(function() {
                    $rootScope.degrees = vm.degrees ;
                    $rootScope.dados =dadosChart();
                });
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

        function setInterval(){
            myChart.clear();
            myChart.data.datasets[0].data = $rootScope.dados.dado;
            myChart.data.datasets[0].backgroundColor = [
                '#00ff00',
                '#0000ff',
                '#ff0000',
                '#191970',
                '#7FFFD4',
                '#006400',
                '#5F9EA0',
                '#556B2F',
                '#7CFC00',
                '#BDB76B',
                '#FFD700',
                '#B22222',
                '#FFA07A'

            ];
            $timeout(myChart.update(), 2000);
        }
        vm.trezentos = trezentos;
        function trezentos() {
            var x = 0;
            var id = vm.alunos.length +1;
            while (x <300){
                var c = Math.floor((Math.random() * 6) + 1);
                var d = Math.floor((Math.random() * 13) + 1);
                var ra = Math.floor((Math.random() * 10000) + 1);
                vm.alunos.push({"id":id,
                    "ra":ra,
                    "name":"Nome do aluno " + id,
                    "degreeId":d,
                    "classId":c});

                x++;
                id++;
            }
            $rootScope.alunos = vm.alunos;
            $rootScope.dados = dadosChart();
            setInterval();

        }

        vm.tableFilter = tableFilter;
        function tableFilter() {
            var collection = [];

            if (vm.pessSerie) {
                console.log(vm.pessSerie);
                collection = $filter('filter')(vm.alunos, { degreeId : vm.pessSerie});
            }

            if (vm.pessClasse) {
                collection = $filter('filter')(vm.alunos, { classId : vm.pessClasse });
            }


                vm.alunos = collection;

        }
        var ctx = document.getElementById("pause-chart");
        var myChart ;
        function initChart() {
            var dados = $rootScope.dados.dado

            myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: $rootScope.dados.label,
                    datasets: [{
                        data: dados ,
                        backgroundColor: [
                            '#00ff00',
                            '#0000ff',
                            '#ff0000',
                            '#191970',
                            '#7FFFD4',
                            '#006400',
                            '#5F9EA0',
                            '#556B2F',
                            '#7CFC00',
                            '#BDB76B',
                            '#FFD700',
                            '#B22222',
                            '#FFA07A'

                        ]
                    }]
                },
                options: {
                    legend: {
                        display: false
                    }
                }

            });
            return true;
        }



        init();

        $timeout(initChart, 2000);






    }
})();
