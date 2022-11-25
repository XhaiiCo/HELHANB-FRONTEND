import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormGroupIdentifier} from "../../interfaces/form-group-identifier";
import {DtoOutputCreateAd, DtoOutputTime} from "../../dtos/ad/dto-output-create-ad";
import {Time} from "@angular/common";
import {AdService} from "../../services/ad.service";
import {AuthService} from "../../services/auth.service";
import {ImgData} from "../../interfaces/img-data";

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {

  submitBtnValue: string = "Suivant";
  step: number = 0;
  stepsName: string[] = ["step0", "step1", "step2", "step3"]

  readonly nbMinPictures: number = 3;
  readonly nbMaxPictures: number = 15;

  files: ImgData[] = [];

  displayAllFeatures: boolean = false;
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
      postalCode: new FormControl(Validators.required),
      country: new FormControl('', Validators.required)
    }),

    step2: new FormGroup({
      arrivalTimeRangeStart: new FormControl(Validators.required),
      arrivalTimeRangeEnd: new FormControl(Validators.required),
      leaveTime: new FormControl(Validators.required),
      pricePerNight: new FormControl(0, [Validators.required, Validators.pattern(/^\d+(,|.\d{1,2})?$/)]),
      numberOfPersons: new FormControl(0, [Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)]),
      numberOfBedrooms: new FormControl(0, [Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])
    }),

  })

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
    return this.files.length == this.nbMaxPictures;
  }


  constructor(private _adService: AdService, private _authService: AuthService) {
  }

  ngOnInit(): void {
  }

  validHours(startHourIdentifier: FormGroupIdentifier, endHourIdentifier: FormGroupIdentifier) {
    const startHour: Time = this.adCreateForm.get(startHourIdentifier.stepName)?.get(startHourIdentifier.controlName)?.value;
    const endHour: Time = this.adCreateForm.get(endHourIdentifier.stepName)?.get(endHourIdentifier.controlName)?.value;

    if (!startHour || !endHour) return;

    if (startHour >= endHour) {
      this.controlSetErrors(startHourIdentifier.stepName, startHourIdentifier.controlName, {"error": true});
      this.controlSetErrors(endHourIdentifier.stepName, endHourIdentifier.controlName, {"error": true});
      return;
    }

    this.controlSetErrors(startHourIdentifier.stepName, startHourIdentifier.controlName, null);
    this.controlSetErrors(endHourIdentifier.stepName, endHourIdentifier.controlName, null);
  }

  controlSetErrors(subFormName: string, controlName: string, value: {} | null) {
    this.adCreateForm.get(subFormName)?.get(controlName)?.setErrors(value);
  }

  submit() {
    this.step++;
    this.changeSubmitButtonValue()

    if (this.step == 4) {
      if (!this._authService.user) return;

      let tmp: DtoOutputCreateAd = {
        ...this.adCreateForm.get(this.stepsName[0])?.value,
        ...this.adCreateForm.get(this.stepsName[1])?.value,
        ...this.adCreateForm.get(this.stepsName[2])?.value,

        features: this.renting_features,
        userId: this._authService.user.id,
      };

      //Add the time
      const arrivalTimeRangeStart: string = this.adCreateForm.get(this.stepsName[2])?.get("arrivalTimeRangeStart")?.value;
      const arrivalTimeRangeEnd: string = this.adCreateForm.get(this.stepsName[2])?.get("arrivalTimeRangeEnd")?.value;
      const leaveTime: string = this.adCreateForm.get(this.stepsName[2])?.get("leaveTime")?.value;
      tmp.arrivalTimeRangeStart = this.toDtoOutputTime(arrivalTimeRangeStart);
      tmp.leaveTime = this.toDtoOutputTime(leaveTime);
      tmp.arrivalTimeRangeEnd = this.toDtoOutputTime(arrivalTimeRangeEnd);

      console.log(tmp);

      this._adService.create(tmp).subscribe(ad => console.log(ad));

    }
  }

  toDtoOutputTime(value: string): DtoOutputTime {
    return {
      hours: Number(value.substring(0, 2)),
      minutes: Number(value.substring(3, 5)),
    };
  }

  previous() {
    this.step--;
    this.changeSubmitButtonValue()
  }

  changeSubmitButtonValue() {
    this.submitBtnValue = this.step < 4 ? "Suivant" : "Valider";
  }

  isInvalid(subFormName: string, controlName: string) {
    const control = this.adCreateForm.get(subFormName)?.get(controlName);

    return control?.dirty && control?.invalid;
  }

  showListFeatures() {
    this.displayAllFeatures = true;
  }

  closeListFeatures() {
    this.displayAllFeatures = false;
  }

  addFeature(feature: string) {
    if (!this.renting_features.find(f => f.toLowerCase() === feature.toLowerCase()))
      this.renting_features.push(feature);

    this.tmp_feature = "";
  }

  removeFeature(feature: string) {
    this.renting_features = this.renting_features.filter(obj => obj !== feature);
    if (this.renting_features.length == 0)
      this.displayAllFeatures = false;
  }
}
