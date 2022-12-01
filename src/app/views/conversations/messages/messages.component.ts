import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {dtoOutputMessage} from "../../../dtos/conversation/dto-output-message";
import {Router} from "@angular/router";
import {DtoInputMessageOfAConversation} from "../../../dtos/conversation/dto-input-message-of-a-conversation";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  msgDto: dtoOutputMessage = new dtoOutputMessage();
  @Input() msgInboxArray: DtoInputMessageOfAConversation[] = [];
  @Output() sendMessage: EventEmitter<dtoOutputMessage> = new EventEmitter<dtoOutputMessage>() ;

  constructor(private chatService: ChatService, private _router: Router) {
  }

  ngOnInit(): void {
  }



  addToInbox(obj: dtoOutputMessage) {
  }
}
