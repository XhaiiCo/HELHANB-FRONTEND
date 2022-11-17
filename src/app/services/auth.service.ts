import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DtoOutputLoginUser} from "../dtos/auth/dto-output-login-user";
import {DtoOutputRegistrationUser} from "../dtos/auth/dto-output-registration-user";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DtoInputUser} from "../dtos/auth/dto-input-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: DtoInputUser | null = null ;

  private static readonly ENTRY_POINT_URL = environment.apiUrl + "users" ;

  constructor(private _httpClient: HttpClient) { }

  public login(user: DtoOutputLoginUser): Observable<DtoInputUser>{
    return this._httpClient.post<DtoInputUser>(`${AuthService.ENTRY_POINT_URL}/login`, user);
  }

  public registration(user: DtoOutputRegistrationUser): Observable<DtoInputUser>{
    return this._httpClient.post<DtoInputUser>(`${AuthService.ENTRY_POINT_URL}/registration`, user) ;
  }

  public disconnect(): Observable<any> {
    return this._httpClient.get(`${AuthService.ENTRY_POINT_URL}/disconnect`) ;
  }

  public connectUser(): Observable<DtoInputUser>{
    return this._httpClient.get<DtoInputUser>(`${AuthService.ENTRY_POINT_URL}/connected`) ;
  }

  isUser(): boolean{
    return this.user?.role.name === "user" ;
  }
  isAdmin(): boolean{
    return this.user?.role.name === "administrateur" ;
  }

  isHost(): boolean{
    return this.user?.role.name === "hote" ;
  }
}
