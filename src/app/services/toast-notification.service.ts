import { Injectable } from '@angular/core';
import {ToastNotification} from "../interfaces/toastNotification";

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  notifications: ToastNotification[] = [] ;
  private readonly possibleTypes: string[] = ["success", "error", "info"];
  private readonly defaultType: string = "info" ;
  private id: number = 1 ;

  constructor() { }

  /**
   * We're adding a new notification to the array of notifications, and then we're removing it after 5 seconds
   * @param {string} content - The content of the notification.
   * @param {string} [type=info] - The type of the notification (success, error or info).
   */
  add(content: string, type: string = "info"): void{
    if(!this.possibleTypes.includes(type)) type = this.defaultType ;
    let newNotification: ToastNotification = {
      id: ++this.id,
      content: content,
      type: type,
      isRemove: false,
    }

    this.notifications.push(newNotification) ;

    setTimeout(() => this.remove(newNotification.id), 5000) ;
  }

  /**
   * @param {number} id - The id of the notification.
   */
  remove(id: number){
    let notif = this.notifications.find(value => value.id == id) ;
    if(notif)
      notif.isRemove = true ;

    setTimeout(() => {
      this.notifications = this.notifications.filter(value => value.id != id) ;
    }, 750) ;
  }
}
