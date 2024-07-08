import { TestBed } from '@angular/core/testing';

import { UploadCompanyListService } from './upload-company-list.service';

describe('UploadCompanyListService', () => {
  let service: UploadCompanyListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadCompanyListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
