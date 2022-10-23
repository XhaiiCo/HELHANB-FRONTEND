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

  togglePasswordInputType() {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text': 'password' ;
  }

  togglePasswordInputFocused(){
    this.passwordInputFocused = !this.passwordInputFocused ;
  }

  isInvalid(fieldName: string) {
    return this.form.get(fieldName)?.touched && this.form.get(fieldName)?.dirty && this.form.get(fieldName)?.invalid ;
  }
}
