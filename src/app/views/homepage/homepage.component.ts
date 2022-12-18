import {Component, OnInit} from '@angular/core';
import {AdService} from "../../services/ad.service";
import {DtoInputAdSummary} from "../../dtos/ad/dto-input-ad-summary";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  private readonly BASE_RULER_LENGTH: number = 5;

  //index and also help calculate the offset
  index: number = 1;

  maxPages: number = 0;

  //will be also the limit that we send in the api
  itemsPerPage: number = 4;

  rulerLength: number = this.BASE_RULER_LENGTH;

  ads: DtoInputAdSummary[] = [];

  pageLoaded: boolean = false;

  params: any;


  constructor(
    private _adService: AdService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      if (params['page'])
        this.index = params['page'];
      else {
        this.index = 1;
        this.rulerLength = this.BASE_RULER_LENGTH;
      }

      this.changeFilter();
    });
  }

  count() {
    this.params = this._route.snapshot.queryParamMap;

    this._adService
      .countForHomePagePagination(this.params)
      .subscribe(count => {
        this.maxPages = Math.ceil(count / this.itemsPerPage);

        if (this.maxPages < this.rulerLength) this.rulerLength = this.maxPages;
      });
  }

  private fetchForPagination() {

    let offset = (this.index - 1) * this.itemsPerPage;

    this._adService
      .fetchForHomePagePagination(this.itemsPerPage, offset, this.params)
      .subscribe(ads => {
        this.ads = ads
        this.pageLoaded = true;
      });
  }

  changePage(event: any) {
    //here for test
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {page: this.index},
      queryParamsHandling: 'merge'
    });
  }

  changeFilter() {
    this.count();
    this.fetchForPagination();
  }
}
