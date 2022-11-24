import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Time} from "@angular/common";

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {

  submitBtnValue: string = "Suivant";
  step: number = 0;
  stepsName: string[] = ["step0", "step1", "step2", "step3"]

  adCreateForm = new FormGroup({

    step0: new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    }),

    step1: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    }),

    step2: new FormGroup({
      arrivalHour: new FormControl(Validators.required),
      leaveHour: new FormControl(Validators.required),
      pricePerNight: new FormControl('', [Validators.required, Validators.pattern(/^\d+(,|.\d{1,2})?$/)]),
      nbOfPersons: new FormControl('', [Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])
    })

  })

  displayAllFeatures: boolean = false;
  tmp_feature: string = "";
  @Input() renting_features: string[] =
    [
      "Wifi",
      "Salle de bain",
      "Cuisine",
      "Télévision",
      "Chauffage"
    ]

  constructor() {
  }

  ngOnInit(): void {
  }

  validHours() {
    const formStep = this.adCreateForm.get("step2");
    const arrivalHour = formStep?.get("arrivalHour")?.value;
    const leaveHour = formStep?.get("leaveHour")?.value;

    if (!arrivalHour || !leaveHour) return;


    if (arrivalHour >= leaveHour) {
      this.controlSetErrors("step2", "arrivalHour", {"error": true});
      return;
    } else if (leaveHour <= arrivalHour) {
      this.controlSetErrors("step2", "leaveHour", {"error": true});
      return;
    }

    this.controlSetErrors("step2", "arrivalHour", null);
    this.controlSetErrors("step2", "leaveHour", null);
  }

  controlSetErrors(subFormName: string, controlName: string, value: {} | null) {
    this.adCreateForm.get(subFormName)?.get(controlName)?.setErrors(value);
  }

  submit() {
    this.step++;
    this.changeSubmitButtonValue()

    if (this.step == 4) {
      const tmp = {
        ...this.adCreateForm.get(this.stepsName[0])?.value,
        ...this.adCreateForm.get(this.stepsName[1])?.value,
        ...this.adCreateForm.get(this.stepsName[2])?.value,
        features: this.renting_features
      };

      console.log(tmp);
    }
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
