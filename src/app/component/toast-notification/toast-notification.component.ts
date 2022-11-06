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
    /*this.toastNotificationService.add("test success", "success") ;
    this.toastNotificationService.add("test info", "info") ;
    this.toastNotificationService.add("test error", "error") ;*/
  }

  removeNotification(id: number) {
    this.toastNotificationService.remove(id) ;
  }
}
