import {Component, Input, OnInit} from '@angular/core';
import {DtoInputReservation} from "../../../dtos/ad/dto-input-my-ads";
import {DtoOuputDate} from "../../../dtos/user/dto-input-user-reservation";

@Component({
  selector: 'app-my-ad-reservation-list',
  templateUrl: './my-ad-reservation-list.component.html',
  styleUrls: ['./my-ad-reservation-list.component.scss']
})
export class MyAdReservationListComponent implements OnInit {

  @Input() reservations!: DtoInputReservation[] ;
  constructor() { }

  ngOnInit(): void {
  }

  nbDaysBetweenDates(startDate: Date, endDate: Date) {
    let diffInMs = new Date(endDate).getTime() - new Date(startDate).getTime();
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
  }
}
