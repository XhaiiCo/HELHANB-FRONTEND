import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {environment} from "../../../environments/environment";

const dayDif = (date1: Date, date2: Date) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

@Component({
  selector: 'app-renting',
  templateUrl: './renting.component.html',
  styleUrls: ['./renting.component.scss']
})
export class RentingComponent implements OnInit {

  @Input() daily_price: number = 149.99;
  @Input() ad_name: string = "Chat laid au bord du lac";
  @Input() host_name: string = "François";
  @Input() host_pp: string = "";
  profilePictureBaseUri: string  = environment.pictureUrl;

  @Input() nb_max_tenant: number = 4;
  str_nb_max_tenant: string = this.nb_max_tenant > 1 ? "voyageurs" : "voyageur";
  @Input() nb_bedroom: number = 2;
  str_nb_bedroom: string = this.nb_bedroom > 1 ? "chambres" : "chambre";
  @Input() nb_bed: number = 3;
  str_nb_bed: string = this.nb_bed > 1 ? "lits" : "lit";

  beginDate!: Date;
  endDate!: Date;
  nbDays: number = 0;

  images: string[]  = [
    "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/dfe9fd1e-a010-43c9-b546-0bbc7d59f7f3.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/53b475a3-104f-462e-8faf-85a7bcd1f13b.jpeg?im_w=720",
    "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/56fa6c39-d99f-49d9-91de-4db146a55db9.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/eb68ae58-a771-44d2-9d62-b913a1e5df26.jpeg?im_w=720",
    "https://www.zooplus.be/magazine/wp-content/uploads/2019/06/comprendre-le-langage-des-chats.jpg",
  ]

  displayAllFeatures: boolean = false;
  @Input() renting_features: string[] =
    [
      "Wifi",
      "Salle de bain",
      "Cuisine",
      "Télévision",
      "Chauffage",
      "Chauffage",
      "Chauffage",
      "Chauffage",
      "Chauffage"
    ]

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  setDate(dates: any) {
    if (dates[1] != null) {
      this.beginDate = dates[0];
      this.endDate = dates[1];

      this.nbDays = dayDif(this.beginDate, this.endDate);
    } else {
      this.nbDays = 0;
    }
  }

  submit() {

  }

  showAllFeatures() {
    this.displayAllFeatures = true;
  }

  closeAllFeatures() {
    this.displayAllFeatures = false;
  }
}
