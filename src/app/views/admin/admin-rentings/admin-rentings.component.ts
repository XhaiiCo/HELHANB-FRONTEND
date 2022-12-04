import {Component, OnInit} from '@angular/core';
import {DtoInputAd} from "../../../dtos/ad/dto-input-ad";
import {AdService} from "../../../services/ad.service";

@Component({
  selector: 'app-admin-rentings',
  templateUrl: './admin-rentings.component.html',
  styleUrls: ['./admin-rentings.component.scss']
})
export class AdminRentingsComponent implements OnInit {

  ads: DtoInputAd[] = [];
  currentAd!: DtoInputAd | null;

  constructor(private _adService: AdService) {
  }

  ngOnInit(): void {
    this._adService.fetchAll().subscribe(ads => this.ads = ads)
  }

  changeCurrentId(ad: DtoInputAd) {
    this.currentAd = ad;
  }

}
