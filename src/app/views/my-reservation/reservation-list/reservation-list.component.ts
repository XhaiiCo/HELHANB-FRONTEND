import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputReservation} from "../../../dtos/reservation/dto-input-reservation";
import {environment} from "../../../../environments/environment";

const dayDif = (date1: Date, date2: Date) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {

  readonly pictureBaseUri: string = environment.pictureUrl;

  @Input() reservationsList: DtoInputReservation[] = [];
  @Input() title: string = "";
  @Input() emptyListPhrase: string = "";
  @Input() canCancel: boolean = false;
  @Output() onCancelClick: EventEmitter<number> = new EventEmitter<number>();


  constructor() {
  }

  ngOnInit(): void {
  }

  onCancelBtnClick(id: number) {
    this.onCancelClick.emit(id);
  }

  getPrice(reservation: DtoInputReservation) {
    const nbNights = dayDif(new Date(reservation.arrivalDate), new Date(reservation.leaveDate));
    return nbNights * reservation.ad.pricePerNight ;
  }
}
