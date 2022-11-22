import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {Router} from "@angular/router";
import {environment} from 'src/environments/environment';
import {DtoInputUser} from "../../dtos/user/dto-input-user";
import {DtoOutputUpdatePassword} from "../../dtos/user/dto-output-update-password";
import {DtoOutputUpdateUser} from "../../dtos/user/dto-output-update-user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  profilePictureBaseUri: string = environment.pictureUrl;

  form: FormGroup = this._fb.group({
    profilePicture: this._fb.control(""),
    firstName: this._fb.control("", [Validators.required]),
    lastName: this._fb.control("", [Validators.required]),
    //dateOfBirth: this._fb.control("", [Validators.required]),
    email: this._fb.control("", [Validators.required, Validators.email]),
    password: this._fb.control("", Validators.minLength(6)),
    confirmPassword: this._fb.control("", Validators.minLength(6)),
  }, {
    validators: this.controlValuesAreEqual('password', 'confirmPassword')
  });

  btnSubmitRegistrationText: string = "Enregistrer les modification";
  disableRegistrationBtn: boolean = false;
  showPwFields: boolean = false;
  user!: DtoInputUser;

  constructor(private _fb: FormBuilder,
              public authService: AuthService,
              private _userService: UserService,
              private _toastNotificationService: ToastNotificationService,
              private _router: Router) {
  }

  ngOnInit(): void {
    const user = this.authService.user;
    if (user) {
      this.user = user;
      this.resetForm()

    } else {
      this._toastNotificationService.add("Error", "error");
      this._router.navigate(['']);
    }
  }

  resetForm() {

    this.form.get('firstName')?.setValue(this.user.firstName);
    this.form.get('lastName')?.setValue(this.user.lastName);
    this.form.get('email')?.setValue(this.user.email);

    this.form.get('password')?.setValue("");
    this.form.get('confirmPassword')?.setValue("");
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

  emitUpdateForm() {
    this.btnSubmitRegistrationText = "Modification...";
    this.disableRegistrationBtn = true;

    if (this.showPwFields && this.form.get("password")?.value != "") {
      //Update password

      const dtoPasswordUpdate: DtoOutputUpdatePassword = {
        id: this.user.id,
        password: this.form.get("password")?.value
      };

      this._userService.updatePassword(dtoPasswordUpdate).subscribe({
        next: (user) => {
          this._toastNotificationService.add("Mot de passe modifié", "success");

          this.resetForm()
          this.btnSubmitRegistrationText = "Enregistrer les modification";
          this.disableRegistrationBtn = false;
        },
        error: (err) => {
          this._toastNotificationService.add("Erreur lors de la modification du mot de passe", "error");

          this.resetForm()
          this.btnSubmitRegistrationText = "Enregistrer les modification";
          this.disableRegistrationBtn = false;
        }
      });
    }

    if (
      this.user.firstName != this.form.get('firstName')?.value
      || this.user.lastName != this.form.get('lastName')?.value
      || this.user.email != this.form.get('email')?.value
    ) {
      const dtoUpdateUser: DtoOutputUpdateUser = {
        id: this.user.id,
        firstName: this.form.get("firstName")?.value,
        lastName: this.form.get("lastName")?.value,
        email: this.form.get("email")?.value,
      };

      this._userService.updateUser(dtoUpdateUser).subscribe({
        next: (user) => {
          this.authService.user = user;
          this.user = user;

          this._toastNotificationService.add("Informations personnelles modifiées", "success");

          this.resetForm()
          this.btnSubmitRegistrationText = "Enregistrer les modification";
          this.disableRegistrationBtn = false;
        },
        error: (err) => {
          if (err.status == 409)
            this._toastNotificationService.add(err.error, "error");
          else
            this._toastNotificationService.add("Erreur lors de la modification des Informations personnelles ", "error");

          this.resetForm()
          this.btnSubmitRegistrationText = "Enregistrer les modification";
          this.disableRegistrationBtn = false;
        }
      });
    }
  }

  onUploadPicture(event: any) {
    let profilePicture = event.target.files[0];

    if (this.authService.user)
      this._userService.updateProfilePicture(this.authService.user.id, profilePicture)
        .subscribe({
          next: (user) => this.authService.user = user,
          error: (err) => {
            if (err.status === 401)
              this._toastNotificationService.add(err.error, "error");
          }
        });
  }

  /**
   * If the user's first name, last name, or email address has changed, or if the password field is not empty, then the
   * data has been changed
   * @returns A boolean value.
   */
  dataHasBeenChanged(): boolean {
    return !(
      this.user.firstName != this.form.get('firstName')?.value
      || this.user.lastName != this.form.get('lastName')?.value
      || this.user.email != this.form.get('email')?.value
      || (this.showPwFields && this.form.get('password')?.value != "")
    );
  }

  /**
   * If the showPwFields variable is true, then set it to false. If the showPwFields variable is false, then set it to true
   */
  toggleDisplayNewPasswordField() {
    this.showPwFields = !this.showPwFields;
  }

  /**
   * Send a request to the server to remove the user's profile picture
   */
  removePp() {
    if (this.authService.user)
      this._userService.updateProfilePicture(this.authService.user.id, null)
        .subscribe({
          next: (user) => this.authService.user = user,
          error: (err) => {
            if (err.status === 401)
              this._toastNotificationService.add(err.error, "error");
          }
        });
  }
}
