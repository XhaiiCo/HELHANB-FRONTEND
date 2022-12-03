import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {DtoOutputMessageHub} from "../../../dtos/conversation/dto-output-message-hub";
import {Router} from "@angular/router";
import {DtoInputMessageOfAConversation} from "../../../dtos/conversation/dto-input-message-of-a-conversation";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @Input() msgInboxArray: DtoInputMessageOfAConversation[] = [];
  @Output() sendMessage: EventEmitter<string> = new EventEmitter<string>() ;
  message: string = "" ;
  @Input() recipientId!: number ;

  constructor(private chatService: ChatService, private _router: Router) {
  }

  ngOnInit(): void {
  }

  send() {
    this.sendMessage.emit(this.message) ;
    this.message = "" ;
  }
}
