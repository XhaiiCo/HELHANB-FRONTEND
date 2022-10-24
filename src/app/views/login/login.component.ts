import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordInputType: string = "password";
  passwordInputFocused: boolean = false;

  form: FormGroup = this._fb.group({
    email: this._fb.control("", [Validators.required, Validators.email]),
    password: this._fb.control("", [Validators.required, Validators.minLength(6)]),
  }) ;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  /**
   * Toggle the password input type with text or password for make it visible or not
   */
  togglePasswordInputType() {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text': 'password' ;
  }

  /**
   * Toggle the boolean variable that says whether the password field is focus or not
   */
  togglePasswordInputFocused(){
    this.passwordInputFocused = !this.passwordInputFocused ;
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

  emitLoginForm() {
    console.log(this.form.value) ;
  }
}
