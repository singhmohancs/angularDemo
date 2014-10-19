/**
 * @name angularDemo : An application root level module(Primary module or Parent module)
 * @module angularDemo
 * @description
 *
 * This is an application main module which inject all dependencies
 * Inject all child modules ( I have one child module employee)
 *
 * Parent state [employee] resolves dependency of server call( localStorage , i am using here, No backend call)
 * which reads the localStorage and get all records and assign to an scope varibale employeeList, which is again an
 * dependecy for child state. employeeList scope varibale is readable through controller
 * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
 */

'use strict';

var angularDemo = angular.module('angularDemo', [
    'angularDemo.employees',
    'angularDemo.employees.service',
    'angularDemo.employees.controller',
    'ui.router',
    'ngAnimate',
    'LocalStorageModule',
    'mgcrea.ngStrap'
]);

angularDemo.run(
    ['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {

            // It's very must to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('employee.list') }"> will set the <li>
            // to active whenever 'employee.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;


        }
    ]
);

angularDemo.config(
    ['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider',
        function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
            
            //set localstorage configuration
            localStorageServiceProvider.setPrefix('Emp_');
            
            //localStorageServiceProvider.setStorageType('sessionStorage');
            //Default type localStorage
            localStorageServiceProvider.setNotify(true, true);


            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider.otherwise('/');


            // Use $stateProvider to configure your states.
            $stateProvider.state("home", {
                // Use a url of "/" to set a states as the "index".
                url: "/",
                views: {
                    'main-view@': {
                        templateUrl: "./modules/home/template/index.html"
                    }
                },
                title: 'Home'

            });

        }
    ]
);