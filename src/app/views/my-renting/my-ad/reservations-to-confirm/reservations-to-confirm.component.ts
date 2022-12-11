import {Component, Input, OnInit} from '@angular/core';
import {DtoInputUserReservation, DtoOuputDate} from "../../../../dtos/user/dto-input-user-reservation";
import {environment} from "../../../../../environments/environment";
import {AdService} from "../../../../services/ad.service";
import {ToastNotificationService} from "../../../../services/toast-notification.service";

@Component({
  selector: 'app-reservations-to-confirm',
  templateUrl: './reservations-to-confirm.component.html',
  styleUrls: ['./reservations-to-confirm.component.scss']
})
export class ReservationsToConfirmComponent implements OnInit {
  @Input() adSlug!: string;

  reservations: DtoInputUserReservation[] = [{
      arrivalDate: {year:0,month:0,day:0},
      firstName: "",
      id: -1,
      lastName: "",
      leaveDate: {year:0,month:0,day:0},
      profilePicturePath: null,
      renterId: -1,
      reservationDate: {year:0,month:0,day:0}
    }
  ];

  conflictsMap: [{ key: DtoInputUserReservation, val: DtoInputUserReservation[] } | null] = [ null ];
  conflictsListToDisplay: DtoInputUserReservation[] = [];
  clickedReservation: DtoInputUserReservation | null = null;
  ascendingOrder: boolean = true;
  sortIndex: string = "0";
  displayConfirmationForm: boolean = false;
  displayRefusalForm: boolean = false;
  reservationToDecline: DtoInputUserReservation = {
    arrivalDate: {year:0,month:0,day:0},
    firstName: "",
    id: -1,
    lastName: "",
    leaveDate: {year:0,month:0,day:0},
    profilePicturePath: null,
    renterId: -1,
    reservationDate: {year:0,month:0,day:0}
  };
  reservationToConfirm: DtoInputUserReservation = {
    arrivalDate: {year:0,month:0,day:0},
    firstName: "",
    id: -1,
    lastName: "",
    leaveDate: {year:0,month:0,day:0},
    profilePicturePath: null,
    renterId: -1,
    reservationDate: {year:0,month:0,day:0}
  };

  constructor(private _adService: AdService, private _toastNotification: ToastNotificationService) {}

  ngOnInit(): void {
    this._adService.fetchAllReservationToConfirm(this.adSlug).subscribe(result => {
      this.reservations = result;

      this.reservations.forEach(function(e) {
        e.profilePicturePath = environment.pictureUrl + e.profilePicturePath;
      });

      this.reservations.sort(function(a, b) {
        return a.lastName === b.lastName ? 0 : a.lastName < b.lastName ? -1 : 1;
      });

      this.setConflictsList();
    });
  }

  dtoObjectToDateFR(dtoDate: DtoOuputDate) {
    return dtoDate.day + "/" + dtoDate.month + "/" + dtoDate.year;
  }

  dtoObjectToDateUS(dtoDate: DtoOuputDate) {
    return dtoDate.month + "/" + dtoDate.day + "/" + dtoDate.year;
  }

  nbDaysBetweenDates(startDate: DtoOuputDate, endDate: DtoOuputDate) {
    let d1 = startDate.year + "-" + startDate.month + "-" + startDate.day;
    let d2 = endDate.year + "-" + endDate.month + "-" + endDate.day;
    let diffInMs = new Date(d2).getTime() - new Date(d1).getTime();
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
  }

