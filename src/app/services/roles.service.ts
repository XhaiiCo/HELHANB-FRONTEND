import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DtoInputRole} from "../dtos/roles/dto-input-role";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private static readonly ENTRY_POINT_URL = environment.apiUrl + "roles";

  constructor(private _httpClient: HttpClient) {
  }

  public fetchAll(): Observable<DtoInputRole[]> {
    return this._httpClient.get<DtoInputRole[]>(`${RolesService.ENTRY_POINT_URL}`);
  }
}
