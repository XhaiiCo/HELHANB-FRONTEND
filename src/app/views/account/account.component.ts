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
import {Base64Service} from "../../services/base64.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  profilePictureBaseUri: string = environment.pictureUrl;
  defaultProfilePicture: string = environment.defaultProfilePictureUrl;

  personalDataForm: FormGroup = this._fb.group({
    profilePicture: this._fb.control(""),
    firstName: this._fb.control("", [Validators.required]),
    lastName: this._fb.control("", [Validators.required]),
    email: this._fb.control("", [Validators.required, Validators.email]),
  });

  passwordForm: FormGroup = this._fb.group({
    password: this._fb.control("", [Validators.minLength(6), Validators.required]),
    confirmPassword: this._fb.control("", [Validators.minLength(6), Validators.required]),
  }, {
    validators: this.controlValuesAreEqual('password', 'confirmPassword')
  });

  btnSubmitPersonalDataText: string = "Enregistrer les modifications";
  disablePersonalDataBtn: boolean = false;

  btnSubmitPasswordText: string = "Enregistrer le mot de passe";
  disablePasswordBtn: boolean = false;

  showPwFields: boolean = false;
  user!: DtoInputUser;

  disableChangeProfilePictureBtn: boolean = false;

  constructor(
    private _fb: FormBuilder,
    public authService: AuthService,
    private _userService: UserService,
    private _toastNotificationService: ToastNotificationService,
    private _router: Router,
    private _base64Service: Base64Service,
  ) {
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

    this.personalDataForm.get('firstName')?.setValue(this.user.firstName);
    this.personalDataForm.get('lastName')?.setValue(this.user.lastName);
    this.personalDataForm.get('email')?.setValue(this.user.email);

    this.passwordForm.get('password')?.setValue("");
    this.passwordForm.get('confirmPassword')?.setValue("");
  }

  /**
   * Return is a field of the form is valid according to the validators options
   * @param fieldName the field name
   * @return true if the field name is valid, false otherwise
   */
  isInvalid(fieldName: string): boolean {
    return this.personalDataForm.get(fieldName)?.touched && this.personalDataForm.get(fieldName)?.dirty && this.personalDataForm.get(fieldName)?.invalid || false;
  }

  isPasswordEquals(): boolean {
    if (this.passwordForm.errors) {
      return this.passwordForm.errors['valuesDoNotMatch'];
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

  emitUpdatePasswordForm() {
    this.btnSubmitPasswordText = "Modification...";
    this.disablePasswordBtn = true;

    if (this.showPwFields && this.passwordForm.get("password")?.value != "") {
      //Update password

      const dtoPasswordUpdate: DtoOutputUpdatePassword = {
        id: this.user.id,
        password: this.passwordForm.get("password")?.value
      };

      this._userService.updatePassword(dtoPasswordUpdate).subscribe({
        next: (user) => {
          this._toastNotificationService.add("Mot de passe modifié", "success");

          this.resetForm()
          this.btnSubmitPasswordText = "Enregistrer le mot de passe";
          this.disablePasswordBtn = false;
        },
        error: (err) => {
          this._toastNotificationService.add("Erreur lors de la modification du mot de passe", "error");

          this.resetForm()
          this.btnSubmitPasswordText = "Enregistrer le mot de passe";
          this.disablePasswordBtn = false;
        }
      });
    }
  }

  emitUpdatePersonalDataForm() {
    this.btnSubmitPersonalDataText = "Modification...";
    this.disablePersonalDataBtn = true;

    if (
      this.user.firstName != this.personalDataForm.get('firstName')?.value
      || this.user.lastName != this.personalDataForm.get('lastName')?.value
      || this.user.email != this.personalDataForm.get('email')?.value
    ) {
      const dtoUpdateUser: DtoOutputUpdateUser = {
        id: this.user.id,
        firstName: this.personalDataForm.get("firstName")?.value,
        lastName: this.personalDataForm.get("lastName")?.value,
        email: this.personalDataForm.get("email")?.value,
      };

      this._userService.updateUser(dtoUpdateUser).subscribe({
        next: (user) => {
          this.authService.user = user;
          this.user = user;

          this._toastNotificationService.add("Informations personnelles modifiées", "success");

          this.resetForm()
          this.btnSubmitPersonalDataText = "Enregistrer les modifications";
          this.disablePersonalDataBtn = false;
        },
        error: (err) => {
          if (err.status == 409)
            this._toastNotificationService.add(err.error, "error");
          else
            this._toastNotificationService.add("Erreur lors de la modification des Informations personnelles ", "error");

          this.resetForm()
          this.btnSubmitPersonalDataText = "Enregistrer les modifications";
          this.disablePersonalDataBtn = false;
        }
      });
    }
  }

  onUploadPicture(event: any) {
    this.disableChangeProfilePictureBtn = true ;
    let profilePicture = event.target.files[0];
    if (this.authService.user)
      this._base64Service.fileToBase64(profilePicture).subscribe(base64 => {
        this._userService.updateProfilePicture({profilePicture: base64})
          .subscribe({
            next: (user) => {
              this.authService.user = user ;
              this.disableChangeProfilePictureBtn = false ;
            },
            error: (err) => {
              this.disableChangeProfilePictureBtn = false;
              if (err.status === 401)
                this._toastNotificationService.add(err.error, "error");
            }
          });
      });
    else
      this.disableChangeProfilePictureBtn = false ;
  }

  /**
   * If the user's first name, last name, or email address has changed, or if the password field is not empty, then the
   * data has been changed
   * @returns A boolean value.
   */
  dataHasBeenChanged(): boolean {
    return !(
      this.user.firstName != this.personalDataForm.get('firstName')?.value
      || this.user.lastName != this.personalDataForm.get('lastName')?.value
      || this.user.email != this.personalDataForm.get('email')?.value);
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
      this._userService.updateProfilePicture({profilePicture: null})
        .subscribe({
          next: (user) => this.authService.user = user,
          error: (err) => {
            if (err.status === 401)
              this._toastNotificationService.add(err.error, "error");
          }
        });
  }
}
