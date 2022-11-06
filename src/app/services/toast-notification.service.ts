import { Injectable } from '@angular/core';
import {ToastNotification} from "../interfaces/toastNotification";

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  notifications: ToastNotification[] = [] ;
  private readonly possibleTypes: string[] = ["success", "error", "info"];
  private readonly defaultType: string = "info" ;

  constructor() { }

  add(content: string, type: string): void{
    if(!this.possibleTypes.includes(type)) type = this.defaultType ;
    let newNotification: ToastNotification = {
      id: this.generateNewId(),
      content: content,
      type: type,
    }

    this.notifications.push(newNotification) ;
  }

  remove(id: number){
    this.notifications = this.notifications.filter(value => value.id != id) ;
    console.log(this.notifications);
  }
  private generateNewId(): number{
    if(this.notifications.length)
      return this.notifications.map(value => value.id).reduce((a, b) => Math.max(a, b)) + 1 ;

    return 0 ;
  }
}