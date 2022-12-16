import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputCreatedConversation} from "../dtos/conversation/dto-input-created-conversation";
import {DtoOutputCreateConversation} from "../dtos/conversation/dto-output-create-conversation";
import {DtoInputMyConversations} from "../dtos/conversation/dto-input-my-conversations";
import {DtoInputMessageOfAConversation} from "../dtos/conversation/dto-input-message-of-a-conversation";
import {DtoInputMessageHub} from "../dtos/conversation/dto-input-message-hub";
import {DtoOutputMessage} from "../dtos/conversation/dto-output-message";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private static readonly ENTRY_POINT_URL = environment.apiUrl + "conversation";

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) {
  }

  create(dto: DtoOutputCreateConversation): Observable<DtoInputCreatedConversation> {
    return this._httpClient.post<DtoInputCreatedConversation>(`${ConversationService.ENTRY_POINT_URL}`, dto);
  }

  createMessage(dto: DtoOutputMessage): Observable<DtoInputMessageOfAConversation> {
    return this._httpClient.post<DtoInputMessageOfAConversation>(`${ConversationService.ENTRY_POINT_URL}/messages`, dto);
  }

  fetchMyConversations(): Observable<DtoInputMyConversations[]> {
    return this._httpClient.get<DtoInputMyConversations[]>(`${ConversationService.ENTRY_POINT_URL}/myConversations`);
  }

  fetchMessagesOfAConversation(conversationId: number): Observable<DtoInputMessageOfAConversation[]> {
    return this._httpClient.get<DtoInputMessageOfAConversation[]>(`${ConversationService.ENTRY_POINT_URL}/${conversationId}/messages`);
  }

  putMessageViewToTrue(conversationId: number): Observable<any> {
    return this._httpClient.put<any>(`${ConversationService.ENTRY_POINT_URL}/${conversationId}/view`, {});
  }

  redirectToTheConversationPage(idUser1: number, idUser2: number) {
    let dto: DtoOutputCreateConversation = {
      idUser1: idUser1,
      idUser2: idUser2,
    }

    this.create(dto)
      .subscribe({
        next: conversation => {
          this._router.navigate(['/conversations/' + conversation.id]);
        },
        error: err => {
          console.log(err);
        }
      });
  }
}
