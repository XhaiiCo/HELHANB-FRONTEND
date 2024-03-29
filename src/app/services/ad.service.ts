import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputCreateAd} from "../dtos/ad/dto-output-create-ad";
import {Observable} from "rxjs";
import {DtoInputCreateAd} from "../dtos/ad/dto-input-create-ad";
import {DtoInputAdSummary} from "../dtos/ad/dto-input-ad-summary";
import {DtoInputAd} from "../dtos/ad/dto-input-ad";
import {DtoOutputUpdateStatusAd} from "../dtos/ad/dto-output-update-status-ad";
import {DtoInputMyAds} from "../dtos/ad/dto-input-my-ads";
import {DtoOutputNewReservation} from "../dtos/reservation/dto-output-new-reservation";
import {DtoInputAdWithReservation} from "../dtos/ad/dto-input-ad-with-reservation";
import {DtoOutputUpdateAd} from "../dtos/ad/dto-output-update-ad";
import {DtoInputReservation} from "../dtos/reservation/dto-input-reservation";
import {DtoInputAdReservation} from "../dtos/ad/dto-input-my-ads";
import { DtoOutputConfirmRefuseReservation } from '../dtos/reservation/dto-output-confirm-refuse-reservation';

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

  update(dto: DtoOutputUpdateAd): Observable<DtoInputAd> {
    return this._httpClient.put<DtoInputAd>(`${AdService.ENTRY_POINT_URL}/adUpdate`, dto);
  }

  delete(adSlug: string): Observable<DtoInputAd> {
    return this._httpClient.delete<DtoInputAd>(`${AdService.ENTRY_POINT_URL}/${adSlug}`);
  }

  countForAdminAds(adName?: string): Observable<number>{

    let httpParams = new URLSearchParams;

    if(adName) httpParams.set("name", adName);

    return this._httpClient.get<number>(`${AdService.ENTRY_POINT_URL}/count?${httpParams.toString()}`);
  }

  fetchForAdminAds(limit: number, offset: number, adName?: string): Observable<DtoInputAd[]>{

    let httpParams = new URLSearchParams;

    httpParams.set("limit", limit.toString());
    httpParams.set("offset", offset.toString());

    if(adName) httpParams.set("name", adName);

    return this._httpClient.get<DtoInputAd[]>(`${AdService.ENTRY_POINT_URL}?${httpParams.toString()}`);
  }

  countForAdminAdsToValidate(adName?: string): Observable<number>{
    let httpParams = new URLSearchParams;

    httpParams.set("statusId", "1");

    if(adName) httpParams.set("name", adName);

    return this._httpClient.get<number>(`${AdService.ENTRY_POINT_URL}/count?${httpParams.toString()}`);
  }

  fetchForAdminAdsToValidate(limit: number, offset: number, adName?: string): Observable<DtoInputAd[]>{

    let httpParams = new URLSearchParams;

    httpParams.set("limit", limit.toString());
    httpParams.set("offset", offset.toString());
    httpParams.set("statusId", "1");

    if(adName) httpParams.set("name", adName);

    return this._httpClient.get<DtoInputAd[]>(`${AdService.ENTRY_POINT_URL}?${httpParams.toString()}`);
  }

  countForHomePagePagination(params : any): Observable<number> {

    let httpParams = new URLSearchParams;

    httpParams.set("statusId", "3");

    if(params.get('adName')) httpParams.set("name", params.get('adName'));
    if(params.get('country')) httpParams.set("country", params.get('country'));
    if(params.get('city')) httpParams.set("city", params.get('city'));
    if(params.get('pricePerNight')) httpParams.set("pricePerNight", params.get('pricePerNight'));
    if(params.get('numberOfPersons')) httpParams.set("numberOfPersons", params.get('numberOfPersons'));
    if(params.get('arrivalDate')) httpParams.set("arrivalDate", params.get('arrivalDate'));
    if(params.get('leaveDate')) httpParams.set("leaveDate", params.get('leaveDate'));

    return this._httpClient.get<number>(`${AdService.ENTRY_POINT_URL}/count?${httpParams.toString()}`);
  }

  fetchForHomePagePagination(limit: number, offset: number, params : any): Observable<DtoInputAdSummary[]> {

    let httpParams = new URLSearchParams;

    httpParams.set("limit", limit.toString());
    httpParams.set("offset", offset.toString());

    httpParams.set("statusId", "3");

    if(params.get('adName')) httpParams.set("name", params.get('adName'));
    if(params.get('country')) httpParams.set("country", params.get('country'));
    if(params.get('city')) httpParams.set("city", params.get('city'));
    if(params.get('pricePerNight')) httpParams.set("pricePerNight", params.get('pricePerNight'));
    if(params.get('numberOfPersons')) httpParams.set("numberOfPersons", params.get('numberOfPersons'));
    if(params.get('arrivalDate')) httpParams.set("arrivalDate", params.get('arrivalDate'));
    if(params.get('leaveDate')) httpParams.set("leaveDate", params.get('leaveDate'));

    return this._httpClient.get<DtoInputAdSummary[]>(`${AdService.ENTRY_POINT_URL}/summary?${httpParams.toString()}`);
  }

  fetchBySlug(slug: string): Observable<DtoInputAdWithReservation> {
    return this._httpClient.get<DtoInputAdWithReservation>(`${AdService.ENTRY_POINT_URL}/${slug}`);
  }

  updateStatus(dto: DtoOutputUpdateStatusAd): Observable<DtoInputAd> {
    return this._httpClient.put<DtoInputAd>(`${AdService.ENTRY_POINT_URL}/status`, dto);
  }

  fetchMyAds(): Observable<DtoInputMyAds[]> {
    return this._httpClient.get<DtoInputMyAds[]>(`${AdService.ENTRY_POINT_URL}/myAds`);
  }

  createReservation(dto: DtoOutputNewReservation): Observable<any> {
    return this._httpClient.post<any>(`${AdService.ENTRY_POINT_URL}/reservation`, dto);
  }

  fetchMyReservations(): Observable<DtoInputReservation[]> {
    return this._httpClient.get<DtoInputReservation[]>(`${AdService.ENTRY_POINT_URL}/myReservations`);
  }

  fetchAllReservationsByAdSlug(adSlug: string): Observable<DtoInputAdReservation[]> {
    return this._httpClient.get<DtoInputAdReservation[]>(`${AdService.ENTRY_POINT_URL}/${adSlug}/reservation`);
  }

  confirmReservation(reservation: DtoOutputConfirmRefuseReservation): Observable<DtoInputAdReservation> {
    return this._httpClient.put<DtoInputAdReservation>(`${AdService.ENTRY_POINT_URL}/confirmReservation`, reservation);
}

  refuseReservation(reservation: DtoOutputConfirmRefuseReservation): Observable<DtoInputAdReservation> {
    return this._httpClient.put<DtoInputAdReservation>(`${AdService.ENTRY_POINT_URL}/refuseReservation`, reservation);
  }

  removeReservation(reservationId: number): Observable<DtoInputReservation> {
    return this._httpClient.delete<DtoInputReservation>(`${AdService.ENTRY_POINT_URL}/reservation/${reservationId}`);
  }

  fetchCountries(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${AdService.ENTRY_POINT_URL}/countries`);
  }

  fetchCities(country: string): Observable<string[]> {
    return this._httpClient.get<string[]>(`${AdService.ENTRY_POINT_URL}/cities?country=${country}`);
  }
}
