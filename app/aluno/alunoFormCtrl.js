/**
 * Created by tiago on 10/08/2017.
 */
(function() {
    'use strict';

    angular.module('evolucional')
        .controller('alunoFormCtrl', Controller);

    Controller.$inject = ['Model', 'alunoService', '$uibModalInstance','$rootScope'];

    function Controller(Model, alunoService, $uibModalInstance,$rootScope) {
        var vm = this;

        //properties
        vm.model = Model;
        vm.errors = [];
        vm.degrees = $rootScope.degrees;
        vm.classes = $rootScope.classes;

        //public methods
        vm.save = save;
        vm.cancel = cancel;

        function save() {
            $uibModalInstance.close(vm.model);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }


        function init() {

        }

        init();
    }
})();
