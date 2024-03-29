import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormGroupIdentifier} from "../../interfaces/form-group-identifier";
import {DtoOutputCreateAd} from "../../dtos/ad/dto-output-create-ad";
import {AdService} from "../../services/ad.service";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {Router} from "@angular/router";
import {AdHandleService} from "../../services/ad-handle.service";
import {DtoOutputTime} from "../../dtos/ad/dto-output-time";

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {

  submitBtnValue: string = "Suivant";
  step: number = 0;
  stepsName: string[] = ["step0", "step1", "step2", "step3", "step4", "step5"]

  picturesToAdd: string[] = [];

  tmp_feature: string = "";
  renting_features: string[] = [];
  disabledSubmitBtn: boolean = false;

  adCreateForm = new FormGroup({
    step0: new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)])
    }),

    step1: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl([], [Validators.required, Validators.min(0)]),
      country: new FormControl('', Validators.required)
    }),

    step2: new FormGroup({
      arrivalTimeRangeStart: new FormControl('', Validators.required),
      arrivalTimeRangeEnd: new FormControl('', Validators.required),
      leaveTime: new FormControl('', Validators.required),
    }),

    step3: new FormGroup({
      pricePerNight: new FormControl([], [Validators.required, Validators.min(0)]),
      numberOfPersons: new FormControl([], [Validators.required, Validators.min(0)]),
      numberOfBedrooms: new FormControl([], [Validators.required, Validators.min(0)]),
    }),
  })

  constructor(private _adService: AdService,
              private _authService: AuthService,
              private _userService: UserService,
              private _taostNotificaiton: ToastNotificationService,
              private _router: Router,
              public adHandleService: AdHandleService) {
  }

  ngOnInit(): void {
  }

  /**
   * It takes a list of files, converts them to base64, and adds them to the list of pictures to add
   * @param {any} files - the files that were added to the input
   */
  onPictureAdded(files: any) {
    this.adHandleService.filesToBase64(files).then(files => {
      for (let i = 0; i < files.length; i++) {
        if (this.adHandleService.isMaxNumberOfPicturesReached(this.picturesToAdd.length)) break;
        if (this.adHandleService.isPictureAlreadyUploaded(files[i], [...this.picturesToAdd])) continue;

        this.picturesToAdd.push(files[i]);
      }
    });
  }

  /**
   * It removes a picture from the picturesToAdd array
   * @param {string} file - the file name of the picture to remove
   */
  removePicture(file: string) {
    this.picturesToAdd = this.adHandleService.removePicture(file, [...this.picturesToAdd]);
  }

  /**
   * It validates the start and end hours of a form group
   * @param {FormGroupIdentifier} startHourIdentifier - FormGroupIdentifier - The identifier of the start hour control.
   * @param {FormGroupIdentifier} endHourIdentifier - FormGroupIdentifier
   * @returns a boolean value.
   */
  validHours(startHourIdentifier: FormGroupIdentifier, endHourIdentifier: FormGroupIdentifier) {
    const startHour: any = this.adCreateForm.get(startHourIdentifier.stepName)?.get(startHourIdentifier.controlName)?.value;
    const endHour: any = this.adCreateForm.get(endHourIdentifier.stepName)?.get(endHourIdentifier.controlName)?.value;

    if (startHour === '' || endHour === '') return;

    if (startHour >= endHour) {
      this.controlSetErrors(endHourIdentifier.stepName, endHourIdentifier.controlName, {"error": true});
      return;
    }

    this.controlSetErrors(startHourIdentifier.stepName, startHourIdentifier.controlName, null);
    this.controlSetErrors(endHourIdentifier.stepName, endHourIdentifier.controlName, null);
  }

  controlSetErrors(subFormName: string, controlName: string, value: {} | null) {
    this.adCreateForm.get(subFormName)?.get(controlName)?.setErrors(value);
  }

  submitForm() {
    if (this.stepsName[this.step] !== "step5") {
      this.step++;
      this.changeSubmitButtonValue()
    } else {
      if (!this._authService.user) return;
      if (this._authService.user.role.name == "utilisateur") {
        this._userService.becomeHost(this._authService.user.id).subscribe(
          (user) => {
            this._authService.user = user;
            this.submitAd();
          }
        )
      } else {
        this.submitAd();
      }
    }
  }

  submitAd() {
    if (!this._authService.user) return;
    this.disabledSubmitBtn = true;
    this.submitBtnValue = "Ajout en cours...";

    let dtoOutputCreateAd: DtoOutputCreateAd = {
      ...this.adCreateForm.get(this.stepsName[0])?.value,
      ...this.adCreateForm.get(this.stepsName[1])?.value,
      ...this.adCreateForm.get(this.stepsName[2])?.value,
      ...this.adCreateForm.get(this.stepsName[3])?.value,

      features: this.renting_features,
      userId: this._authService.user.id,
      picturesToAdd: this.picturesToAdd
    };

    //Add the time
    const arrivalTimeRangeStart: string = this.adCreateForm.get(this.stepsName[2])?.get("arrivalTimeRangeStart")?.value;
    const arrivalTimeRangeEnd: string = this.adCreateForm.get(this.stepsName[2])?.get("arrivalTimeRangeEnd")?.value;
    const leaveTime: string = this.adCreateForm.get(this.stepsName[2])?.get("leaveTime")?.value;
    dtoOutputCreateAd.arrivalTimeRangeStart = this.adHandleService.toDtoOutputTime(arrivalTimeRangeStart);
    dtoOutputCreateAd.leaveTime = this.adHandleService.toDtoOutputTime(leaveTime);
    dtoOutputCreateAd.arrivalTimeRangeEnd = this.adHandleService.toDtoOutputTime(arrivalTimeRangeEnd);

    this._adService.create(dtoOutputCreateAd).subscribe({
        next: ad => {
          //this.submitPictures(ad.id)
          this._taostNotificaiton.add("Annonce ajoutée avec succès", "success");
          this._router.navigate(['/mes-annonces']);
        },
        error: err => {
          this._taostNotificaiton.add("Erreur, l'annonce n'a pas été ajoutée", "error");
          this.disabledSubmitBtn = false;
          this.changeSubmitButtonValue();
        }
      }
    );
  }

  /**
   * @param {number} id - number - the id of the ad that we want to add the images to
   */

  /* submitPictures(id: number): void {
     this.files.forEach(file => this._adService.addImg(id, file.file).subscribe());
   }*/



  /**
   * The previous() function decreases the step value by 1 and calls the changeSubmitButtonValue() function
   */
  previous() {
    this.step--;
    this.changeSubmitButtonValue()
  }

  /**
   * It changes the value of the submit button depending on the current step
   */
  changeSubmitButtonValue() {
    this.submitBtnValue = this.step < 5 ? "Suivant" : "Valider";
  }

  /**
   * It checks if the control is dirty, touched and invalid.
   * @param {FormGroupIdentifier} controlIdentifier - FormGroupIdentifier
   * @returns A boolean value.
   */
  isInvalid(controlIdentifier: FormGroupIdentifier) {
    const control = this.adCreateForm.get(controlIdentifier.stepName)?.get(controlIdentifier.controlName);

    return control?.dirty && control?.touched && control?.invalid || false;
  }

  /**
   * It returns true if the current step is not step5, or if the number of files is greater than or equal to 3
   */
  isNbFileValid(): boolean {
    if (this.stepsName[this.step] !== "step5")
      return true;

    return this.picturesToAdd.length >= 3;
  }
}
