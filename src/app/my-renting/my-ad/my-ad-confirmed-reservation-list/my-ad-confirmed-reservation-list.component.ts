import {Component, Input, OnInit} from '@angular/core';
import {DtoInputAdReservation} from "../../../dtos/ad/dto-input-my-ads";

@Component({
  selector: 'app-my-ad-confirmed-reservation-list',
  templateUrl: './my-ad-confirmed-reservation-list.component.html',
  styleUrls: ['./my-ad-confirmed-reservation-list.component.scss']
})
export class MyAdConfirmedReservationListComponent implements OnInit {

  @Input() reservations!: DtoInputAdReservation[] ;
  constructor() { }

  ngOnInit(): void {
  }

  nbDaysBetweenDates(startDate: Date, endDate: Date) {
    let diffInMs = new Date(endDate).getTime() - new Date(startDate).getTime();
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
  }
}
