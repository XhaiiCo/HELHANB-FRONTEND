import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class NotConnectedGuardService implements CanActivate{

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    if(!this._authService.isConnected()) return true ;

    this._router.navigate(['']) ;
    return false;
  }
}
