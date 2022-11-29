import {Component, Input, OnInit} from '@angular/core';
import {DtoInputMyAds} from "../../../dtos/ad/dto-input-my-ads";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-my-ad',
  templateUrl: './my-ad.component.html',
  styleUrls: ['./my-ad.component.scss']
})
export class MyAdComponent implements OnInit {

  @Input() ad!: DtoInputMyAds ;

  readonly pictureBaseUrl: string = environment.pictureUrl ;

  constructor() { }

  ngOnInit(): void {
  }

}
