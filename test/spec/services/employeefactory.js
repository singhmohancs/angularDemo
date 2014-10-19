'use strict';

describe('Service: EmployeeFactory', function () {

  // load the service's module
  beforeEach(module('angularDemo'));

  // instantiate service
  var EmployeeFactory;
  beforeEach(inject(function (_EmployeeFactory_) {
    EmployeeFactory = _EmployeeFactory_;
  }));

  it('should do something', function () {
    expect(!!EmployeeFactory).toBe(true);
  });

});
