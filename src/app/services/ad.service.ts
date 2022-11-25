import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputCreateAd} from "../dtos/ad/dto-output-create-ad";
import {Observable} from "rxjs";
import {DtoInputUser} from "../dtos/user/dto-input-user";
import {DtoInputCreateAd} from "../dtos/ad/dto-input-create-ad";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private static readonly ENTRY_POINT_URL = environment.apiUrl + "ad" ;

  constructor(private _httpClient: HttpClient) {}


  create(dto: DtoOutputCreateAd): Observable<DtoInputCreateAd>{
    return this._httpClient.post<DtoInputCreateAd>(`${AdService.ENTRY_POINT_URL}`, dto) ;
  }

  count(): Observable<number>
  {
    return this._httpClient.get<number>(AdService.ENTRY_POINT_URL + '/count');
  }

}
