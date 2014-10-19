/**
 * @name angularDemo.employees.service:employeeFactory
 * @module angularDemo.employees
 * @description
 *
 * Factory of employees module
 * Do all CURD operation
 * 
 * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
 *
 * @param  {[Object]} localStorageService An instance of localstorage (Here i have used angular-localstorage ) module to
 *                                        emplement localStorage
 * @return {[Object]}                     An instance of employeeFactory Class
 */
'use strict';
angular.module('angularDemo.employees.service', [])
    .factory('employeeFactory', ['localStorageService',
        function(localStorageService) {

            //Read localStorage
            var employeeTable = localStorageService.get("employeeTable"),
                //An object which is returned when service is called
                factory = {};

            /**
             * All function return a list of all employees
             * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
             * @return {[type]} [description]
             */
            factory.all = function() {
                if (employeeTable == null)
                    employeeTable = [];
                return employeeTable;
            };

            /**
             * Perform create and update operation
             * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
             * @param  {[Object]} obj   An object of employee record
             * @param  {[type]} empId  Employee Id which is passed on update operation
             * @return {[void]}
             */
            factory.save = function(obj, empId) {
                var _employeeRecord = obj;
                if (typeof empId === 'undefined') {
                    employeeTable.push(_employeeRecord);
                    localStorageService.set("employeeTable", employeeTable);
                } else {
                    for (var i = 0; i < employeeTable.length; i++) {
                        if (employeeTable[i]['empId'] === parseInt(empId)) {
                            employeeTable[i] === obj;
                            localStorageService.set("employeeTable", employeeTable[i]);
                            return;
                        }
                    };
                }

                return;
            };

            /**
             * Delete an employee record with primary key empId
             * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
             * @param  {[Object]} empId Employee Id
             * @return {[void]}
             */
            factory.delete = function(empId) {
                for (var i = 0; i < employeeTable.length; i++) {
                    if (employeeTable[i]['empId'] === parseInt(empId)) {
                        employeeTable.splice(i, 1);
                        localStorageService.set("employeeTable", employeeTable);
                        return;
                    }
                };

                return;
            };

            /**
             * Get an record from list by employee Id
             * @author Mohan Singh ( gmail::singhmohancs@gmail.com, skype :: mohan.singh42 )
             * @param  {[Integer]} empId Employee id
             * @return {[Object]}  Employee record object
             */
            factory.get = function(empId) {
                for (var i = 0; i < employeeTable.length; i++) {
                    if (employeeTable[i]['empId'] === parseInt(empId))
                        return employeeTable[i];
                };
            };

            return factory;
        }
    ]);