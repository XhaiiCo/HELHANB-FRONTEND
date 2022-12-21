import {Component, OnInit} from '@angular/core';
import {AdService} from 'src/app/services/ad.service';
import {DtoInputAd} from "../../../dtos/ad/dto-input-ad";
import {ToastNotificationService} from "../../../services/toast-notification.service";

@Component({
  selector: 'app-ad-to-validate',
  templateUrl: './ad-to-validate.component.html',
  styleUrls: ['./ad-to-validate.component.scss']
})
export class AdToValidateComponent implements OnInit {

  private readonly BASE_RULER_LENGTH : number = 5;

  //index and also help calculate the offset
  index: number = 1;

  maxPages: number = 0;

  //will be also the limit that we send in the api
  itemsPerPage: number = 4;

  rulerLength: number = this.BASE_RULER_LENGTH;

  ads: DtoInputAd[] = [];
  currentAd!: DtoInputAd | null;

  adName: string = "";

  constructor(private _adService: AdService, private _toastService: ToastNotificationService) {
  }

  ngOnInit(): void {
    this.count();
    this.fetchAds();
  }

  count() {

    this._adService
      .countForAdminAdsToValidate(this.adName)
      .subscribe(count =>
      {
        this.maxPages = Math.ceil(count/this.itemsPerPage);

        if(this.maxPages < this.rulerLength) this.rulerLength = this.maxPages;

        console.log(this.maxPages);
      });
  }

  fetchAds()
  {
    let offset = (this.index - 1) * this.itemsPerPage;

    this._adService.fetchForAdminAdsToValidate(this.itemsPerPage, offset, this.adName)
      .subscribe((ads) => {this.ads = ads; console.log(this.ads)});
  }

  changeCurrentId(ad: DtoInputAd) {
    this.currentAd = ad;
  }

  removeCurrentAd() {
    if (!this.currentAd) return;

    if (this.currentAd) {
      this.ads = this.ads.filter(ad => ad.adSlug !== this.currentAd?.adSlug);
      if (this.ads.length > 0) {
        this.currentAd = this.ads[0];
      } else {
        this.currentAd = null;
      }
    }
  }

  validCurrentAd() {
    if (!this.currentAd) return;
    this._adService.updateStatus({adSlug: this.currentAd?.adSlug, statusId: 3}).subscribe(ad => {
      this.removeCurrentAd();
      this._toastService.add("Annonce validée", "success");
      this.reset();
    });

  }

  rejectCurrentAd() {
    if (!this.currentAd) return;
    this._adService.updateStatus({adSlug: this.currentAd?.adSlug, statusId: 2}).subscribe(ad => {
        this.removeCurrentAd();
        this._toastService.add("Annonce refusée", "sucess");
        this.reset();
    });

  }

  changePage(event: any)
  {
    this.fetchAds();
  }

  reset()
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
