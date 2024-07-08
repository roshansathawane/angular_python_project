import { TestBed } from '@angular/core/testing';

import { CompanyDetailsListService } from './company-details-list.service';

describe('CompanyDetailsListService', () => {
  let service: CompanyDetailsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyDetailsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
