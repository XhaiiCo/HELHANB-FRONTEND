import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordInputType: string = "password";

  constructor() { }

  ngOnInit(): void {
  }

  togglePasswordInputType() {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text': 'password' ;
  }
}
