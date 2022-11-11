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

  /**
   * It takes a user id and an image, and it returns an observable of the updated user
   * @param {number} id - number - the id of the user to update
   * @param {any} image - any - this is the image file that you want to upload.
   * @returns The user with the updated profile picture.
   */
  public updateProfilePicture(id: number, image: any): Observable<DtoInputUser>{
    let formData = new FormData() ;
    formData.append("profilePicture", image, image.name) ;
    return this._httpClient.post<DtoInputUser>(`${UserService.ENTRY_POINT_URL}/${id}/profilePicture`, formData) ;
  }

  public fetchAll(): Observable<DtoInputUser[]>{
    return this._httpClient.get<DtoInputUser[]>(`${UserService.ENTRY_POINT_URL}`) ;
  }

  /**
   * It deletes a user from the database.
   * @param {number} id - number - the id of the user to be deleted
   * @returns Observable<DtoInputUser>
   */
  public delete(id: number): Observable<DtoInputUser>{
    return this._httpClient.delete<DtoInputUser>(`${UserService.ENTRY_POINT_URL}/${id}`) ;
  }
}
