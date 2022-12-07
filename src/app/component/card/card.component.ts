import {Component, Input, OnInit} from '@angular/core';
import {DtoInputAdSummary} from "../../dtos/ad/dto-input-ad-summary";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  //default declaration for avoiding to handle undefined in the child
  @Input() ad! : DtoInputAdSummary;

  adBaseLink : string = "/annonces/";

  constructor() { }

  ngOnInit(): void {
  }

}
