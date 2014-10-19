/**
 * @name angularDemo.employees.controller:EmployeeCtrl
 * @module angularDemo.employees
 * @description
 *
 * Controller of employees module
 * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
 *
 * @param  {[Object]} $scope              A controller scope which is the glue between controller and view of employee
 *                                        modules
 * @param  {[Object]} employeeList        EmployeeList is an object of all employee which is the response from state
 *                                        resolve
 * @param  {[Object]} localStorageService An instance of localstorage (Here i have used angular-localstorage ) module to
 *                                        emplement localStorage
 * @param  {[Object]} employeeFactory     A service which contains business logics and handles localStorage logic of CURD
 * @param  {[Object]} $state              An object of route state which contains all route information and methods
 * @param  {[Object]} $stateParams)       An object which contains all passed parameter accross routing
 * @return {[Object]}                     An instance of EmployeeCtrl Class
 */

'use strict';

angular.module('angularDemo.employees.controller', [

]).controller('EmployeeCtrl', ['$scope', 'employeeList', 'localStorageService', 'employeeFactory', '$state', '$stateParams',
    function($scope, employeeList, localStorageService, employeeFactory, $state, $stateParams) {



        /**
         * Invoked when controller has initialized
         * Sets scope models 
         * 
         * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
         * @return  {[void]}
         * @private
         */
        var _init = function() {
            //stores employee list 
            //Accessible with in the scope of controller
            $scope.employeesList = employeeList;

            //Scope model property for search Text field
            $scope.searchText = '';

            $scope.moduleName = "Employee Management";
            $scope.pageTitle = "Employee List"
            if (typeof $stateParams.empId !== 'undefined') {
                $scope.employee = employeeFactory.get($stateParams.empId);
            }
        };
        _init();

        /**
         * Save employee records to localStorage
         * Check form validation
         * 
         * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
         * @return {[void]}
         */
        $scope.save = function() {

            //No action, if form is not valid
            if (!$scope.employeeForm.$valid) return;

            //check if new employee record 
            //for new record empId will not be set
            //A record will be saved with new empId
            if (!$scope.employee.empId) {
                $scope.employee.empId = ($scope.employeesList.length === 0) ? 1 : ($scope.employeesList[$scope.employeesList.length - 1].empId + 1);
                employeeFactory.save($scope.employee);
            } else {
                
                //Update record by primary key empId 
                employeeFactory.save($scope.employee, $scope.employee.empId);
            }

            //Load list state after form has saved
            $state.go('employees.list');
        };

        /**
         * Delete employee record from localStorage by 
         * PrimaryKey of record
         * 
         * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
         * @param  {[Integer]} employeeId
         * @return {[Void]}
         */
        $scope.delete = function(employeeId) {
            employeeFactory.delete(employeeId);
            $state.go('employees.list');
        };

        /**
         * Set form to scope
         * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
         * @param  {[type]} form [description]
         * @return {[type]}      [description]
         */
        $scope.getForm = function(form) {
            $scope.employeeForm = form;
        };

        /**
         * Clear all localStorage 
         * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
         * @return {[void]}
         */
        $scope.clearLocalStorage = function() {
            localStorageService.clearAll();
        };

    }

]);