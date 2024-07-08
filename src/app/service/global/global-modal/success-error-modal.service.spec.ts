import { TestBed } from '@angular/core/testing';

import { SuccessErrorModalService } from './success-error-modal.service';

describe('SuccessErrorModalService', () => {
  let service: SuccessErrorModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccessErrorModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
