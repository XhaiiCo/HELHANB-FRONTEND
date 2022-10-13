import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  nbAds: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

  images: string[]  = [
    "../assets/img/maison1.1.webp",
    "../assets/img/maison1.2.webp",
    "../assets/img/maison1.3.webp",
    "https://www.zooplus.be/magazine/wp-content/uploads/2019/06/comprendre-le-langage-des-chats.jpg"
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
