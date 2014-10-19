'use strict';

describe('Controller: EmployeectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('angularDemo'));

  var EmployeectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmployeectrlCtrl = $controller('EmployeectrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
