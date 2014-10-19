/**
 * @name angularDemo.employees: Route configuration
 * @module angularDemo.employees
 * @description
 *
 * Here is the configuration of route for employee modules
 * state : employee (Parent state which is invoked by any child state)
 * state : employee.list (child state for listing)
 * state : employee.list.addNew (child state)
 * state : employee.list.edit (edit state)
 *
 * Parent state [employee] resolves dependency of server call( localStorage , i am using here, No backend call)
 * which reads the localStorage and get all records and assign to an scope varibale employeeList, which is again an
 * dependecy for child state. employeeList scope varibale is readable through controller
 * 
 * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
 */

'use strict';

angular.module('angularDemo.employees', [
    'ui.router'
])
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $stateProvider
                
                /**
                 * State : employee
                 * This state is a parent state which load the primary view templates which will be used by child states
                 */
                .state('employees', {

                    // With abstract set to true, that means this state can not be explicitly activated.
                    // It can only be implicitly activated by activating one of it's children.
                    abstract: true,

                    // This abstract state will prepend '/employees' onto the urls of all its children.
                    url: '/employees',
                    views: {
                        'main-view@': {
                            templateUrl: './modules/employee/template/employees.html',
                            controller: 'EmployeeCtrl',
                        },
                        'toolbar-view@employees': {
                            templateUrl: './modules/employee/partial/toolbar.html',
                            controller: 'EmployeeCtrl',
                        }
                    },

                    resolve: {
                        employeeList: ['employeeFactory',
                            function(employeeFactory) {
                                var response = employeeFactory.all();
                                return response;
                            }
                        ]
                    },
                })

               /**
                 * State > child : employees.list
                 * View : Listing table
                 * So you have a new state 'list' within the parent 'employees' state.
                 */
                .state('employees.list', {

                    // Using an empty url means that this child state will become active
                    // when its parent's url is navigated to. Urls of child states are
                    // automatically appended to the urls of their parent. So this state's
                    // url is '/employees' (because '/employees' + '').
                    url: '',

                    views: {
                        'employee-view': {
                            templateUrl: './modules/employee/template/list.html',
                        }
                    },
                    controller: 'EmployeeCtrl',
                    title: 'Employee List'

                })

                /**
                 * State > child > child: employees.list.addNew
                 * View : New employee form
                 * So you have a new state 'addNew' within the parent 'employees' state.This state is again child of list state.
                 * You can have unlimited children within a state. Here is a second child state within the 'employees' parent state.
                 */
                .state('employees.list.addNew', {
                    url: '/addNew',
                    views: {
                        'listpage-view': {
                            templateUrl: './modules/employee/template/add.html',
                            controller: 'EmployeeCtrl',
                        }
                    },
                    title: 'Add new employee'
                })

                /**
                 * State > child > child: employees.list.edit
                 * View : Edit employee form
                 * So you have a new state 'edit' within the parent 'employees' state.This state is again child of list state.
                 * You can have unlimited children within a state. Here is a second child state within the 'employees' parent state.
                 */
                .state('employees.list.edit', {
                    url: '/edit/{empId:[0-9]{1,4}}',
                    views: {
                        'listpage-view': {
                            templateUrl: './modules/employee/template/add.html',
                            controller: 'EmployeeCtrl',
                        }
                    },
                    title: 'Edit employee'
                });

            }
        ]
);