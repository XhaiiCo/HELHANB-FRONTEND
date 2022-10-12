import { Component, OnInit } from '@angular/core';
import { CarouselModule} from "ngx-bootstrap/carousel";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  nbAds: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  images: any  = [
    "../assets/img/maison1.1.webp",
    "../assets/img/maison1.2.webp",
    "../assets/img/maison1.3.webp",
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
