import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdToValidateComponent } from './ad-to-validate.component';

describe('AdToValidateComponent', () => {
  let component: AdToValidateComponent;
  let fixture: ComponentFixture<AdToValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdToValidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdToValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
