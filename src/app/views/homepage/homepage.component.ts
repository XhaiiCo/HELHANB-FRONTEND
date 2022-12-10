import { Component, OnInit } from '@angular/core';
import {AdService} from "../../services/ad.service";
import {DtoInputAdSummary} from "../../dtos/ad/dto-input-ad-summary";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  //index and also help calculate the offset
  index: number = 1;

  maxPages: number = 0;

  //will be also the limit that we send in the api
  itemsPerPage: number = 4;

  rulerLength: number = 5;

  ads : DtoInputAdSummary[] = [];

  pageLoaded: boolean = false ;

  constructor(private _adService : AdService, private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    this.count();
    this.fetchForPagination();

    console.log(this._route.snapshot.queryParamMap.get('adName'));
  }

  count() {
    this._adService
      .count()
      .subscribe(count =>
      {
        this.maxPages = Math.ceil(count/this.itemsPerPage);

        if(this.maxPages < this.rulerLength) this.rulerLength = this.maxPages;
      });
  }

  private fetchForPagination() {

    let offset = (this.index - 1) * this.itemsPerPage;

    this._adService
      .fetchForPagination(this.itemsPerPage, offset)
      .subscribe(ads => {
        this.ads = ads
        this.pageLoaded = true ;
      });
  }

  changePage(event: any)
  {
    this.fetchForPagination();
  }
}
