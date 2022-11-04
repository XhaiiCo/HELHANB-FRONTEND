import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DtoOutputLoginUser} from "../dtos/auth/dto-output-login-user";
import {DtoOutputRegistrationUser} from "../dtos/auth/dto-output-registration-user";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DtoInputUserRegistration} from "../dtos/auth/dto-input-user-registration";
import {DtoInputUserLogin} from "../dtos/auth/dto-input-user-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly ENTRY_POINT_URL = environment.apiUrl + "users" ;

  constructor(private _httpClient: HttpClient) { }

  public login(user: DtoOutputLoginUser): Observable<DtoInputUserLogin>{
    return this._httpClient.post<DtoInputUserLogin>(`${AuthService.ENTRY_POINT_URL}/login`, user);
  }

  public registration(user: DtoOutputRegistrationUser): Observable<DtoInputUserRegistration>{
    return this._httpClient.post<DtoInputUserRegistration>(AuthService.ENTRY_POINT_URL, user) ;
  }
}
