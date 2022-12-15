import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdReservationCardComponent } from './my-ad-reservation-card.component';

describe('MyAdReservationCardComponent', () => {
  let component: MyAdReservationCardComponent;
  let fixture: ComponentFixture<MyAdReservationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAdReservationCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdReservationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
