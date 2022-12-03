import {Component, OnInit} from '@angular/core';
import {DtoInputMyConversations} from "../../dtos/conversation/dto-input-my-conversations";
import {ConversationService} from "../../services/conversation.service";
import {AuthService} from "../../services/auth.service";
import {DtoInputMessageOfAConversation} from "../../dtos/conversation/dto-input-message-of-a-conversation";
import {Router} from "@angular/router";
import {ChatService} from "../../services/chat.service";
import {DtoOutputMessageHub} from "../../dtos/conversation/dto-output-message-hub";
import {DtoInputMessageHub} from "../../dtos/conversation/dto-input-message-hub";
import {DtoOutputMessage} from "../../dtos/conversation/dto-output-message";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  conversations: DtoInputMyConversations[] = [];
  currentConversation!: DtoInputMyConversations;
  currentMessageList: DtoInputMessageOfAConversation[] = [];
  profilePictureBaseUri: string = environment.pictureUrl;
  pageLoaded: boolean = false ;
  constructor(private _conversationService: ConversationService,
              private _authService: AuthService,
              private _router: Router,
              private _chatService: ChatService) {
  }

  ngOnInit(): void {
    if (!this._authService.user) return;

    this._conversationService.fetchMyConversations(this._authService.user.id).subscribe(conversations => {
      this.conversations = conversations ;
      this.pageLoaded = true ;
    });

    this._chatService.start().then(r =>
      this._chatService.retrieveMappedObject().subscribe((receivedObj: DtoInputMessageHub) => {
        const newMessage: DtoInputMessageOfAConversation = {
          content: receivedObj.message,
          senderId: receivedObj.senderId,
          sendTime: new Date(Date.now())
        }

        this.currentMessageList.push(newMessage)
      })
    );
  }

  send(msg: string): void {
    if (!this._authService.user) return;

    const dtoOutputMessageHub: DtoOutputMessageHub = {
      message: msg,
      recipientId: this.currentConversation.recipient.id,
      senderId: this._authService.user.id
    }
    const dtoOutputMessage: DtoOutputMessage = {
      content: msg,
      senderId: this._authService.user.id,
      conversationId: this.currentConversation.id,
    }


    this._conversationService.createMessage(dtoOutputMessage).subscribe(
      (newMessage) => {
        this.currentMessageList.push(newMessage);
        this._chatService.sendMessage(dtoOutputMessageHub);
      }
    )
  }

  changeCurrentConversation(conversation: DtoInputMyConversations) {
    this.currentConversation = conversation;
    this._conversationService.fetchMessagesOfAConversation(conversation.id).subscribe(messages => {
      this.currentMessageList = messages
    });
  }
}
