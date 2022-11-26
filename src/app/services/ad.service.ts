import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputCreateAd} from "../dtos/ad/dto-output-create-ad";
import {Observable} from "rxjs";
import {DtoInputCreateAd} from "../dtos/ad/dto-input-create-ad";
import {DtoInputAdSummary} from "../dtos/ad/dto-input-ad-summary";

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

  count(): Observable<number> {
    return this._httpClient.get<number>(AdService.ENTRY_POINT_URL + '/count');
  }

  fetchForPagination(limit: number, offset: number):Observable<DtoInputAdSummary[]>
  {
    return this._httpClient.get<DtoInputAdSummary[]>(`${AdService.ENTRY_POINT_URL}/summary?limit=${limit}&offset=${offset}`);
  }
}