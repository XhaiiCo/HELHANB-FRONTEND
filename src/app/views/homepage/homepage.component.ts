import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  images: string[]  = [
    "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/dfe9fd1e-a010-43c9-b546-0bbc7d59f7f3.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/53b475a3-104f-462e-8faf-85a7bcd1f13b.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/56fa6c39-d99f-49d9-91de-4db146a55db9.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/eb68ae58-a771-44d2-9d62-b913a1e5df26.jpeg?im_w=720",
    "https://www.zooplus.be/magazine/wp-content/uploads/2019/06/comprendre-le-langage-des-chats.jpg",
  ]

  ngOnInit(): void {
  }

}
