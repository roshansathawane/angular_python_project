import { GlobalModalService } from './global-modal-service.service';
import { TestBed } from '@angular/core/testing';

describe('GlobalModalServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalModalService = TestBed.get(GlobalModalService);
    expect(service).toBeTruthy();
  });
});
