import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRentingsComponent } from './admin-rentings.component';

describe('AdminRentingsComponent', () => {
  let component: AdminRentingsComponent;
  let fixture: ComponentFixture<AdminRentingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRentingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRentingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
