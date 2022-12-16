import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdReservationsToConfirmListComponent } from './my-ad-reservations-to-confirm-list.component';

describe('ReservationsToConfirmComponent', () => {
  let component: MyAdReservationsToConfirmListComponent;
  let fixture: ComponentFixture<MyAdReservationsToConfirmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAdReservationsToConfirmListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdReservationsToConfirmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
