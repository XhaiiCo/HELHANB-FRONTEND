import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputReservation} from "../../../dtos/reservation/dto-input-reservation";
import {environment} from "../../../../environments/environment";

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
  @Output() onCancelClick: EventEmitter<number> = new EventEmitter<number>() ;

  constructor() {
  }

  ngOnInit(): void {
  }

  onCancelBtnClick(id: number){
    this.onCancelClick.emit(id) ;
  }

}
