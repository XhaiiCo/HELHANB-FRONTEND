import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { environment } from 'src/environments/environment';
import {DtoInputAdReservation} from "../../../../dtos/ad/dto-input-my-ads";
import {DateService} from "../../../../services/date.service";

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
  @Output() onContactUserBtnClickEvent: EventEmitter<number> = new EventEmitter<number>();

  pictureBaseUrl: string = environment.pictureUrl ;

  @Input() currentClickedReservation: boolean = false;

  constructor(
    public dateService: DateService,
  ) {
  }

  ngOnInit(): void {
  }

  onRefusalBtnClick(): void {
    this.onRefusalBtnClickEvent.next(this.reservation) ;
  }

  onConfirmationBtnClick(): void {
    this.onConfirmationBtnClickEvent.next(this.reservation) ;
  }

  onContactUserBtnClick(): void{
    this.onContactUserBtnClickEvent.next(this.reservation.renterMyAds.id) ;
  }
}
