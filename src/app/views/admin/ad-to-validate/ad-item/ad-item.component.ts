import {Component, Input, OnInit} from '@angular/core';
import {DtoInputAd} from "../../../../dtos/ad/dto-input-ad";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.scss']
})
export class AdItemComponent implements OnInit {


  pictureBaseUrl: string  = environment.pictureUrl ;
  @Input() ad!: DtoInputAd ;

  constructor() { }

  ngOnInit(): void {}
}
