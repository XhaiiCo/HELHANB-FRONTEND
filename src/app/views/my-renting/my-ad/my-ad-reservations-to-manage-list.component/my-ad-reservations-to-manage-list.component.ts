import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {AdService} from "../../../../services/ad.service";
import {ToastNotificationService} from "../../../../services/toast-notification.service";
import {DtoInputAdReservation} from "../../../../dtos/ad/dto-input-my-ads";
import {DateService} from "../../../../services/date.service";
import {ConversationService} from "../../../../services/conversation.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-my-ad-reservations-to-manage-list',
  templateUrl: './my-ad-reservations-to-manage-list.component.html',
  styleUrls: ['./my-ad-reservations-to-manage-list.component.scss']
})
export class MyAdReservationsToManageListComponent implements OnInit {

  @Input() reservations!: DtoInputAdReservation[];
  cancelReservationChange!: DtoInputAdReservation[];

  conflictsMap: [{ key: DtoInputAdReservation, val: DtoInputAdReservation[] } | null] = [null];
  conflictsListToDisplay: DtoInputAdReservation[] = [];
  clickedReservation: DtoInputAdReservation | null = null;

  ascendingOrder: boolean = true;
  sortIndex: string = "1";

  displayConfirmationForm: boolean = false;
  displayRefusalForm: boolean = false;

  reservationToDecline: DtoInputAdReservation | null = null;
  reservationToConfirm: DtoInputAdReservation | null = null;

  @Output() confirmedReservation = new EventEmitter<{ confirmed: DtoInputAdReservation, declined?: DtoInputAdReservation[] }>();
  @Output() declinedReservation = new EventEmitter<DtoInputAdReservation>();

  constructor(
    private _adService: AdService,
    private _toastNotification: ToastNotificationService,
    public dateService: DateService,
    private _conversationService: ConversationService,
    private _authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.cancelReservationChange = this.reservations;
    this.sortReservation();
    this.setConflictsList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.cancelReservationChange && this.reservations) {
      if (this.cancelReservationChange.length !== this.reservations.length) {
        this.setConflictsList();
        this.cancelReservationChange = this.reservations;
      }
    }
  }

  // Finds conflicts between reservations in the reservations array
  // and stores the conflicts in a map
  setConflictsList() {
    let conflictsMap: any = [];
    this.conflictsMap = [null];

    for (let reservationI of this.reservations) {
      let reservationIConflictsList: DtoInputAdReservation[] = [];
      for (let reservationJ of this.reservations) {
        if (reservationJ !== reservationI) {
          if (!((reservationJ.arrivalDate < reservationI.arrivalDate && reservationJ.leaveDate < reservationI.arrivalDate)
            || (reservationJ.arrivalDate > reservationI.leaveDate)))
            reservationIConflictsList.push(reservationJ);
        }
      }
      conflictsMap.push({key: reservationI, val: reservationIConflictsList});
    }

    this.conflictsMap = conflictsMap;
  }

  /**
   * This function returns an array of the dates between the dates sent in parameters and the arrivalDate parameter
   * @param arrivalDate
   * @param leaveDate
   */
  getDatesList(arrivalDate: Date, leaveDate: Date) {
    if (leaveDate <= arrivalDate)
      return [];

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

  nbConflicts(reservation: DtoInputAdReservation): number {
    let nb = this.conflictsMap.find(e => e?.key === reservation)?.val.length;
    return (nb !== undefined) ? nb : 0;
  }

  setConflictsToDisplay(reservation?: DtoInputAdReservation) {
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
    if (e)
      this.sortIndex = e.value;

    this.sortReservation();
    this.sortConflicts();
  }

  sortReservation() {
    this.sortDtoInputAdReservationArray(this.cancelReservationChange);
  }

  sortConflicts() {
    this.sortDtoInputAdReservationArray(this.conflictsListToDisplay);
  }

  /* Sorts the input array depending on the sortIndex and the ascendingOrder values  */
  sortDtoInputAdReservationArray(array: DtoInputAdReservation[]): void {
    switch (this.sortIndex) {
      case "0": // last name
        array.sort(function (a, b) {
          return a.renterMyAds.lastName === b.renterMyAds.lastName ? 0 : a.renterMyAds.lastName < b.renterMyAds.lastName ? -1 : 1;
        });
        break;

      case "1" : // date of the reservation
        array.sort((a, b) => {
          return new Date(this.dateService.dtoObjectToDateUS(a.arrivalDate)).getTime() - new Date(this.dateService.dtoObjectToDateUS(b.arrivalDate)).getTime();
        });
        break;

      case "2" : // length of reservation
        array.sort((a, b) => {
          return this.dateService.nbDaysBetweenDates(a.arrivalDate, a.leaveDate) - this.dateService.nbDaysBetweenDates(b.arrivalDate, b.leaveDate);
        });
        break;

      case "3" : // nb conflicts
        array.sort((a, b) => {
          return this.nbConflicts(a) - this.nbConflicts(b);
        });
        break;

      default:
        break;
    }

    if (!this.ascendingOrder)
      array.reverse();
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
    if (!this.reservationToConfirm) return;
    this.confirmedReservation.emit({
      confirmed: this.reservationToConfirm,
      declined: this.conflictsMap.find(e => e?.key === this.reservationToConfirm)?.val
    });

    this.displayConfirmationForm = false;
    this.clickedReservation = null;
    this.conflictsListToDisplay = [];
    this.reservationToConfirm = null;
  }

  declineReservation() {
    if (!this.reservationToDecline) return;

    this.declinedReservation.emit(this.reservationToDecline);

    this.displayRefusalForm = false;
    this.clickedReservation = null;
    this.conflictsListToDisplay = [];
    this.reservationToDecline = null;
  }

  contactUser(renterId: number) {
    if (this._authService.user !== null) {
      this._conversationService.redirectToTheConversationPage(this._authService.user.id, renterId)
    }
  }

}
