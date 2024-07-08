import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsDashboardComponent } from './company-details-dashboard.component';

describe('CompanyDetailsDashboardComponent', () => {
  let component: CompanyDetailsDashboardComponent;
  let fixture: ComponentFixture<CompanyDetailsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyDetailsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
