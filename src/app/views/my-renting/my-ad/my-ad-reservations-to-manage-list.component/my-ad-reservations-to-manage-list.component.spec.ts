import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdReservationsToManageListComponent } from './my-ad-reservations-to-manage-list.component';

describe('ReservationsToConfirmComponent', () => {
  let component: MyAdReservationsToManageListComponent;
  let fixture: ComponentFixture<MyAdReservationsToManageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAdReservationsToManageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdReservationsToManageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
