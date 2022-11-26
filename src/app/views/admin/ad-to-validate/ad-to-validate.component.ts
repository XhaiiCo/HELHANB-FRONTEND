import { Component, OnInit } from '@angular/core';
import { AdService } from 'src/app/services/ad.service';
import {DtoInputAdPending} from "../../../dtos/ad/dto-input-ad-pending";

@Component({
  selector: 'app-ad-to-validate',
  templateUrl: './ad-to-validate.component.html',
  styleUrls: ['./ad-to-validate.component.scss']
})
export class AdToValidateComponent implements OnInit {

  ads: DtoInputAdPending[] = [] ;
  currentAd!: DtoInputAdPending ;

  constructor(private _adService: AdService) { }

  ngOnInit(): void {
    this._adService.fetchAllPendings().subscribe((ads)  => this.ads = ads) ;
  }

  changeCurrentId(ad: DtoInputAdPending) {
    this.currentAd = ad ;
  }
}
