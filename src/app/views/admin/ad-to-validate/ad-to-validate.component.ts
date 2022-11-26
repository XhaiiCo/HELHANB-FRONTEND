import {Component, OnInit} from '@angular/core';
import {AdService} from 'src/app/services/ad.service';
import {DtoInputAdPending} from "../../../dtos/ad/dto-input-ad-pending";
import {ToastNotificationService} from "../../../services/toast-notification.service";

@Component({
  selector: 'app-ad-to-validate',
  templateUrl: './ad-to-validate.component.html',
  styleUrls: ['./ad-to-validate.component.scss']
})
export class AdToValidateComponent implements OnInit {

  ads: DtoInputAdPending[] = [];
  currentAd!: DtoInputAdPending | null;

  constructor(private _adService: AdService, private _toastService: ToastNotificationService) {
  }

  ngOnInit(): void {
    this._adService.fetchAllPendings().subscribe((ads) => this.ads = ads);
  }

  changeCurrentId(ad: DtoInputAdPending) {
    this.currentAd = ad;
  }

  removeCurrentAd() {
    if (!this.currentAd) return;

    if (this.currentAd) {
      this.ads = this.ads.filter(ad => ad.id !== this.currentAd?.id);
      if (this.ads.length > 0) {
        this.currentAd = this.ads[0];
      } else {
        this.currentAd = null;
      }
    }
  }

  validCurrentAd() {
    if (!this.currentAd) return;
    this._adService.updateStatus({id: this.currentAd?.id, statusId: 3}).subscribe((ad) => {
      this.removeCurrentAd();
      this._toastService.add("Annonce validée", "success");
    });
  }

  rejectCurrentAd() {
    if (!this.currentAd) return;
    this._adService.updateStatus({id: this.currentAd?.id, statusId: 2}).subscribe((ad) => {
        this.removeCurrentAd();
        this._toastService.add("Annonce refusée", "sucess");
      });
    }
  }
