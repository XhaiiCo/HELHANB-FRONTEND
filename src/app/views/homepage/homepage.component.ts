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

  pageLoaded: boolean = false;

  params : any;


  constructor(private _adService : AdService, private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    let currentPage : number = Number(this._route.snapshot.queryParamMap.get('page'));

    if(currentPage) this.index = currentPage;

    this.count();
    this.fetchForPagination();
  }

  count() {

    this.params = this._route.snapshot.queryParamMap;

    this._adService
      .count(this.params)
      .subscribe(count =>
      {
        this.maxPages = Math.ceil(count/this.itemsPerPage);

        if(this.maxPages < this.rulerLength) this.rulerLength = this.maxPages;
      });
  }

  private fetchForPagination() {

    let offset = (this.index - 1) * this.itemsPerPage;

    this._adService
      .fetchForPagination(this.itemsPerPage, offset, this.params)
      .subscribe(ads => {
        this.ads = ads
        this.pageLoaded = true ;
      });
  }

  changePage(event: any)
  {
    this.fetchForPagination();
  }

  changeFilter(event: any)
  {
    this.index = 1;
    this.rulerLength = 5;
    this.count();
    this.fetchForPagination();
  }
}
