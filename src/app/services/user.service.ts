import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputUser} from "../dtos/auth/dto-input-user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly ENTRY_POINT_URL = environment.apiUrl + "users" ;

  constructor(private _httpClient: HttpClient) { }

  public updateProfilePicture(id: number, image: any): Observable<string>{
    let formData = new FormData() ;
    formData.append("profilePicture", image, image.name) ;
    return this._httpClient.post<string>(`${UserService.ENTRY_POINT_URL}/${id}/profilePicture`, formData) ;
  }
}
