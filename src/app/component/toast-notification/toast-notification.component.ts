import { Component, OnInit } from '@angular/core';
import {ToastNotification} from "../../interfaces/toastNotification";
import {ToastNotificationService} from "../../services/toast-notification.service";

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss']
})
export class ToastNotificationComponent implements OnInit {

  constructor(public toastNotificationService: ToastNotificationService) { }

  ngOnInit(): void {
  }

  removeNotification(id: number) {
    this.toastNotificationService.remove(id) ;
  }
}
