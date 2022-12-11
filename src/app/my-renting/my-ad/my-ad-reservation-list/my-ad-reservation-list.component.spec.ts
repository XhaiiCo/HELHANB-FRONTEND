import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdReservationListComponent } from './my-ad-reservation-list.component';

describe('MyAdReservationListComponent', () => {
  let component: MyAdReservationListComponent;
  let fixture: ComponentFixture<MyAdReservationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAdReservationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
