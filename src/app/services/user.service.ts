import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputUser} from "../dtos/user/dto-input-user";
import {DtoOutputFilteringUsers} from "../dtos/user/dto-output-filtering-users";
import {DtoOutputUpdatePassword} from "../dtos/user/dto-output-update-password";
import {DtoOutputUpdateUser} from "../dtos/user/dto-output-update-user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly ENTRY_POINT_URL = environment.apiUrl + "users";

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * It takes a user id and an image, and it returns an observable of the updated user
   * @param {number} id - number - the id of the user to update
   * @param {any} image - any - this is the image file that you want to upload.
   * @returns The user with the updated profile picture.
   */
  public updateProfilePicture(id: number, image: any): Observable<DtoInputUser> {
    let formData = new FormData();
    if(image)
      formData.append("profilePicture", image, image.name);
    return this._httpClient.put<DtoInputUser>(`${UserService.ENTRY_POINT_URL}/${id}/profilePicture`, formData);
  }

  /**
   * It fetches all users from the server, optionally filtering them by role and/or search term
   * @param {DtoOutputFilteringUsers} [filter] - DtoOutputFilteringUsers
   * @returns An observable of an array of DtoInputUser objects.
   */
  public fetchAll(filter?: DtoOutputFilteringUsers): Observable<DtoInputUser[]> {
    let httpParams = new URLSearchParams();

    if (filter) {
      if (filter.role !== "")
        httpParams.set("role", filter.role);

      if (filter.search !== "")
        httpParams.set("search", filter.search);
    }

    return this._httpClient.get<DtoInputUser[]>(`${UserService.ENTRY_POINT_URL}?${httpParams.toString()}`);
  }

  /**
   * It deletes a user from the database.
   * @param {number} id - number - the id of the user to be deleted
   * @returns Observable<DtoInputUser>
   */
  public delete(id: number): Observable<DtoInputUser> {
    return this._httpClient.delete<DtoInputUser>(`${UserService.ENTRY_POINT_URL}/${id}`);
  }

  /**
   * It updates the password of the user.
   * @param {DtoOutputUpdatePassword} dtoUpdatePassword - DtoOutputUpdatePassword
   * @returns An observable of type DtoInputUser
   */
  public updatePassword(dtoUpdatePassword: DtoOutputUpdatePassword): Observable<DtoInputUser>{
    return this._httpClient.put<DtoInputUser>(`${UserService.ENTRY_POINT_URL}/password`, dtoUpdatePassword) ;
  }

  /**
   * It updates the user.
   * @param {DtoOutputUpdateUser} dtoUpdateUser - DtoOutputUpdateUser
   * @returns An observable of type DtoInputUser
   */
  public updateUser(dtoUpdateUser: DtoOutputUpdateUser): Observable<DtoInputUser>{
    return this._httpClient.put<DtoInputUser>(`${UserService.ENTRY_POINT_URL}`, dtoUpdateUser) ;
  }
}
