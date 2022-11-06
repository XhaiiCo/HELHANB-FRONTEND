import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {DtoOutputRegistrationUser} from "../../dtos/auth/dto-output-registration-user";
import {UserService} from "../../services/user.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {Router} from "@angular/router";

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
    //dateOfBirth: this._fb.control("", [Validators.required]),
    email: this._fb.control("", [Validators.required, Validators.email]),
    password: this._fb.control("", [Validators.required, Validators.minLength(6)]),
    confirmPassword: this._fb.control("", [Validators.required, Validators.minLength(6)]),
  }, {
    validators: this.controlValuesAreEqual('password', 'confirmPassword')
  });


  profilePicture: null | File = null;

  constructor(private _fb: FormBuilder,
              private _authService: AuthService,
              private _userService: UserService,
              private _toastNotificationService: ToastNotificationService,
              private _router: Router) {
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

  emitRegistrationForm() {
    let user: DtoOutputRegistrationUser = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };
    this._authService.registration(user).subscribe(
      (user) => {
        this._authService.user = user;
        this._toastNotificationService.add(`Hello ${user.firstName}`, "success");

        if (this.profilePicture) {
          this._userService.updateProfilePicture(user.id, this.profilePicture).subscribe(
            (user) => this._authService.user = user,
          )
        }
        this._router.navigate(['']);
      },
      () => {
        this._toastNotificationService.add("Cet email est déjà utilisé", "error");
      }
    );
  }

  onUploadPicture(event: any) {
    this.profilePicture = event.target.files[0];
  }
}
