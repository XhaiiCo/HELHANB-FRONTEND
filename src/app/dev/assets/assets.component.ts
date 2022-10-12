import { Component, OnInit } from '@angular/core';
import {DropDownOption} from "../../interfaces/drop-down-option";

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  dropDownOpen: boolean = false ;

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
