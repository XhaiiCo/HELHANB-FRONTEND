import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {AdService} from "../../../services/ad.service";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {DtoInputAdReservation} from "../../../dtos/ad/dto-input-my-ads";

@Component({
  selector: 'app-my-ad-reservations-to-confirm-list',
  templateUrl: './my-ad-reservations-to-confirm-list.component.html',
  styleUrls: ['./my-ad-reservations-to-confirm-list.component.scss']
})
export class MyAdReservationsToConfirmListComponent implements OnInit {

  @Input() inputRes!: DtoInputAdReservation[];
  reservations!: DtoInputAdReservation[];

  conflictsMap: [{ key: DtoInputAdReservation, val: DtoInputAdReservation[] } | null ] = [ null ];
  conflictsListToDisplay: DtoInputAdReservation[] = [];
  clickedReservation: DtoInputAdReservation | null = null;

  ascendingOrder: boolean = true;
  sortIndex: string = "0";

  displayConfirmationForm: boolean = false;
  displayRefusalForm: boolean = false;

  reservationToDecline: DtoInputAdReservation | null = null;
  reservationToConfirm: DtoInputAdReservation | null = null;

  constructor(private _adService: AdService, private _toastNotification: ToastNotificationService) {}

  ngOnInit(): void {
    this.reservations = this.inputRes;
    this.reservations.forEach(function(e) {
      e.renterMyAds.profilePicturePath = environment.pictureUrl + e.renterMyAds.profilePicturePath;
    });
    this.sortReservation();
    this.setConflictsList();
  }

  dtoObjectToDateFR(date: Date) {
    let d = new Date(date);
    return d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
  }

