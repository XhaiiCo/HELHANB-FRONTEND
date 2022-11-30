import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputCreatedConversation} from "../dtos/conversation/dto-input-created-conversation";
import {DtoOutputCreateConversation} from "../dtos/conversation/dto-output-create-conversation";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private static readonly ENTRY_POINT_URL = environment.apiUrl + "conversation";

  constructor(private _httpClient: HttpClient) {
  }

  create(dto: DtoOutputCreateConversation): Observable<DtoInputCreatedConversation> {
    return this._httpClient.post<DtoInputCreatedConversation>(`${ConversationService.ENTRY_POINT_URL}`, dto);
  }

}
