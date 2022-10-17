import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  images: string[]  = [
    "../assets/img/maison1.1.webp",
    "../assets/img/maison1.2.webp",
    "../assets/img/maison1.3.webp",
    "https://www.zooplus.be/magazine/wp-content/uploads/2019/06/comprendre-le-langage-des-chats.jpg"
  ]
  ngOnInit(): void {
  }

}
