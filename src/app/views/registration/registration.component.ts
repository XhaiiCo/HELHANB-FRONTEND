import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup = this._fb.group({
    firstName: this._fb.control("", [Validators.required]),
    lastName: this._fb.control("", [Validators.required]),
    //dateOfBirth: this._fb.control("", [Validators.required]),
    email: this._fb.control("", [Validators.required, Validators.email]),
    password: this._fb.control("", [Validators.required, Validators.minLength(6)]),
    confirmPassword: this._fb.control("", [Validators.required, Validators.minLength(6)]),
  }, {
    validators: this.controlValuesAreEqual('password', 'confirmPassword')
  }) ;


  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {

  }

  /**
   * Return is a field of the form is valid according to the validators options
   * @param fieldName the field name
   * @return true if the field name is valid, false otherwise
   */
  isInvalid(fieldName: string): boolean
  {
    return this.form.get(fieldName)?.touched && this.form.get(fieldName)?.dirty && this.form.get(fieldName)?.invalid || false;
  }

  isPasswordEquals(): boolean{
    if (this.form.errors) {
      return this.form.errors['valuesDoNotMatch'];
    }
    return false ;
  }
  private controlValuesAreEqual(controlName1: string, controlName2: string): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup ;
      const valueOfControlA = formGroup.get(controlName1)?.value ;
      const valueOfControlB = formGroup.get(controlName2)?.value ;

      if(valueOfControlA === valueOfControlB){
        return null ;
      }
      else{
        return {valuesDoNotMatch: true}
      }
    }
  }
  emitRegistrationForm() {

  }
}
