import {Component, OnInit} from '@angular/core';
import {DtoInputMyConversations} from "../../dtos/conversation/dto-input-my-conversations";
import {ConversationService} from "../../services/conversation.service";
import {AuthService} from "../../services/auth.service";
import {DtoInputMessageOfAConversation} from "../../dtos/conversation/dto-input-message-of-a-conversation";
import {Router} from "@angular/router";

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  conversations: DtoInputMyConversations[] = [];
  currantConversation!: DtoInputMyConversations ;
  currantMessageList: DtoInputMessageOfAConversation[] = [];

  constructor(private _conversationService: ConversationService, private _authService: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
    if (!this._authService.user) return;

    this._conversationService.fetchMyConversations(this._authService.user.id).subscribe(conversations => this.conversations = conversations);
  }

  changeCurrantConversation(conversation: DtoInputMyConversations) {
    this.currantConversation = conversation ;
    this._conversationService.fetchMessagesOfAConversation(conversation.id).subscribe(messages => {
      this.currantMessageList = messages
      console.log(this.currantMessageList);
    }) ;
  }
}
