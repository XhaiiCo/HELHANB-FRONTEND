import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {

  submitBtnValue: string = "Suivant";
  step : number = 0;
  stepsName : string[] = ["step1", "step2", "step3", "step4"]

  adCreateForm = new FormGroup({

    step1: new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    }),

    step2: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
    }),

    step3: new FormGroup({
      pricePerNight: new FormControl(0, [Validators.required, Validators.pattern(/^\d+(,|.\d{1,2})?$/)]),
      nbOfPersons: new FormControl(0, [Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])
    })

  })

  constructor() { }

  ngOnInit(): void {
  }

  submit()
  {
    this.step++;
    this.changeSubmitButtonValue()

    if(this.step == 4)
    {
      //submit
    }
  }

  previous()
  {
    this.step--;
    this.changeSubmitButtonValue()
  }

  changeSubmitButtonValue()
  {
    this.submitBtnValue = this.step < 4 ? "Suivant" : "Valider";
  }

  //step1
  get inputName():AbstractControl | null | undefined
  {
    return this.adCreateForm.get("step1")?.get("name");
  }

  get inputDescription():AbstractControl | null | undefined
  {
    return this.adCreateForm.get("step1")?.get("description");
  }

  //step2
  get inputStreet():AbstractControl | null | undefined
  {
    return this.adCreateForm.get("step2")?.get("street");
  }

  get inputCity():AbstractControl | null | undefined
  {
    return this.adCreateForm.get("step2")?.get("city");
  }

  get inputPostalCode():AbstractControl | null | undefined
  {
    return this.adCreateForm.get("step2")?.get("postalCode");
  }

  get inputCountry():AbstractControl | null | undefined
  {
    return this.adCreateForm.get("step2")?.get("country");
  }

  //step3
  get inputPricePerNight():AbstractControl | null | undefined
  {
    return this.adCreateForm.get("step3")?.get("pricePerNight");
  }

  get inputNbOfPersons():AbstractControl | null | undefined
  {
    return this.adCreateForm.get("step3")?.get("nbOfPersons");
  }
}
