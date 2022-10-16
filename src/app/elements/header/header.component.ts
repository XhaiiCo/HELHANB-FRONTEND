import { Component, OnInit } from '@angular/core';
import {DropDownOption} from "../../interfaces/drop-down-option";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropDownOpen: boolean = false;

  dropDownOption: DropDownOption[] = [
    {name: 'Connexion', path: '/connexion'},
    {name: 'Inscription', path: '/inscription'},
    {name: 'Compte', path: '/compte'},
    {name: 'Devenir hôte', path: '/hote'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
