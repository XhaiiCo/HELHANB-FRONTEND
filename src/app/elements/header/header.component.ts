import {Component, OnInit} from '@angular/core';
import {DropDownOption} from "../../interfaces/drop-down-option";
import {AuthService} from "../../services/auth.service";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropDownOpen: boolean = false;
  profilePictureBaseUri: string = environment.pictureUrl;
  defaultProfilePicture: string = environment.defaultProfilePictureUrl;
  notConnectedDropDownOption: DropDownOption[] = [
    {name: 'Connexion', path: '/connexion'},
    {name: 'Inscription', path: '/inscription'},
  ]

  connectedDropDownOption: DropDownOption[] = [
    {name: 'Compte', path: '/compte'},
    {name: 'Mes réservations', path: '/mes-reservations'},
    {name: 'Mes messages', path: '/conversations'},
    {name: 'Devenir hôte', path: '/nouvelle-annonce'},
    {name: 'Deconnexion', path: '/deconnexion'}
  ]

  hostDropDownOption: DropDownOption[] = [
    {name: 'Compte', path: '/compte'},
    {name: 'Mes réservations', path: '/mes-reservations'},
    {name: 'Mes annonces', path: '/mes-annonces'},
    {name: 'Mes messages', path: '/conversations'},
    {name: 'Deconnexion', path: '/deconnexion'}
  ]

  adminDropDownOption: DropDownOption[] = [
    {name: 'Compte', path: '/compte'},
    {name: 'Administration', path: '/administration'},
    {name: 'Mes messages', path: '/conversations'},
    {name: 'Deconnexion', path: '/deconnexion'}
  ]

  adName: string = "";

  constructor(
    public authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      if (params['adName'])
        this.adName = params['adName'];

    })
  }

  search() {
    let params = Object.assign({}, this._route.snapshot.queryParams);
    if (params['page'])
      delete params['page'];
    if (this.adName !== "") {
      Object.assign(params, {adName: this.adName});

      this._router.navigate(['annonces'], {
        queryParams: params,
      });
    } else {
      if (params['adName'])
        delete params['adName'];
      this._router.navigate(['annonces'], {queryParams: params})
    }
  }
}
