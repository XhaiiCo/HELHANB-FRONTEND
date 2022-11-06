import {Component, Input, OnInit} from '@angular/core';

const dayDif = (date1: Date, date2: Date) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

@Component({
  selector: 'app-renting',
  templateUrl: './renting.component.html',
  styleUrls: ['./renting.component.scss']
})
export class RentingComponent implements OnInit {

  @Input() daily_price: number = 149.99;
  @Input() ad_name: string = "Chalet au bord du lac";
  @Input() owner_name: string = "François";

  @Input() nb_max_tenant: number = 4;
  @Input() nb_bedroom: number = 2;
  @Input() nb_bed: number = 3;
  str_nb_max_tenant: string = this.nb_max_tenant > 1 ? "voyageurs" : "voyageur";
  str_nb_bedroom: string = this.nb_bedroom > 1 ? "chambres" : "chambre";
  str_nb_bed: string = this.nb_bed > 1 ? "lits" : "lit";

  beginDate!: Date;
  endDate!: Date;
  nbDays: number = 0;

  images: string[]  = [
    "../assets/img/maison1.1.webp",
    "../assets/img/maison1.2.webp",
    "../assets/img/maison1.3.webp",
    "https://www.zooplus.be/magazine/wp-content/uploads/2019/06/comprendre-le-langage-des-chats.jpg"
  ]

  

  constructor() { }

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
    console.log("test");
  }
}
