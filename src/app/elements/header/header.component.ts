import { Component, OnInit } from '@angular/core';
import {DropDownOption} from "../../interfaces/drop-down-option";
import {AuthService} from "../../services/auth.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropDownOpen: boolean = false;
  profilePictureBaseUri: string  = environment.pictureUrl ;
  notConnectedDropDownOption: DropDownOption[] = [
    {name: 'Connexion', path: '/connexion'},
    {name: 'Inscription', path: '/inscription'},
  ]

  connectedDropDownOption: DropDownOption[] = [
    {name: 'Compte', path: '/compte'},
    {name: 'Deconnexion', path: '/deconnexion'}
  ]

  adminDropDownOption: DropDownOption[] = [
    {name: 'Compte', path: '/compte'},
    {name: 'Administration', path: '/administration'},
    {name: 'Deconnexion', path: '/deconnexion'}
  ]
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
