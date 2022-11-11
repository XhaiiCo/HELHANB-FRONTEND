import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {DtoOutputLoginUser} from "../../dtos/auth/dto-output-login-user";
import {AuthService} from "../../services/auth.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordInputType: string = "password";
  passwordInputFocused: boolean = false;
  disableLoginBtn: boolean = false ;

  form: FormGroup = this._fb.group({
    email: this._fb.control("", [Validators.required, Validators.email]),
    password: this._fb.control("", [Validators.required, Validators.minLength(6)]),
  }) ;

  submitBtnText: string = "Se connecter" ;

  constructor(private _fb: FormBuilder,
              private _authService: AuthService,
              private _toastNotificationService: ToastNotificationService,
              private _router: Router) { }

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

  /**
   * It sends the user's credentials to the server, and if the server responds with a success, it redirects the user to the
   * home page, otherwise it displays an error message
   */
  emitLoginForm() {
    this.disableLoginBtn = true ;
    this.submitBtnText = "Connexion..." ;

    let userDto: DtoOutputLoginUser = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }

    this._authService.login(userDto).subscribe({
      next: user => {
        this._authService.user = user ;
        this._toastNotificationService.add(`Hello ${user.firstName}`, "success") ;
        this._router.navigate(['']) ;
      },
      error: (err) => {
        if(err.status === 401)
          this._toastNotificationService.add(err.error, "error");
        else
          this._toastNotificationService.add("Erreur de connexion au serveur", "error") ;

        this.submitBtnText = "Se connecter" ;
        this.disableLoginBtn = false ;
      }
    }) ;
  }
}
