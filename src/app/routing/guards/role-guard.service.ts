import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {DtoInputUser} from "../../dtos/auth/dto-input-user";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(private _authService: AuthService, private _router: Router) { }

  /**
   * If the user is connected and has the expected role, then the user can access the route. Otherwise, the user is
   * redirected to the login page
   * @returns A boolean
   */
  canActivate(route: ActivatedRouteSnapshot): boolean{
    //Get data passed from the route config
    const expectedRole = route.data['expectedRole'] ;

    //Get User
    const connectedUser: DtoInputUser | null = this._authService.user ;
    if(expectedRole && connectedUser){
      if(connectedUser.role.id === expectedRole) return true ;
    }

    this._router.navigate(['connexion']) ;
    return false;
  }
}
