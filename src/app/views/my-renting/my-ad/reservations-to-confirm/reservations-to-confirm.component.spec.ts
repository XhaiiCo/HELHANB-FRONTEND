import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsToConfirmComponent } from './reservations-to-confirm.component';

describe('ReservationsToConfirmComponent', () => {
  let component: ReservationsToConfirmComponent;
  let fixture: ComponentFixture<ReservationsToConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsToConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsToConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
