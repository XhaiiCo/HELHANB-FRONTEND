import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputAdReservation} from "../../../../dtos/ad/dto-input-my-ads";

@Component({
  selector: 'app-my-ad-reservation-card',
  templateUrl: './my-ad-reservation-card.component.html',
  styleUrls: ['./my-ad-reservation-card.component.scss']
})
export class MyAdReservationCardComponent implements OnInit {

  @Input() reservation!: DtoInputAdReservation;
  @Input() nbConflicts!: number;
  @Output() onRefusalBtnClickEvent: EventEmitter<DtoInputAdReservation> = new EventEmitter<DtoInputAdReservation>();
  @Output() onConfirmationBtnClickEvent: EventEmitter<DtoInputAdReservation> = new EventEmitter<DtoInputAdReservation>();

  constructor() {
  }

  ngOnInit(): void {
  }

  dtoObjectToDateFR(date: Date) {
    let d = new Date(date);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }

  dtoObjectToDateUS(date: Date) {
    let d = new Date(date);
    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
  }

  nbDaysBetweenDates(startDate: Date, endDate: Date) {
    startDate = new Date(startDate)
    endDate = new Date(endDate);
    let d1 = startDate.getFullYear() + "-" + startDate.getMonth() + "-" + startDate.getDate();
    let d2 = endDate.getFullYear() + "-" + endDate.getMonth() + "-" + endDate.getDate();
    let diffInMs = new Date(d2).getTime() - new Date(d1).getTime();
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
  }

  onRefusalBtnClick(): void {
    this.onRefusalBtnClickEvent.next(this.reservation)
  }

  onConfirmationBtnClick(): void {
    this.onConfirmationBtnClickEvent.next(this.reservation)
  }
}
