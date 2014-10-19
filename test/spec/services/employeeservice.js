'use strict';

describe('Service: EmployeeService', function () {

  // load the service's module
  beforeEach(module('angularDemo'));

  // instantiate service
  var EmployeeService;
  beforeEach(inject(function (_EmployeeService_) {
    EmployeeService = _EmployeeService_;
  }));

  it('should do something', function () {
    expect(!!EmployeeService).toBe(true);
  });

});
