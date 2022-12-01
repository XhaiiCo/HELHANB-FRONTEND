import {Injectable, OnInit} from '@angular/core';
import * as signalR from '@microsoft/signalr';          // import signalR
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {DtoOutputMessageHub} from "../dtos/conversation/dto-output-message-hub";
import {DtoInputMessageHub} from "../dtos/conversation/dto-input-message-hub";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private connection: any = new signalR.HubConnectionBuilder().withUrl("https://localhost:7182/chatsocket")   // mapping to the chathub as in startup.cs
    .configureLogging(signalR.LogLevel.Information)
    .build();
  readonly POST_URL = "https://localhost:7182/api/chat/send"

  private receivedMessageObject: DtoInputMessageHub = {message: "", senderId: 0, sendTime: new Date(Date.now())};
  private sharedObj = new Subject<DtoInputMessageHub>();

  constructor(private http: HttpClient) {
    this.connection.on("ReceiveOne", (message: string, senderId: number) => {
      this.mapReceivedMessage(message, senderId);
    });
  }


  // Start the connection
  public async start() {
    await this.connection.stop();
    try {
      await this.connection.start();
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private mapReceivedMessage(message: string, senderId: number): void {
    this.receivedMessageObject.message = message;
    this.receivedMessageObject.senderId = senderId;
    this.receivedMessageObject.sendTime = new Date(Date.now());
    this.sharedObj.next(this.receivedMessageObject);
  }

  // Calls the controller method
  public sendMessage(msgDto: DtoOutputMessageHub) {
    this.connection.invoke("SendMessage1", msgDto.message, msgDto.recipientId, msgDto.senderId);
  }

  public retrieveMappedObject(): Observable<DtoInputMessageHub> {
    return this.sharedObj.asObservable();
  }
}
