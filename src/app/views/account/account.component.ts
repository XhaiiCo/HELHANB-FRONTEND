import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {ToastNotificationService} from "../../services/toast-notification.service";
import {Router} from "@angular/router";
import {DtoOutputRegistrationUser} from "../../dtos/user/dto-output-registration-user";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() firstName?: string = "Victor";
  @Input() lastName?: string = "Guillaume";
  @Input() email?: string = "gllme.victor@gmail.com";

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

  profilePicture: null | File = null;
  btnSubmitRegistrationText: string = "Enregistrer les modification";
  disableRegistrationBtn: boolean = false;
  showPwFields: boolean= false;

  constructor(private _fb: FormBuilder,
              public authService: AuthService,
              private _userService: UserService,
              private _toastNotificationService: ToastNotificationService,
              private _router: Router) {
    this.form.get('firstName')?.setValue(this.firstName);
    this.form.get('lastName')?.setValue(this.lastName);
    this.form.get('email')?.setValue(this.email);
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
    this.btnSubmitRegistrationText = "Modification...";
    this.disableRegistrationBtn = true;

    let user: DtoOutputRegistrationUser = {
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    /*this._authService.registration(user).subscribe({
      next: (user) => {
        this._authService.user = user;
        this._toastNotificationService.add(`Hello ${user.firstName}`, "success");

        if (this.profilePicture) {
          this._userService.updateProfilePicture(user.id, this.profilePicture).subscribe({
            next: (user) => this._authService.user = user,
            error: (err) => {
              if(err.status === 401)
                this._toastNotificationService.add(err.error, "error") ;
            }
          });
        }
        this._router.navigate(['']);
      },
      error: (err) => {
        this.btnSubmitRegistrationText = "Enregistrer les modification";
        this.disableRegistrationBtn = false;

        if (err.status === 409)
          this._toastNotificationService.add(err.error, "error");
        else
          this._toastNotificationService.add("Erreur de connexion au serveur", "error");
      }
    });*/
  }

  onUploadPicture(event: any) {
    this.profilePicture = event.target.files[0];
  }

  dataHasBeenChanged(): boolean {
    return !(
        this.firstName != this.form.get('firstName')?.value
        || this.lastName != this.form.get('lastName')?.value
        || this.email != this.form.get('email')?.value
        || (this.showPwFields && this.form.get('password')?.value != "")
        || this.form.get('profilePicture')?.value != ""
      );
  }

  toggleDisplayNewPasswordField() {
    this.showPwFields = !this.showPwFields;
  }
}
