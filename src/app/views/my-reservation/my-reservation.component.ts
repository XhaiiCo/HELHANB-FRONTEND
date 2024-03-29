import {Component, OnInit} from '@angular/core';
import {DtoInputReservation} from "../../dtos/reservation/dto-input-reservation";
import {AdService} from "../../services/ad.service";
import {AuthService} from "../../services/auth.service";
import {ModalParams} from "../../interfaces/modal-params";
import {ToastNotificationService} from "../../services/toast-notification.service";

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss']
})
export class MyReservationComponent implements OnInit {

  deleteModalOptions: ModalParams = {
    displayModal: false,
    titleText: "Confirmation d'annulation",
    bodyText: "Êtes-vous sûr de vouloir annuler votre réservation",
  }

  reservationToDelete!: number;

  reservationsList: DtoInputReservation[] = [];
  pageLoaded: boolean = false;

  constructor(
    private _authService: AuthService,
    private _adService: AdService,
    private _toastNotificationService: ToastNotificationService,
  ) {
  }

  ngOnInit(): void {
    if (!this._authService.user) return;

    this._adService.fetchMyReservations().subscribe({

      next: reservations => {
        this.reservationsList = reservations
        this.pageLoaded = true;
      },
      error: err => {
        this.pageLoaded = true;
      }

    });
  }

  getAcceptedReservations(): DtoInputReservation[] {
    return this.reservationsList.filter(item => item.reservationStatus.statusName === "acceptée");
  }

  getRejectedReservation(): DtoInputReservation[] {
    return this.reservationsList.filter(item => item.reservationStatus.statusName === "refusée");
  }

  getPendingReservations(): DtoInputReservation[] {
    return this.reservationsList.filter(item => item.reservationStatus.statusName === "en attente");
  }

  cancelReservationClick(reservationId: number) {
    this.reservationToDelete = reservationId;
    this.deleteModalOptions.displayModal = true;
  }

  removeReservation(reservationId: number) {
    this._adService.removeReservation(reservationId).subscribe({
      next: data => {
        this.reservationsList = this.reservationsList.filter(item => item.id !== data.id);
        this._toastNotificationService.add("Réservation annulée avec succès", "success");
      },
      error: err => {
        this._toastNotificationService.add(err.error, "error");
      }
    })
  }

  onModalDeleteAction(result: boolean) {
    this.deleteModalOptions.displayModal = false;
    if (result) this.removeReservation(this.reservationToDelete);
  }
}
