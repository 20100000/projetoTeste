/**
 * Created by tiago on 11/08/2017.
 */

(function() {
    'use strict';

    angular.module('evolucional')
        .controller('profModalCtrl', Controller);

    Controller.$inject = ['Model','profService', '$uibModalInstance','$rootScope','$q'];

    function Controller( Model, profService, $uibModalInstance,$rootScope,$q) {
        var vm = this;

        vm.model = Model;

        vm.errors = [];
        vm.degrees = $rootScope.degrees;
        vm.classes = $rootScope.classes;
        vm.alunos = [];
        vm.alunosDegrees=[];
        vm.cancel = cancel;

       console.log($rootScope.alunos);

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function init() {
            profService.getStudents()
                .then(function (response) {
                    vm.alunos = response;
                }).catch(function(data, status) {

                })
                .finally(function () {
                    vm.alunosDegrees = alunosDegrees();
                });

        }
        
        function alunosDegrees (){
            var future = $q.defer();

           if( vm.model) {
               angular.forEach(vm.model, function (item) {
                   angular.forEach(vm.alunos, function (item2) {
                       if (item.degreeId == item2.degreeId) {
                           vm.alunosDegrees.push({name:item2.name,ra:item2.ra});
                       }
                   });


               });
               future.resolve(vm.alunosDegrees);
           }
            return future.promise.$$state.value;
        }

        if(!$rootScope.alunos){
            init();

        }else{
            console.log($rootScope.alunos);
            vm.alunos = $rootScope.alunos;
            vm.alunosDegrees = alunosDegrees();

        }
    }
})();

