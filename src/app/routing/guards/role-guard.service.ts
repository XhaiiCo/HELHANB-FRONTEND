import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {DtoInputUser} from "../../dtos/user/dto-input-user";
import {connect} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  /**
   * If the user is connected and has the expected role, then the user can access the route. Otherwise, the user is
   * redirected to the login page
   * @returns A boolean
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    //Get data passed from the route config
    const expectedRoles: string[] = route.data['expectedRoles'];

    //Get user
    const connectedUser: DtoInputUser | null = this._authService.user;

    if (expectedRoles && connectedUser) {
      for(const role of expectedRoles){
        if(role === connectedUser.role.name) return true ;
      }
    }

    this._router.navigate(['connexion']);
    return false;
  }
}
