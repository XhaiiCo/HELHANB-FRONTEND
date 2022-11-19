import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRentingComponent } from './my-renting.component';

describe('MyRentingComponent', () => {
  let component: MyRentingComponent;
  let fixture: ComponentFixture<MyRentingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRentingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRentingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
