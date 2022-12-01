import {Component, OnInit} from '@angular/core';
import {DtoInputMyConversations} from "../../dtos/conversation/dto-input-my-conversations";
import {ConversationService} from "../../services/conversation.service";
import {AuthService} from "../../services/auth.service";
import {DtoInputMessageOfAConversation} from "../../dtos/conversation/dto-input-message-of-a-conversation";
import {Router} from "@angular/router";
import {ChatService} from "../../services/chat.service";
import {dtoOutputMessage} from "../../dtos/conversation/dto-output-message";

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  conversations: DtoInputMyConversations[] = [];
  currantConversation!: DtoInputMyConversations;
  currantMessageList: DtoInputMessageOfAConversation[] = [];

  constructor(private _conversationService: ConversationService,
              private _authService: AuthService,
              private _router: Router,
              private _chatService: ChatService) {
  }

  ngOnInit(): void {
    if (!this._authService.user) return;

    this._conversationService.fetchMyConversations(this._authService.user.id).subscribe(conversations => this.conversations = conversations);

    this._chatService.start().then(r =>
      this._chatService.retrieveMappedObject().subscribe((receivedObj: dtoOutputMessage) => {
        //     this.addToInbox(receivedObj);
      })  // calls the service method to get the new messages sent
    );
  }

  send(msg: dtoOutputMessage): void {
    this._chatService.sendMessage(msg);
  }

  changeCurrantConversation(conversation: DtoInputMyConversations) {
    this.currantConversation = conversation;
    this._conversationService.fetchMessagesOfAConversation(conversation.id).subscribe(messages => {
      this.currantMessageList = messages
      console.log(this.currantMessageList);
    });
  }
}
