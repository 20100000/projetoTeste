/**
 * Created by tiago on 10/08/2017.
 */
var evolucional = angular.module('evolucional', [
    'ngRoute','oc.lazyLoad','ui.bootstrap'
]);

evolucional.config(['$routeProvider', function ($routeProvider,$ocLazyLoad) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/aluno/alunoView.html',
            controller: 'alunoCtrl as vm',
            resolve:{
                loadAsset:["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['app/aluno/alunoController.js','app/aluno/alunoService.js','app/aluno/alunoFormCtrl.js'
                    ])
                }]
            }
        })
        .when('/prof', {
            templateUrl: 'app/professor/profView.html',
            controller: 'profCtrl as vm',
            resolve:{
                loadAsset:["$ocLazyLoad", function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['app/professor/profCtrl.js','app/professor/profService.js','app/professor/profModalCtrl.js'
                    ])
                }]
            }
        })

}]);