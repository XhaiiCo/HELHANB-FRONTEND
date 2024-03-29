import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {DtoOutputRegistrationUser} from "../../dtos/user/dto-output-registration-user";
import {UserService} from "../../services/user.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {Router} from "@angular/router";
import {Base64Service} from "../../services/base64.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup = this._fb.group({
    profilePicture: this._fb.control(""),
    firstName: this._fb.control("", [Validators.required]),
    lastName: this._fb.control("", [Validators.required]),
    email: this._fb.control("", [Validators.required, Validators.email]),
    password: this._fb.control("", [Validators.required, Validators.minLength(6)]),
    confirmPassword: this._fb.control("", [Validators.required, Validators.minLength(6)]),
  }, {
    validators: this.controlValuesAreEqual('password', 'confirmPassword')
  });


  profilePicture: null | File = null;
  btnSubmitRegistrationText: string = "S'inscrire";
  disableRegistrationBtn: boolean = false;

  constructor(private _fb: FormBuilder,
              private _authService: AuthService,
              private _userService: UserService,
              private _toastNotificationService: ToastNotificationService,
              private _router: Router,
              private _base64Service: Base64Service,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * Return is a field of the form is valid according to the validators options
   * @param fieldName the field name
   * @return true if the field name is valid, false otherwise
   */
  isInvalid(fieldName: string): boolean {
    return this.form.get(fieldName)?.touched && this.form.get(fieldName)?.dirty && this.form.get(fieldName)?.invalid || false;
  }

  isPasswordEquals(): boolean {
    if (this.form.errors) {
      return this.form.errors['valuesDoNotMatch'];
    }
    return false;
  }

  /**
   * It returns a validator function that takes a form control as an argument and returns a validation error if the values
   * of two controls in the form group are not equal
   * @param {string} controlName1 - The name of the first control to compare.
   * @param {string} controlName2 - string - The name of the control to compare the value of the current control to.
   */
  private controlValuesAreEqual(controlName1: string, controlName2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valueOfControlA = formGroup.get(controlName1)?.value;
      const valueOfControlB = formGroup.get(controlName2)?.value;

      if (valueOfControlA === valueOfControlB) {
        return null;
      } else {
        return {valuesDoNotMatch: true}
      }
    }
  }

  /**
   * We're sending a request to the server to register a new user, and if the request is successful, we're redirecting the
   * user to the home page
   */
  emitRegistrationForm() {
    this.btnSubmitRegistrationText = "Inscription...";
    this.disableRegistrationBtn = true;

    let user: DtoOutputRegistrationUser = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    this._authService.registration(user).subscribe({
      next: (user) => {
        this._authService.user = user;
        this._toastNotificationService.add(`Hello ${user.firstName}`, "success");
        if (this.profilePicture) {
          this._base64Service.fileToBase64(this.profilePicture).subscribe(base64 => {
            this._userService.updateProfilePicture({profilePicture: base64}).subscribe({
              next: (user) => this._authService.user = user,
              error: (err) => {
                if (err.status === 401)
                  this._toastNotificationService.add(err.error, "error");
              }
            });
          })
        }
        this._router.navigate(['']);
      },
      error: (err) => {
        this.btnSubmitRegistrationText = "S'inscrire";
        this.disableRegistrationBtn = false;

        if (err.status === 409)
          this._toastNotificationService.add(err.error, "error");
        else
          this._toastNotificationService.add("Erreur de connexion au serveur", "error");
      }
    });
  }

  onUploadPicture(event: any) {
    this.profilePicture = event.target.files[0];
  }
}
