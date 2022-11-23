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
  stepsName : string[] = ["step0", "step1", "step2", "step3"]

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
      pricePerNight: new FormControl('', [Validators.required, Validators.pattern(/^\d+(,|.\d{1,2})?$/)]),
      nbOfPersons: new FormControl('', [Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])
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

  isInvalid(subFormName: string, controlName: string)
  {
      var control = this.adCreateForm.get(subFormName)?.get(controlName);

      return control?.dirty && control?.invalid;
  }
}