  dtoObjectToDateUS(date: Date) {
    let d = new Date(date);
    return (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
  }

  nbDaysBetweenDates(startDate: Date, endDate: Date) {
    startDate = new Date(startDate)
    endDate = new Date(endDate);
    let d1 = startDate.getFullYear() + "-" + startDate.getMonth() + "-" + startDate.getDate();
    let d2 = endDate.getFullYear() + "-" + endDate.getMonth() + "-" + endDate.getDate();
    let diffInMs = new Date(d2).getTime() - new Date(d1).getTime();
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
  }

  // Calcul le nombre de conflits avec la reservation passée en argument
  setConflictsList() {
    let conflictsMap: any = [];

    // Pour chaque élément dans toutes les réservations
    for (let reservationI of this.reservations) {
      let reservationIConflictsList: DtoInputAdReservation[] = [];
      // Pour chaque élément dans toutes les réservations
      for (let reservationJ of this.reservations) {
        // S'ils sont différents
        if (reservationJ !== reservationI) {
          // pour chaque date entre la date d'arrivée et la date de départ -1 de reservationI
          loop : for (let reservationIDate of this.getDatesList(reservationI.arrivalDate, reservationI.leaveDate)) {
            // pour chaque date entre la date d'arrivée et la date de départ -1 de reservationJ
            for (let reservationJDate of this.getDatesList(reservationJ.arrivalDate, reservationJ.leaveDate)) {
              // si c'est la même date
              if (reservationIDate.getTime() === reservationJDate.getTime()) {
                reservationIConflictsList.push(reservationJ);
                break loop;
              }
            }
          }
        }
      }
      conflictsMap.push({key: reservationI, val: reservationIConflictsList});
    }

    this.conflictsMap = conflictsMap;
  }

  // Récupère une liste de dates getDate(1 janvier, 5 janvier) renvoi [1, 2, 3, 4] car on compte pas le jour où il part
  getDatesList(arrivalDate: Date, leaveDate: Date) {
    arrivalDate = new Date(arrivalDate);
    leaveDate = new Date(leaveDate);
    let datesList: Date[] = [];
    let currDate = new Date(arrivalDate.toDateString());

    do {
      datesList.push(currDate);
      currDate = new Date(currDate.getTime() + 86400000);
    } while (currDate.toDateString() !==
      leaveDate.toDateString());
    return datesList;
  }

  getConflictsOfReservation(reservation: DtoInputAdReservation) {
    let arr = this.conflictsMap.find(e => e?.key === reservation)?.val;
    if (arr !== undefined)
      return arr;
    else {
      let emptyArr: DtoInputAdReservation[] = [];
      return emptyArr;
    }
  }

  nbConflicts(reservation: DtoInputAdReservation) {
    let nb = this.conflictsMap.find(e => e?.key === reservation)?.val.length;
    return (nb !== undefined) ? nb : 0;
  }

  displayConflicts(reservation?: DtoInputAdReservation) {
    if (reservation !== undefined) {
      this.conflictsListToDisplay = this.getConflictsOfReservation(reservation);
    } else {
      if (this.clickedReservation !== null) {
        this.conflictsListToDisplay = this.getConflictsOfReservation(this.clickedReservation);
      } else {
        this.conflictsListToDisplay = [];
      }
    }

    this.sortConflicts();
  }

  reservationClicked(reservation: DtoInputAdReservation) {
    if (this.clickedReservation != reservation)
      this.clickedReservation = reservation;
    else
      this.clickedReservation = null;
  }

  setSortOrder(e: any) {
    this.ascendingOrder = e.value === "0";
    this.sortAll();
  }

  sortAll(e?: any) {
    console.log(this.reservations);
    if (e)
      this.sortIndex = e.value;

    this.sortReservation();
    this.sortConflicts();
    console.log(this.reservations);
  }

  sortReservation() {
    switch (this.sortIndex) {
      case "0": // nom de famille
        this.reservations.sort(function(a, b) {
          return a.renterMyAds.lastName === b.renterMyAds.lastName ? 0 : a.renterMyAds.lastName < b.renterMyAds.lastName ? -1 : 1;
        });
        break;

      case "1" : // date de la réservation
        this.reservations.sort((a, b) => {
          return new Date(this.dtoObjectToDateUS(a.creation)).getTime() - new Date(this.dtoObjectToDateUS(b.creation)).getTime();
        });
        break;

      case "2" : // durée du séjour
        this.reservations.sort((a, b) => {
          return this.nbDaysBetweenDates(a.arrivalDate, a.leaveDate) - this.nbDaysBetweenDates(b.arrivalDate, b.leaveDate);
        });
        break;

      case "3" : // nb conflits
        this.reservations.sort((a, b) => {
          return this.nbConflicts(a) - this.nbConflicts(b);
        });
        break;

      default:
        break;
    }

    if (!this.ascendingOrder)
      this.reservations.reverse();
  }

  sortConflicts() {
    switch (this.sortIndex) {
      case "0":
        this.conflictsListToDisplay.sort(function(a, b) {
          return a.renterMyAds.lastName === b.renterMyAds.lastName ? 0 : a.renterMyAds.lastName < b.renterMyAds.lastName ? -1 : 1;
        });
        break;

      case "1" :
        this.conflictsListToDisplay.sort((a, b) => {
          return new Date(this.dtoObjectToDateUS(a.creation)).getTime() - new Date(this.dtoObjectToDateUS(b.creation)).getTime();
        });
        break;

      case "2" :
        this.conflictsListToDisplay.sort((a, b) => {
          return this.nbDaysBetweenDates(a.arrivalDate, a.leaveDate) - this.nbDaysBetweenDates(b.arrivalDate, b.leaveDate);
        });
        break;

      case "3" :
        this.conflictsListToDisplay.sort((a, b) => {
          return this.nbConflicts(a) - this.nbConflicts(b);
        });
        break;

      default:
        break;
    }

    if (!this.ascendingOrder)
      this.conflictsListToDisplay.reverse();
  }

  displayConfirmation(reservation: DtoInputAdReservation) {
    this.displayConfirmationForm = true;
    this.reservationToConfirm = reservation;
  }

  displayRefusal(reservation: DtoInputAdReservation) {
    this.displayRefusalForm = true;
    this.reservationToDecline = reservation;
  }

  cancelConfirmation() {
    this.displayConfirmationForm = false;
    this.reservationToConfirm = null
  }

  cancelRefusal() {
    this.displayRefusalForm = false;
    this.reservationToDecline = null;
  }

  authorizeReservation() {
  }

  declineReservation() {
    if (!this.reservationToDecline) return;

    this._adService.refuseReservation(this.reservationToDecline).subscribe(result => {
      this.displayRefusalForm = false;
      this.reservationToDecline = null;
      this.clickedReservation = null;

      this._toastNotification.add(
        "La réservation de " + result.renterMyAds.lastName + " " + result.renterMyAds.firstName + " a été refusée avec succès",
        "success"
      );
    });
  }
}
