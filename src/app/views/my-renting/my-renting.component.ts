import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AdService} from "../../services/ad.service";
import {DtoInputAdReservation, DtoInputMyAds} from "../../dtos/ad/dto-input-my-ads";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {environment} from "../../../environments/environment";
import {MyAdComponent} from "./my-ad/my-ad.component";

@Component({
  selector: 'app-my-renting',
  templateUrl: './my-renting.component.html',
  styleUrls: ['./my-renting.component.scss']
})
export class MyRentingComponent implements OnInit {

  ads: DtoInputMyAds[] = [];
  currentAd!: DtoInputMyAds;
  pageLoaded: boolean = false;

  constructor(private _authService: AuthService, private _adService: AdService, private _toastNotification: ToastNotificationService) {
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

  confirmedReservationMethod(reservations: { confirmed: DtoInputAdReservation, declined?: DtoInputAdReservation[] }) {

    this._adService.confirmReservation(reservations.confirmed).subscribe(result => {
      result.renterMyAds.profilePicturePath = environment.pictureUrl + result.renterMyAds.profilePicturePath;

      let adIndex = this.ads.findIndex(e => e.adSlug == reservations.confirmed.adSlug);
      this.ads[adIndex].reservations.splice(this.ads[adIndex].reservations.indexOf(reservations.confirmed), 1, result);

      reservations.declined?.forEach(e => {
        let e_ = e;
        e_.statusMyAds = {
          id: 2,
          statusName: "refusée"
        };
        this.ads[adIndex].reservations.splice(this.ads[adIndex].reservations.indexOf(e), 1, e_);
      });

      this._toastNotification.add(
        `La réservation de ${result.renterMyAds.lastName} ${result.renterMyAds.firstName} a été acceptée avec succès`,
        "success"
      );
    });
  }

  declinedReservationMethod(reservation: DtoInputAdReservation) {
    this._adService.refuseReservation(reservation).subscribe(result => {
      result.renterMyAds.profilePicturePath = environment.pictureUrl + result.renterMyAds.profilePicturePath;

      let adIndex = this.ads.findIndex(e => e.adSlug == reservation.adSlug);
      this.ads[adIndex].reservations.splice(this.ads[adIndex].reservations.indexOf(reservation), 1, result);

      this._toastNotification.add(
        "La réservation de " + result.renterMyAds.lastName + " " + result.renterMyAds.firstName + " a été refusée avec succès",
        "success"
      );
    });
  }
}
