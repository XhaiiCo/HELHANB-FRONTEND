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

  add(content: string, type: string): void{
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

  remove(id: number){
    let notif = this.notifications.find(value => value.id == id) ;
    if(notif)
      notif.isRemove = true ;

    setTimeout(() => {
      this.notifications = this.notifications.filter(value => value.id != id) ;
    }, 1000) ;
  }
}
