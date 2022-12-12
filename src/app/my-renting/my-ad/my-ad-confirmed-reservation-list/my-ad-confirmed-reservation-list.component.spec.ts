import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdConfirmedReservationListComponent } from './my-ad-confirmed-reservation-list.component';

describe('MyAdReservationListComponent', () => {
  let component: MyAdConfirmedReservationListComponent;
  let fixture: ComponentFixture<MyAdConfirmedReservationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAdConfirmedReservationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdConfirmedReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
