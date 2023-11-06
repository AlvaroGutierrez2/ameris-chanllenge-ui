import { TestBed } from '@angular/core/testing';

import { SearchEmployeeService } from './search-employee.service';

describe('SearchEmployeeService', () => {
  let service: SearchEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
