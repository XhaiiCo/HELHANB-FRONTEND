import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormGroupIdentifier} from "../../interfaces/form-group-identifier";
import {DtoOutputCreateAd, DtoOutputTime} from "../../dtos/ad/dto-output-create-ad";
import {Time} from "@angular/common";
import {AdService} from "../../services/ad.service";
import {AuthService} from "../../services/auth.service";
import {ImgData} from "../../interfaces/img-data";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {

  submitBtnValue: string = "Suivant";
  step: number = 0;
  stepsName: string[] = ["step0", "step1", "step2", "step3", "step4", "step5"]

  readonly nbMinPictures: number = 3;
  readonly nbMaxPictures: number = 15;

  files: ImgData[] = [];

  tmp_feature: string = "";
  renting_features: string[] = [];

  adCreateForm = new FormGroup({
    step0: new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
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
  private nbImg: number = 0;

  constructor(private _adService: AdService, private _authService: AuthService, private _userService: UserService) {
  }

  ngOnInit(): void {
  }

  /**
   * We're looping through the files from the event, checking if the file is already in the files array, and if it's not,
   * we're pushing it to the array
   * @param {any} event - any - the event that is triggered when the user selects a file.
   * @returns the value of the variable 'reader.result'
   */
  addPicture(event: any): void {
    if (this.isFilesFull()) return;

    const filesFromEvent = event.target.files;

    for (let i = 0; i < filesFromEvent.length; i++) {

      if (this.isFilesFull()) return;
      const file = filesFromEvent[i];

      if (!this.isInFiles(file)) {

        this.nbImg++;
        const reader = new FileReader();

        reader.onload = e => {
          this.files.push({
            file: file,
            imageSrc: reader.result
          });
        }
        reader.readAsDataURL(file);
      }
    }
  }

  removePicture(file: ImgData) {
    this.files = this.files.filter(image => image.file.name !== file.file.name)
    this.nbImg-- ;
  }

  /**
   * It returns true if the fileToCheck is in the files array
   * @param {File} fileToCheck - File - the file to check if it's in the files array
   * @returns A boolean value.
   */
  isInFiles(fileToCheck: File): boolean {
    let filesName = this.files.map((file) => file.file.name)

    return filesName.includes(fileToCheck.name);
  }

  /**
   * It returns true if the number of files is equal to the maximum number of pictures
   * @returns A boolean value.
   */
  isFilesFull(): boolean {
    //NbImg cause the image adding is async
    return this.nbImg == this.nbMaxPictures;
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
      if (this._authService.user.role.name == "utilisateur"){
        this._userService.becomeHost(this._authService.user.id).subscribe(
          (user) => {
            this._authService.user = user ;
            this.submitAd() ;
          }
        )
      }
    }
  }

  submitAd() {
    if (!this._authService.user) return;

    let dtoOutputCreateAd: DtoOutputCreateAd = {
      ...this.adCreateForm.get(this.stepsName[0])?.value,
      ...this.adCreateForm.get(this.stepsName[1])?.value,
      ...this.adCreateForm.get(this.stepsName[2])?.value,
      ...this.adCreateForm.get(this.stepsName[3])?.value,

      features: this.renting_features,
      userId: this._authService.user.id,
    };

    //Add the time
    const arrivalTimeRangeStart: string = this.adCreateForm.get(this.stepsName[2])?.get("arrivalTimeRangeStart")?.value;
    const arrivalTimeRangeEnd: string = this.adCreateForm.get(this.stepsName[2])?.get("arrivalTimeRangeEnd")?.value;
    const leaveTime: string = this.adCreateForm.get(this.stepsName[2])?.get("leaveTime")?.value;
    dtoOutputCreateAd.arrivalTimeRangeStart = this.toDtoOutputTime(arrivalTimeRangeStart);
    dtoOutputCreateAd.leaveTime = this.toDtoOutputTime(leaveTime);
    dtoOutputCreateAd.arrivalTimeRangeEnd = this.toDtoOutputTime(arrivalTimeRangeEnd);

    this._adService.create(dtoOutputCreateAd).subscribe({
        next: ad => {
          this.submitPictures(ad.id)
        },
        error: err => console.log(err)
      }
    );
  }

  /**
   * @param {number} id - number - the id of the ad that we want to add the images to
   */
  submitPictures(id: number): void {
    this.files.forEach(file => this._adService.addImg(id, file.file).subscribe());
  }

  /**
   * It takes a string in the format "HH:mm" and returns an object with two properties, hours and minutes, which are both
   * numbers
   * @param {string} value - string - the value to be converted
   * @returns An object with two properties, hours and minutes.
   */
  toDtoOutputTime(value: string): DtoOutputTime {
    return {
      hours: Number(value.substring(0, 2)),
      minutes: Number(value.substring(3, 5)),
    };
  }

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
   * If the feature doesn't already exist in the array, add it
   * @param {string} feature - string - the feature to add
   */
  addFeature(feature: string) {
    if (!this.renting_features.find(f => f.toLowerCase() === feature.toLowerCase()))
      this.renting_features.push(feature);

    this.tmp_feature = "";
  }

  /**
   * @param {string} feature - string - the feature to be removed
   */
  removeFeature(feature: string) {
    this.renting_features = this.renting_features.filter(obj => obj !== feature);
  }

  /**
   * It returns true if the current step is not step5, or if the number of files is greater than or equal to 3
   */
  isNbFileValid(): boolean {
    if (this.stepsName[this.step] !== "step5")
      return true;

    return this.files.length >= 3;
  }

}
