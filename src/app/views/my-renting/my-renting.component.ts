import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AdService} from "../../services/ad.service";
import {DtoInputMyAds} from "../../dtos/ad/dto-input-my-ads";
import {ImgData} from "../../interfaces/img-data";
import {MyAdComponent} from "./my-ad/my-ad.component";

@Component({
  selector: 'app-my-renting',
  templateUrl: './my-renting.component.html',
  styleUrls: ['./my-renting.component.scss']
})
export class MyRentingComponent implements OnInit {

  ads: DtoInputMyAds[] = [] ;
  currentAd!: DtoInputMyAds ;

  constructor(private _authService: AuthService, private _adService: AdService) { }

  ngOnInit(): void {
    if(this._authService.user){
      this._adService.fetchMyAds(this._authService.user.id).subscribe( ads => {
        this.ads = ads;

        for(let ad of this.ads)
        {
          ad.picturesToAdd = [];
          ad.picturesToDelete = [];
          ad.nbImg = ad.pictures.length;
        }
      })
    }
  }

  changeCurrentAd(ad: DtoInputMyAds)
  {
    this.currentAd = ad;
  }
}
