import {Component, Input, OnInit} from '@angular/core';
import {DtoInputMyAds, DtoInputReservation} from "../../../dtos/ad/dto-input-my-ads";
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdHandleService} from "../../../services/ad-handle.service";
import {AdService} from "../../../services/ad.service";
import {DtoOutputUpdateAd} from "../../../dtos/ad/dto-output-update-ad";
import {ToastNotificationService} from "../../../services/toast-notification.service";

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

  constructor(
    public adHandleService: AdHandleService,
    private _adService: AdService,
    private _toastNotificationService: ToastNotificationService
  ) {
  }

  ngOnInit(): void {
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

  sortReservationByStatusName(statusName: string): DtoInputReservation[] {
    if (this.ad) {
      return this.ad.reservations.filter(item => item?.statusMyAds?.statusName === statusName);
    }
    return [];
  }
}
