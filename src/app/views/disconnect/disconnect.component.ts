import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ToastNotificationService} from "../../services/toast-notification.service";

@Component({
  selector: 'app-disconnect',
  templateUrl: './disconnect.component.html',
  styleUrls: ['./disconnect.component.scss']
})
export class DisconnectComponent implements OnInit {

  constructor(private _router: Router,
        private _authService: AuthService,
        private _toastNotification: ToastNotificationService) { }

  /**
   * Disconnect the user
   */
  ngOnInit(): void {
    this._authService.disconnect().subscribe({
      next: () => {
        this._authService.user = null ;
        this._toastNotification.add("Déconnecté avec succès", "success") ;
        this._router.navigate(['']) ;
      }
    }) ;
  }

}
