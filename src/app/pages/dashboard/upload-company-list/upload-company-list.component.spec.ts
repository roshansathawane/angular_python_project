import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCompanyListComponent } from './upload-company-list.component';

describe('UploadCompanyListComponent', () => {
  let component: UploadCompanyListComponent;
  let fixture: ComponentFixture<UploadCompanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadCompanyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
