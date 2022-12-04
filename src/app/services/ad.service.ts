import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputCreateAd} from "../dtos/ad/dto-output-create-ad";
import {Observable} from "rxjs";
import {DtoInputCreateAd} from "../dtos/ad/dto-input-create-ad";
import {DtoInputAdSummary} from "../dtos/ad/dto-input-ad-summary";
import {DtoInputAd} from "../dtos/ad/dto-input-ad";
import {DtoInputAdPending} from "../dtos/ad/dto-input-ad-pending";
import {DtoOutputUpdateStatusAd} from "../dtos/ad/dto-output-update-status-ad";
import {DtoInputMyAds} from "../dtos/ad/dto-input-my-ads";
import {DtoOutputNewReservation} from "../dtos/ad/dto-output-new-reservation";

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

  count(): Observable<number> {
    return this._httpClient.get<number>(AdService.ENTRY_POINT_URL + '/count');
  }

  fetchForPagination(limit: number, offset: number):Observable<DtoInputAdSummary[]>
  {
    return this._httpClient.get<DtoInputAdSummary[]>(`${AdService.ENTRY_POINT_URL}/summary?limit=${limit}&offset=${offset}`);
  }

  fetchById(id: number): Observable<DtoInputAd> {
    return this._httpClient.get<DtoInputAd>(`${AdService.ENTRY_POINT_URL}/${id}`);
  }

  fetchAllPendings(): Observable<DtoInputAdPending[]>{
    return this._httpClient.get<DtoInputAdPending[]>(`${AdService.ENTRY_POINT_URL}?statusId=1`);
  }

  updateStatus(dto: DtoOutputUpdateStatusAd): Observable<DtoInputAdPending>{
    return this._httpClient.put<DtoInputAdPending>(`${AdService.ENTRY_POINT_URL}/status`, dto) ;
  }

  fetchMyAds(id: number): Observable<DtoInputMyAds[]>{
    return this._httpClient.get<DtoInputMyAds[]>(`${AdService.ENTRY_POINT_URL}/${id}/myAds`) ;
  }

  createReservation(adId: number, dto: DtoOutputNewReservation): Observable<any>{
   return this._httpClient.post<any>(`${AdService.ENTRY_POINT_URL}/${adId}/reservation`, dto) ;
  }
}
