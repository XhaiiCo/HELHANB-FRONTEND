import {Component, Input, OnInit} from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
