import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {ToastNotificationService} from "./services/toast-notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'HELHANB';

  constructor(private _AuthService: AuthService,
              private _ToastNotificationService: ToastNotificationService) {}

  ngOnInit(): void {
    this._AuthService.isConnected().subscribe(
      (user) => {
        this._AuthService.user = user ;
        setTimeout(() => {
          this._ToastNotificationService.add(`Hello ${user.firstName}`, "info") ;
        },500) ;
      }
    )
  }
}
