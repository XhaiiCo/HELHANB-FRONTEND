import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordInputType: string = "password";
  passwordInputFocused: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  togglePasswordInputType() {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text': 'password' ;
  }

  togglePasswordInputFocused(){
    this.passwordInputFocused = !this.passwordInputFocused ;
  }
}
