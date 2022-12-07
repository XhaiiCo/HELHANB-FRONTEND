import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DtoOutputLoginUser} from "../dtos/user/dto-output-login-user";
import {DtoOutputRegistrationUser} from "../dtos/user/dto-output-registration-user";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DtoInputUser} from "../dtos/user/dto-input-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: DtoInputUser | null = null;

  private static readonly ENTRY_POINT_URL = environment.apiUrl + "users";

  constructor(private _httpClient: HttpClient) {
  }

  public login(user: DtoOutputLoginUser): Observable<DtoInputUser> {
    return this._httpClient.post<DtoInputUser>(`${AuthService.ENTRY_POINT_URL}/login`, user);
  }

  public registration(user: DtoOutputRegistrationUser): Observable<DtoInputUser> {
    return this._httpClient.post<DtoInputUser>(`${AuthService.ENTRY_POINT_URL}/registration`, user);
  }

  public disconnect(): Observable<any> {
    return this._httpClient.get(`${AuthService.ENTRY_POINT_URL}/disconnect`);
  }

  public connectUser(): Observable<DtoInputUser> {
    return this._httpClient.get<DtoInputUser>(`${AuthService.ENTRY_POINT_URL}/connected`);
  }

  isConnected(): boolean {
    return this.user !== null;
  }

  isUser(): boolean {
    return this.user?.role.name === "utilisateur";
  }

  isAdmin(): boolean {
    return this.user?.role.name === "administrateur" || this.user?.role.name === "super-administrateur";
  }

  isHost(): boolean {
    return this.user?.role.name === "hote";
  }
}
