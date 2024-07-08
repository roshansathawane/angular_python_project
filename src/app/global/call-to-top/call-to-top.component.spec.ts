import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToTopComponent } from './call-to-top.component';

describe('CallToTopComponent', () => {
  let component: CallToTopComponent;
  let fixture: ComponentFixture<CallToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallToTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
