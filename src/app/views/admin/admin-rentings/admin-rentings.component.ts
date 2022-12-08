import {Component, OnInit} from '@angular/core';
import {DtoInputAd} from "../../../dtos/ad/dto-input-ad";
import {AdService} from "../../../services/ad.service";
import {DeleteModalOptions} from "../../../interfaces/delete-modal-options";
import {ToastNotificationService} from "../../../services/toast-notification.service";

@Component({
  selector: 'app-admin-rentings',
  templateUrl: './admin-rentings.component.html',
  styleUrls: ['./admin-rentings.component.scss']
})
export class AdminRentingsComponent implements OnInit {

  deleteModalOptions: DeleteModalOptions = {
    showDeleteAdConfirmationModal: false,
    titleText: "Confirmation de suppression",
    bodyText: "",
  }

  ads: DtoInputAd[] = [];
  currentAd!: DtoInputAd | null;

  constructor(
    private _adService: AdService,
    private _toastNotificationService: ToastNotificationService,
  ) {
  }

  ngOnInit(): void {
    this._adService.fetchAll().subscribe(ads => this.ads = ads)
  }

  changeCurrentId(ad: DtoInputAd) {
    this.currentAd = ad;
  }

  onDeleteButtonClick() {
    if (!this.currentAd) return;

    this.deleteModalOptions.bodyText = `Êtes vous sûr de vouloir supprimer l'annonce ${this.currentAd.name}`;
    this.deleteModalOptions.showDeleteAdConfirmationModal = true;
  }

  /**
   * If the user clicks the "Yes" button, then delete the ad
   * @param {boolean} isAccepted - boolean - this is the value that is passed from the modal component.
   * @returns the observable of the delete request.
   */
  onModalDeleteAction(isAccepted: boolean) {
    this.deleteModalOptions.showDeleteAdConfirmationModal = false;
    if (!isAccepted) return;
    if (!this.currentAd) return;

    const adSlug: string = this.currentAd.adSlug;

    this._adService.delete(adSlug).subscribe({
      next: removedAd => {
        this._toastNotificationService.add(`${removedAd.name} supprimé avec succès`, "success");
        this.removeAdById(removedAd.adSlug);
      },
      error: err => {
        this._toastNotificationService.add(`Erreur lors de la suppression`, "error");
      }
    });
  }

  removeAdById(adSlug: string): void {
    this.ads = this.ads.filter(item => item.adSlug !== adSlug);

    if (this.currentAd?.adSlug === adSlug) {
      this.currentAd = null;
    }
  }
}
