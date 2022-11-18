import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.scss']
})
export class MyReservationComponent implements OnInit {

  reservationsList: any[] = [];

  constructor() {
  }

  ngOnInit(): void {

    //Create fake reservation
    this.reservationsList.push(
      {
        name: "Saint-Siffret",
        destination: "Tournai",
        host_name: "François",
        beginDate: "1 juil, 2021",
        endDate: "9 juil 2021",
        reservationPicture: "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/dfe9fd1e-a010-43c9-b546-0bbc7d59f7f3.jpeg?im_w=1200",
      },
      {
        name: "chat laid au bord du lac",
        destination: "Tournai",
        host_name: "Hôte: François",
        beginDate: "1 juil, 2021",
        endDate: "9 juil 2021",
        reservationPicture: "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/53b475a3-104f-462e-8faf-85a7bcd1f13b.jpeg?im_w=720",
      },
      {
        name: "chat laid au bord du lac",
        destination: "Tournai",
        host_name: "François",
        beginDate: "1 juil, 2021",
        endDate: "9 juil 2021",
        reservationPicture:
          "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/56fa6c39-d99f-49d9-91de-4db146a55db9.jpeg?im_w=1200",

      }
    );
  }

}