  // Calcul le nombre de conflits avec la reservation passée en argument
  setConflictsList() {
    let conflictsMap: any = [];

    // Pour chaque élément dans toutes les réservations
    for (let reservationI of this.reservations) {
      let reservationIConflictsList: DtoInputUserReservation[] = [];
      // Pour chaque élément dans toutes les réservations
      for (let reservationJ of this.reservations) {
        // S'ils sont différents
        if (reservationJ !== reservationI) {
          // list des conflits de reservationI

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
  getDatesList(arrivalDate: DtoOuputDate, leaveDate: DtoOuputDate) {
    let datesList: Date[] = [];
    let currDate = new Date(this.dtoObjectToDateUS(arrivalDate));

    do {
      datesList.push(currDate);
      currDate = new Date(currDate.getTime() + 86400000);
    } while (currDate.getTime() !==
      new Date(this.dtoObjectToDateUS(leaveDate)).getTime());

    return datesList;
  }

  getConflictsOfReservation(reservation: DtoInputUserReservation) {
    let arr = this.conflictsMap.find(e => e?.key === reservation)?.val;
    if (arr !== undefined)
      return arr;
    else
      return [];
  }

  nbConflicts(reservation: DtoInputUserReservation) {
    let nb = this.conflictsMap.find(e => e?.key === reservation)?.val.length;
    return (nb !== undefined) ? nb : 0;
  }

  displayConflicts(reservation?: DtoInputUserReservation) {
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

    if (!this.ascendingOrder)
      this.conflictsListToDisplay.reverse();
  }

  reservationClicked(reservation: DtoInputUserReservation) {
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
    if (e)
      this.sortIndex = e.value;

    this.sortReservation();
    this.sortConflicts();

    if (!this.ascendingOrder)
      this.reservations.reverse()
  }

  sortReservation() {
    switch (this.sortIndex) {
      case "0":
        this.reservations.sort(function(a, b) {
          return a.lastName === b.lastName ? 0 : a.lastName < b.lastName ? -1 : 1;
        });
        break;

      case "1" :
        this.reservations.sort((a, b) => {
          return new Date(this.dtoObjectToDateUS(a.reservationDate)).getTime() - new Date(this.dtoObjectToDateUS(b.reservationDate)).getTime();
        });
        break;

      case "2" :
        this.reservations.sort((a, b) => {
          return this.nbDaysBetweenDates(a.arrivalDate, a.leaveDate) - this.nbDaysBetweenDates(b.arrivalDate, b.leaveDate);
        });
        break;

      case "3" :
        this.reservations.sort((a, b) => {
          return this.nbConflicts(a) - this.nbConflicts(b);
        });
        break;

      default:
        break;
    }
  }

  sortConflicts() {
    switch (this.sortIndex) {
      case "0":
        this.conflictsListToDisplay.sort(function(a, b) {
          return a.lastName === b.lastName ? 0 : a.lastName < b.lastName ? -1 : 1;
        });
        break;

      case "1" :
        this.conflictsListToDisplay.sort((a, b) => {
          return new Date(this.dtoObjectToDateUS(a.reservationDate)).getTime() - new Date(this.dtoObjectToDateUS(b.reservationDate)).getTime();
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
  }

  displayConfirmation(reservation: DtoInputUserReservation) {
    this.displayConfirmationForm = true;
    this.reservationToConfirm = reservation;
  }

  displayRefusal(reservation: DtoInputUserReservation) {
    this.displayRefusalForm = true;
    this.reservationToDecline = reservation;
  }

  cancelConfirmation() {
    this.displayConfirmationForm = false;
    this.reservationToConfirm = {
      arrivalDate: {year:0,month:0,day:0},
      firstName: "",
      id: -1,
      lastName: "",
      leaveDate: {year:0,month:0,day:0},
      profilePicturePath: "",
      renterId: 0,
      reservationDate: {year:0,month:0,day:0}
    };
  }

  cancelRefusal() {
    this.displayRefusalForm = false;
    this.reservationToDecline = {
      arrivalDate: {year:0,month:0,day:0},
      firstName: "",
      id: -1,
      lastName: "",
      leaveDate: {year:0,month:0,day:0},
      profilePicturePath: "",
      renterId: 0,
      reservationDate: {year:0,month:0,day:0}
    };
  }

  authorizeReservation() {
  }

  declineReservation() {
    this._adService.removeReservation(this.reservationToDecline.id).subscribe(result => {
      this.displayRefusalForm = false;
      this.reservationToDecline = {
        arrivalDate: {year:0,month:0,day:0},
        firstName: "",
        id: -1,
        lastName: "",
        leaveDate: {year:0,month:0,day:0},
        profilePicturePath: "",
        renterId: 0,
        reservationDate: {year:0,month:0,day:0}
      };
      this.clickedReservation = {
        arrivalDate: {year:0,month:0,day:0},
        firstName: "",
        id: -1,
        lastName: "",
        leaveDate: {year:0,month:0,day:0},
        profilePicturePath: "",
        renterId: 0,
        reservationDate: {year:0,month:0,day:0}
      };

      this._toastNotification.add(
        "La réservation de "+ result.renter.lastName +" "+ result.renter.firstName +" a été refusée avec succès",
        "success"
      );
    });

  }
}
