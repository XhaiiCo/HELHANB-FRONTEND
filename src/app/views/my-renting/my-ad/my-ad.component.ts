import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DtoInputMyAds, DtoInputAdReservation} from "../../../dtos/ad/dto-input-my-ads";
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdHandleService} from "../../../services/ad-handle.service";
import {AdService} from "../../../services/ad.service";
import {DtoOutputUpdateAd} from "../../../dtos/ad/dto-output-update-ad";
import {ToastNotificationService} from "../../../services/toast-notification.service";
import {DtoOutputUpdateStatusAd} from "../../../dtos/ad/dto-output-update-status-ad";
import {
  MyAdReservationsToConfirmListComponent
} from "./my-ad-reservations-to-confirm-list.component/my-ad-reservations-to-confirm-list.component";
import {DateService} from "../../../services/date.service";

@Component({
  selector: 'app-my-ad',
  templateUrl: './my-ad.component.html',
  styleUrls: ['./my-ad.component.scss']
})
export class MyAdComponent implements OnInit {

  readonly pictureBaseUrl: string = environment.pictureUrl;

  @Input() ad!: DtoInputMyAds;

  adUpdateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    numberOfPersons: new FormControl([], [Validators.required, Validators.min(0)]),
    numberOfBedrooms: new FormControl([], [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    pricePerNight: new FormControl([], [Validators.required, Validators.min(0)]),
    arrivalTimeRangeStart: new FormControl('', Validators.required),
    arrivalTimeRangeEnd: new FormControl('', Validators.required),
    leaveTime: new FormControl('', Validators.required),
  });

  tmp_feature: string = "";
  disabledUpdateBtn: boolean = false;

  @Output() confirmedReservation = new EventEmitter<{ confirmed: DtoInputAdReservation, declined?: DtoInputAdReservation[] }>();
  @Output() declinedReservation = new EventEmitter<DtoInputAdReservation>();

  constructor(
    public adHandleService: AdHandleService,
    private _adService: AdService,
    private _toastNotificationService: ToastNotificationService,
    private _dateService: DateService,
  ) {
  }

  ngOnInit(): void {
    this.ad.reservations.forEach(value => value.adSlug = this.ad.adSlug);
  }

  onPictureAdded(files: any) {
    this.adHandleService.filesToBase64(files).then(files => {
      for (let i = 0; i < files.length; i++) {
        if (this.adHandleService.isMaxNumberOfPicturesReached(this.ad.picturesToAdd.length + this.ad.pictures.length)) break;
        if (this.adHandleService.isPictureAlreadyUploaded(files[i], [...this.ad.picturesToAdd])) continue;

        this.ad.picturesToAdd.push(files[i]);
      }
    });
  }

  deletePicture(picPath: string) {
    this.ad.pictures = this.ad.pictures.filter(pic => pic.path != picPath);
    this.ad.picturesToDelete.push(picPath);
  }

  removePicture(file: string) {
    this.ad.picturesToAdd = this.adHandleService.removePicture(file, [...this.ad.picturesToAdd]);
  }

  submitForm() {
    this.disabledUpdateBtn = true;

    let arrivalTimeRangeStart: string = this.adUpdateForm.get("arrivalTimeRangeStart")?.value!;
    let arrivalTimeRangeEnd: string = this.adUpdateForm.get("arrivalTimeRangeEnd")?.value!;
    let leaveTime: string = this.adUpdateForm.get("leaveTime")?.value!;

    let dto: DtoOutputUpdateAd = {
      adSlug: this.ad.adSlug,
      name: this.ad.name,
      numberOfPersons: this.ad.numberOfPersons,
      numberOfBedrooms: this.ad.numberOfBedrooms,
      description: this.ad.description,
      pricePerNight: this.ad.pricePerNight,
      arrivalTimeRangeStart: this.adHandleService.toDtoOutputTime(arrivalTimeRangeStart),
      arrivalTimeRangeEnd: this.adHandleService.toDtoOutputTime(arrivalTimeRangeEnd),
      leaveTime: this.adHandleService.toDtoOutputTime(leaveTime),
      features: this.ad.features,
      picturesToAdd: this.ad.picturesToAdd,
      picturesToDelete: this.ad.picturesToDelete
    }

    this._adService
      .update(dto)
      .subscribe({
        next: () => {
          this._toastNotificationService.add("Annonce modifiée avec succès", "success");
          this.disabledUpdateBtn = false;
        },
        error: () => {
          this._toastNotificationService.add("Erreur lors de la modification", "error");
          this.disabledUpdateBtn = false;
        },
      });

  }

  sortReservationByStatusName(statusName: string): DtoInputAdReservation[] {
    if (this.ad) {
      return this.ad.reservations.filter(item => item?.statusMyAds?.statusName === statusName);
    }
    return [];
  }

  sortReservationByDates(array: DtoInputAdReservation[]): DtoInputAdReservation[] {
    return array.sort((a, b) => {
      return new Date(this._dateService.dtoObjectToDateUS(a.arrivalDate)).getTime() - new Date(this._dateService.dtoObjectToDateUS(b.leaveDate)).getTime();
    });
  }

  getReservationInProgress(): DtoInputAdReservation[] {
    const reservations = this.sortReservationByStatusName('acceptée');
    const dateNow: Date = new Date(Date.now());
    return this.sortReservationByDates(
      reservations.filter(item => new Date(item.arrivalDate) <= dateNow && new Date(item.leaveDate) >= dateNow)
    );
  }

  getPastReservation(): DtoInputAdReservation[] {
    const reservations = this.sortReservationByStatusName('acceptée');
    const dateNow: Date = new Date(Date.now());
    return this.sortReservationByDates(
      reservations.filter(item => new Date(item.leaveDate) < dateNow)
    );
  }

  getReservationToCome(): DtoInputAdReservation[] {
    const reservations = this.sortReservationByStatusName('acceptée');
    const dateNow: Date = new Date(Date.now());
    return this.sortReservationByDates(
      reservations.filter(item => new Date(item.arrivalDate) > dateNow)
    );
  }

  changeStatus(statusId: number) {
    const dto: DtoOutputUpdateStatusAd = {
      statusId: statusId,
      adSlug: this.ad.adSlug,
    }

    this._adService.updateStatus(dto).subscribe({
      next: result => {
        this.ad.status = result.status;
        this._toastNotificationService.add("Annonce modifiée", "success");
      },
      error: err => {
        this._toastNotificationService.add(err.error, "error");
      }
    });
  }

  confirmedReservationMethod(reservations: { confirmed: DtoInputAdReservation, declined?: DtoInputAdReservation[] }) {
    this.confirmedReservation.emit(reservations);
  }

  declinedReservationMethod(reservation: DtoInputAdReservation) {
    this.declinedReservation.emit(reservation);
  }
}
