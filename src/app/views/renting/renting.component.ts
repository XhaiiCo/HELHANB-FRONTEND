import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AdService} from "../../services/ad.service";
import {DtoOutputNewReservation} from "../../dtos/reservation/dto-output-new-reservation";
import {AuthService} from "../../services/auth.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {ConversationService} from "../../services/conversation.service";
import {DtoInputAdWithReservation} from "../../dtos/ad/dto-input-ad-with-reservation";
import {DateService} from "../../services/date.service";

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

  ad!: DtoInputAdWithReservation;

  dates!: { arrival: Date, leave: Date };

  disableReservationBtn: boolean = false;
  reservedDates: Date[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _adService: AdService,
    private _router: Router,
    private _authService: AuthService,
    private _toastNotification: ToastNotificationService,
    private _conversationService: ConversationService,
    private _dateService: DateService,
  ) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(args => {
      if (args.has("slug")) {
        this.fetchAdBySlug(args.get("slug")!);
      } else {
        this._router.navigate(['/404']);
      }
    });
  }

  private fetchAdBySlug(slug: string) {
    this._adService
      .fetchBySlug(slug)
      .subscribe({
        next: ad => {
          this.ad = ad;

          //map pour recup les noms d images
          this.images = this.ad.pictures.map(item => item.path);
          this.ad.arrivalTimeRangeStart = this.formatTime(this.ad.arrivalTimeRangeStart);
          this.ad.arrivalTimeRangeEnd = this.formatTime(this.ad.arrivalTimeRangeEnd);
          this.ad.leaveTime = this.formatTime(this.ad.leaveTime);

          this.pageLoaded = true;
          this.setReservedDate();
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
    this.disableReservationBtn = true;

    if (!this._authService.user) {
      this._toastNotification.add("Veuillez vous connecter", "error");
      this.disableReservationBtn = false;
      return;
    }

    const dto: DtoOutputNewReservation = {
      adSlug: this.ad.adSlug,
      arrivalDate: this.toDtoOutputDate(this.dates.arrival),
      leaveDate: this.toDtoOutputDate(this.dates.leave),
    }

    this._adService.createReservation(dto).subscribe({
      next: result => {
        this._toastNotification.add("Demanded de réservation envoyée", "success");
        this.disableReservationBtn = false;
      },
      error: err => {
        this._toastNotification.add(err.error, "error");
        this.disableReservationBtn = false;
      }
    });
  }

  toDtoOutputDate(date: Date) {
    const dateObj: Date = new Date(date.toString());
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

  contactHost() {
    if (this._authService.user == null) {
      this._toastNotification.add("Il faut être connecté pour contacter un hôte", "error");
      return;
    }

    this._conversationService.redirectToTheConversationPage(this._authService.user.id, this.ad.owner.id)
  }

  dateChange(range: FormGroup) {
    this.setDate(range);
  }

  setReservedDate() {
    let result: Date[] = [];

    this.ad.reservations.forEach(reservation => {
      let tmpResult: Date[] = [];
      tmpResult.push(...this._dateService.getDatesBetween(reservation.arrivalDate, reservation.leaveDate));
      tmpResult.shift();
      result.push(...tmpResult);
    });

    // Si une date est seule on ne peut pas la sélectionner
    let tmpResult: Date[] = [];
    result.forEach(d => {
      let oneDayNext = new Date(new Date().setDate(d.getDate() + 1)).toDateString();
      let twoDayNext = new Date(new Date().setDate(d.getDate() + 2)).toDateString();

      if (result.find(e => e.toDateString() !== oneDayNext))
        if (result.find(e => e.toDateString() === twoDayNext))
          tmpResult.push(new Date(oneDayNext));
    });
    result.push(...tmpResult);

    this.reservedDates = result;
  }
}
