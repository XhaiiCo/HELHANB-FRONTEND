import {Component, OnInit} from '@angular/core';
import {DtoInputAd} from "../../../dtos/ad/dto-input-ad";
import {AdService} from "../../../services/ad.service";
import {ModalParams} from "../../../interfaces/modal-params";
import {ToastNotificationService} from "../../../services/toast-notification.service";

@Component({
  selector: 'app-admin-rentings',
  templateUrl: './admin-rentings.component.html',
  styleUrls: ['./admin-rentings.component.scss']
})
export class AdminRentingsComponent implements OnInit {

  private readonly BASE_RULER_LENGTH : number = 5;

  //index and also help calculate the offset
  index: number = 1;

  maxPages: number = 0;

  //will be also the limit that we send in the api
  itemsPerPage: number = 4;

  rulerLength: number = this.BASE_RULER_LENGTH;

  deleteModalOptions: ModalParams = {
    displayModal: false,
    titleText: "Confirmation de suppression",
    bodyText: "",
  }

  ads: DtoInputAd[] = [];
  currentAd!: DtoInputAd | null;

  adName: string = "";

  constructor(
    private _adService: AdService,
    private _toastNotificationService: ToastNotificationService,
  ) {
  }

  ngOnInit(): void {

    this.count();
    this.fetchAds();
  }

  fetchAds()
  {
    let offset = (this.index - 1) * this.itemsPerPage;

    this._adService.fetchForAdminAds(this.itemsPerPage, offset, this.adName)
      .subscribe(ads => this.ads = ads);
  }

  count() {

    this._adService
      .countForAdminAds(this.adName)
      .subscribe(count =>
      {
        this.maxPages = Math.ceil(count/this.itemsPerPage);

        if(this.maxPages < this.rulerLength) this.rulerLength = this.maxPages;
      });
  }

  changeCurrentId(ad: DtoInputAd) {
    this.currentAd = ad;
  }

  onDeleteButtonClick() {
    if (!this.currentAd) return;

    this.deleteModalOptions.bodyText = `Êtes vous sûr de vouloir supprimer l'annonce ${this.currentAd.name}`;
    this.deleteModalOptions.displayModal = true;
  }

  /**
   * If the user clicks the "Yes" button, then delete the ad
   * @param {boolean} isAccepted - boolean - this is the value that is passed from the modal component.
   * @returns the observable of the delete request.
   */
  onModalDeleteAction(isAccepted: boolean) {
    this.deleteModalOptions.displayModal = false;
    if (!isAccepted) return;
    if (!this.currentAd) return;

    const adSlug: string = this.currentAd.adSlug;

    this._adService.delete(adSlug).subscribe({
      next: removedAd => {
        this._toastNotificationService.add(`${removedAd.name} supprimé avec succès`, "success");
        this.removeAdById(removedAd.adSlug);

        this.resetAfterDelete();
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

  changePage(event: any)
  {
    this.fetchAds();
  }

  resetAfterDelete()
  {
    if(this.ads.length == 0)
    {
      this.index--;
      this.rulerLength = this.BASE_RULER_LENGTH;
    }
    this.count();
    this.fetchAds();
  }

  search(adName: string) {
    this.index = 1;
    this.rulerLength = this.BASE_RULER_LENGTH;
    this.adName = adName;

    this.count();
    this.fetchAds();
  }
}
