import {Component, OnInit} from '@angular/core';
import {Time} from "@angular/common";
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdService} from "../../services/ad.service";
import {DtoAd} from "../../dtos/ad/dto-ad";

const dayDif = (date1: Date, date2: Date) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

@Component({
  selector: 'app-renting',
  templateUrl: './renting.component.html',
  styleUrls: ['./renting.component.scss']
})
export class RentingComponent implements OnInit {

  pageLoaded: boolean = false;

  pictureBaseUri: string = environment.pictureUrl;

  nbNights: number = 0;

  images: string[] = []

  displayAllFeatures: boolean = false;

  ad!: DtoAd;

  constructor(private _route: ActivatedRoute,
              private _adService: AdService,
              private _router: Router) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(args => {

      if (args.has("id")) {
        this.fetchAdById(Number(args.get("id")));
      } else {
        this._router.navigate(['/404']);
      }
    });
  }

  private fetchAdById(id: number) {
    this._adService
      .fetchById(id)
      .subscribe({
        next: ad => {
          this.ad = ad;

          //map pour recup les noms d images
          this.images = this.ad.pictures.map(item => item.path);
          this.ad.arrivalTimeRangeStart = this.formatTime(this.ad.arrivalTimeRangeStart);
          this.ad.arrivalTimeRangeEnd = this.formatTime(this.ad.arrivalTimeRangeEnd);
          this.ad.leaveTime = this.formatTime(this.ad.leaveTime);

          this.pageLoaded = true;
        },
        error: err => {
          this._router.navigate(['/404']);
        }
      });
  }

  formatTime(time: string) {
    return time
      .substring(0, 5)
      .replace(':', 'h');
  }

  setDate(range: FormGroup) {
    if (range.valid) {
      this.nbNights = dayDif(range.controls['start'].value._d, range.controls['end'].value._d);
    } else {
      this.nbNights = 0;
    }
  }

  submit() {

  }

  showListFeatures() {
    this.displayAllFeatures = true;
  }

  closeListFeatures() {
    this.displayAllFeatures = false;
  }

  // Called when the contact button is triggered
  contactHost() {

  }

  dateChange(range: FormGroup) {
    this.setDate(range);
  }
}
