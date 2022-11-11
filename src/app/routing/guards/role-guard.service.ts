import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {DtoInputUser} from "../../dtos/auth/dto-input-user";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    //Get data passed from the route config
    const expectedRole = route.data['expectedRole'] ;

    //Get User
    const connectedUser: DtoInputUser | null = this._authService.user ;
    if(expectedRole && connectedUser){
      if(connectedUser.roleId === expectedRole) return true ;
    }

    this._router.navigate(['connexion']) ;
    return false;
  }
}
