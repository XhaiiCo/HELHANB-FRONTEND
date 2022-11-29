import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdService} from "../../services/ad.service";
import {DtoAd} from "../../dtos/ad/dto-ad";
import {DtoOutputNewReservation} from "../../dtos/ad/dto-output-new-reservation";
import {AuthService} from "../../services/auth.service";
import {ToastNotificationService} from "../../services/toast-notification.service";

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

  dates!: { arrival: Date, leave: Date };

  disableReservationBtn: boolean = false ;

  constructor(private _route: ActivatedRoute,
              private _adService: AdService,
              private _router: Router,
              private _authService: AuthService,
              private _toastNotification: ToastNotificationService) {
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

      this.dates = {
        arrival: range.get("start")?.value,
        leave: range.get("end")?.value,
      }

    } else {
      this.nbNights = 0;
    }
  }

  submit() {
    this.disableReservationBtn = true ;

    if (!this._authService.user) {
      this._toastNotification.add("Veuillez vous connecter", "error") ;
      this.disableReservationBtn = false ;
      return ;
    }

    const dto: DtoOutputNewReservation = {
      renterId: this._authService.user?.id,
      arrivalDate: this.toDtoOutputDate(this.dates.arrival),
      leaveDate: this.toDtoOutputDate(this.dates.leave),
    }

    this._adService.createReservation(this.ad.id, dto).subscribe({
      next: result => {
        this._toastNotification.add("Demanded de réservation envoyée", "success") ;
        this.disableReservationBtn = false ;
      },
      error: err => {
        this._toastNotification.add(err.error, "error") ;
        this.disableReservationBtn = false ;
      }

    });
  }

  toDtoOutputDate(date: Date) {
    const dateObj: Date = new Date(date.toString()) ;
    return {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth() + 1,
      day: dateObj.getDate(),
    };
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
