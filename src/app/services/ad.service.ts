import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputCreateAd} from "../dtos/ad/dto-output-create-ad";
import {Observable} from "rxjs";
import {DtoInputUser} from "../dtos/user/dto-input-user";
import {DtoInputCreateAd} from "../dtos/ad/dto-input-create-ad";
import * as http from "http";
import {ImgData} from "../interfaces/img-data";

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private static readonly ENTRY_POINT_URL = environment.apiUrl + "ad";

  constructor(private _httpClient: HttpClient) {
  }


  create(dto: DtoOutputCreateAd): Observable<DtoInputCreateAd> {
    return this._httpClient.post<DtoInputCreateAd>(`${AdService.ENTRY_POINT_URL}`, dto);
  }

  addImg(id: number, image: File): Observable<{ id: string; path: string }> {
    let formData = new FormData();
    if (image)
      formData.append("picture", image, image.name);
    return this._httpClient.post<{ id: string, path: string }>(`${AdService.ENTRY_POINT_URL}/${id}/picture`, formData);
  }


}
