import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AdService} from "../../services/ad.service";
import {DtoInputMyAds} from "../../dtos/ad/dto-input-my-ads";

@Component({
  selector: 'app-my-renting',
  templateUrl: './my-renting.component.html',
  styleUrls: ['./my-renting.component.scss']
})
export class MyRentingComponent implements OnInit {

  ads: DtoInputMyAds[] = [];
  currentAd!: DtoInputMyAds;
  pageLoaded: boolean = false;

  constructor(private _authService: AuthService, private _adService: AdService) {
  }

  ngOnInit(): void {
    if (this._authService.user) {
      this._adService.fetchMyAds().subscribe({
        next: ads => {
          this.ads = ads;

          for (let ad of this.ads) {
            ad.picturesToAdd = [];
            ad.picturesToDelete = [];
          }

          this.pageLoaded = true;
        },
        error: error => {
          this.pageLoaded = true;
        }
      })
    }
  }

  changeCurrentAd(ad: DtoInputMyAds) {
    this.currentAd = ad;
  }

}
