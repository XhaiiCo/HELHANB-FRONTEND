import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';          // import signalR
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {dtoOutputMessage} from "../dtos/conversation/dto-output-message";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private  connection: any = new signalR.HubConnectionBuilder().withUrl("https://localhost:7182/chatsocket")   // mapping to the chathub as in startup.cs
    .configureLogging(signalR.LogLevel.Information)
    .build();
  readonly POST_URL = "https://localhost:7182/api/chat/send"

  private receivedMessageObject: dtoOutputMessage = new dtoOutputMessage();
  private sharedObj = new Subject<dtoOutputMessage>();

  constructor(private http: HttpClient) {
    this.connection.on("ReceiveOne", (user: string, message: string) => { this.mapReceivedMessage(user, message); });
  }


  // Start the connection
  public async start() {
    try {
      await this.connection.start();
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private mapReceivedMessage(user: string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.msgText = message;
    this.sharedObj.next(this.receivedMessageObject);
  }

  /* ****************************** Public Mehods **************************************** */

  // Calls the controller method
  public sendMessage(msgDto: dtoOutputMessage) {
    this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText, msgDto.group);
  }

  public retrieveMappedObject(): Observable<dtoOutputMessage> {
    return this.sharedObj.asObservable();
  }

}
