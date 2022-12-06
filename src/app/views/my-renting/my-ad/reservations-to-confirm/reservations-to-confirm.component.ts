import {Component, Input, OnInit} from '@angular/core';
import {DtoInputUserReservation, DtoOuputDate} from "../../../../dtos/user/dto-input-user-reservation";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-reservations-to-confirm',
  templateUrl: './reservations-to-confirm.component.html',
  styleUrls: ['./reservations-to-confirm.component.scss']
})
export class ReservationsToConfirmComponent implements OnInit {
  @Input() reservations: DtoInputUserReservation[] = [
    {
      id: 1,
      firstName: "Alfred",
      lastName : "Johnson",
      profilePicturePath : environment.defaultProfilePictureUrl,
      renterId : 1,
      arrivalDate : {
        year : 2022,
        month : 12,
        day : 4
      },
      leaveDate : {
        year : 2022,
        month : 12,
        day : 10
      },
      reservationDate : {
        year : 2022,
        month : 11,
        day : 9
      }
    }, {
      id: 2,
      firstName: "François",
      lastName : "Babouche",
      profilePicturePath : environment.defaultProfilePictureUrl,
      renterId : 2,
      arrivalDate : {
        year : 2022,
        month : 12,
        day : 10
      },
      leaveDate : {
        year : 2022,
        month : 12,
        day : 15
      },
      reservationDate : {
        year : 2022,
        month : 11,
        day : 10
      }
    }, {
      id: 2,
      firstName: "François",
      lastName : "Delrue",
      profilePicturePath : environment.defaultProfilePictureUrl,
      renterId : 2,
      arrivalDate : {
        year : 2022,
        month : 12,
        day : 9
      },
      leaveDate : {
        year : 2022,
        month : 12,
        day : 12
      },
      reservationDate : {
        year : 2022,
        month : 11,
        day : 11
      }
    },
  ];

  conflictsMap: [{ key: DtoInputUserReservation, val: DtoInputUserReservation[] } | null] = [ null ];
  conflictsListToDisplay: DtoInputUserReservation[] = [];
  clickedReservation: DtoInputUserReservation | null = null;

  constructor() {}

  ngOnInit(): void {
    this.reservations.sort(function(a, b) {
      return a.lastName === b.lastName ? 0 : a.lastName < b.lastName ? -1 : 1;
    });
    this.setConflictsList();
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
      this.conflictsMap.push({key: reservationI, val: reservationIConflictsList});
    }
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
    if (this.conflictsMap.find(e => e?.key === reservation))
      return this.conflictsMap.find(e => e?.key === reservation)?.val;
    else
      return null;
  }

  nbConflicts(reservation: DtoInputUserReservation) {
    if (this.getConflictsOfReservation(reservation) !== undefined)
      // @ts-ignore
      return this.getConflictsOfReservation(reservation).length;
    else
      return 0;
  }

  displayConflicts(reservation?: DtoInputUserReservation) {
    if (reservation !== undefined)
      // @ts-ignore
      this.conflictsListToDisplay = this.getConflictsOfReservation(reservation);
    else
      if (this.clickedReservation !== null)
        // @ts-ignore
        this.conflictsListToDisplay = this.getConflictsOfReservation(this.clickedReservation);
      else
        this.conflictsListToDisplay = [];
  }

  reservationClicked(reservation: DtoInputUserReservation) {
    if (this.clickedReservation != reservation)
      this.clickedReservation = reservation;
    else
      this.clickedReservation = null;
  }

  sort(e: any) {
    switch (e.value) {
      case "0":
        this.reservations.sort(function(a, b) {
          return a.lastName === b.lastName ? 0 : a.lastName < b.lastName ? -1 : 1;
        });
        this.conflictsListToDisplay.sort(function(a, b) {
          return a.lastName === b.lastName ? 0 : a.lastName < b.lastName ? -1 : 1;
        });
        break;

      case "1" :
        this.reservations.sort((a, b) => {
          return new Date(this.dtoObjectToDateUS(a.reservationDate)).getTime() - new Date(this.dtoObjectToDateUS(b.reservationDate)).getTime();
        });
        this.conflictsListToDisplay.sort((a, b) => {
          return new Date(this.dtoObjectToDateUS(a.reservationDate)).getTime() - new Date(this.dtoObjectToDateUS(b.reservationDate)).getTime();
        });
        break;

      case "2" :
        this.reservations.sort((a, b) => {
          return this.nbDaysBetweenDates(a.arrivalDate, a.leaveDate) - this.nbDaysBetweenDates(b.arrivalDate, b.leaveDate);
        });
        this.conflictsListToDisplay.sort((a, b) => {
          return this.nbDaysBetweenDates(a.arrivalDate, a.leaveDate) - this.nbDaysBetweenDates(b.arrivalDate, b.leaveDate);
        });
        break;

      case "3" :
        this.reservations.sort((a, b) => {
          return this.nbConflicts(a) - this.nbConflicts(b);
        });
        this.conflictsListToDisplay.sort((a, b) => {
          return this.nbConflicts(a) - this.nbConflicts(b);
        });
        break;

      default:
        break;
    }
  }
}
