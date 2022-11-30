import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {MessageDto} from "../../../dtos/conversation/MessageDto";
import {NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private chatService: ChatService, private _router: Router) {
  }

  ngOnInit(): void {
    this.chatService.start().then(r =>
      this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDto) => {
        this.addToInbox(receivedObj);
      })  // calls the service method to get the new messages sent
    );
  }

  msgDto: MessageDto = new MessageDto();
  msgInboxArray: MessageDto[] = [];

  send(): void {
    if (this.msgDto) {
      if (this.msgDto.user.length == 0 || this.msgDto.user.length == 0) {
        window.alert("Both fields are required.");
        return;
      } else {
        this.chatService.sendMessage(this.msgDto);                   // Send the message via a service
      }
    }
  }

  addToInbox(obj: MessageDto) {
    let newObj = new MessageDto();
    newObj.user = obj.user;
    newObj.msgText = obj.msgText;
    newObj.group = obj.group;
    this.msgInboxArray.push(newObj);
  }
}
