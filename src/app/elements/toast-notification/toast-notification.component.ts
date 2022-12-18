import {Component, OnInit} from '@angular/core';
import {ToastNotificationService} from "../../services/toast-notification.service";

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss']
})
export class ToastNotificationComponent implements OnInit {

  constructor(
    public toastNotificationService: ToastNotificationService
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * @param {number} id - The id of the notification to remove.
   */
  removeNotification(id: number) {
    this.toastNotificationService.remove(id);
  }
}
