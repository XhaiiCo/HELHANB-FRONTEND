import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ConnectedGuardService implements CanActivate{

  constructor(private _authService: AuthService, private _router: Router) { }

  /**
   * If the user is connected, the function returns true, otherwise it redirects the user to the login page and returns
   * false
   * @returns A boolean
   */
  canActivate(route: ActivatedRouteSnapshot): boolean{
    if(this._authService.isConnected()) return true ;

    this._router.navigate(['connexion']) ;
    return false;
  }
}
