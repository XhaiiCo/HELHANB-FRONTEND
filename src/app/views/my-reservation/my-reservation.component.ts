import {Component, OnInit} from '@angular/core';
import {DtoInputReservation} from "../../dtos/reservation/dto-input-reservation";
import {AdService} from "../../services/ad.service";
import {AuthService} from "../../services/auth.service";
import {DeleteModalOptions} from "../../interfaces/delete-modal-options";
import {ToastNotificationService} from "../../services/toast-notification.service";

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss']
})
export class MyReservationComponent implements OnInit {

  deleteModalOptions: DeleteModalOptions = {
    showDeleteAdConfirmationModal: false,
    titleText: "Confirmation d'annulation",
    bodyText: "Êtes-vous sûr de vouloir annuler votre réservation",
  }

  reservationToDelete!: number;

  reservationsList: DtoInputReservation[] = [];

  constructor(
    private _authService: AuthService,
    private _adService: AdService,
    private _toastNotificationService: ToastNotificationService,
  ) {
  }

  ngOnInit(): void {
    if (!this._authService.user) return;

    this._adService.fetchMyReservations().subscribe(
      reservations => this.reservationsList = reservations
    );
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
    this.deleteModalOptions.showDeleteAdConfirmationModal = true;
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
    this.deleteModalOptions.showDeleteAdConfirmationModal = false;
    if (result) this.removeReservation(this.reservationToDelete);
  }
}
