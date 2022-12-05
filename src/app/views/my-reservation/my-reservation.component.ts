import {Component, OnInit} from '@angular/core';
import {DtoInputReservation} from "../../dtos/ad/dto-input-reservation";
import {AdService} from "../../services/ad.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss']
})
export class MyReservationComponent implements OnInit {

  reservationsList: DtoInputReservation[] = [];

  constructor(
    private _authService: AuthService,
    private _adService: AdService,
  ) {
  }

  ngOnInit(): void {
    if (!this._authService.user) return;

    this._adService.fetchMyReservations(this._authService.user.id).subscribe(
      reservations => this.reservationsList = reservations
    );
  }

}
