import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AdService} from "../../services/ad.service";
import {DtoAd} from "../../dtos/ad/dto-ad";

const dayDif = (date1: Date, date2: Date) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

@Component({
  selector: 'app-renting',
  templateUrl: './renting.component.html',
  styleUrls: ['./renting.component.scss']
})
export class RentingComponent implements OnInit {

  pageLoaded: boolean = false ;

  pictureBaseUri: string = environment.pictureUrl;

  nbDays: number = 0;

  images: string[] = []

  displayAllFeatures: boolean = false;

  ad: DtoAd = {
    id: 0,
    name: "",
    created: "",
    pricePerNight: 0,
    description: "",
    numberOfPersons: 0,
    numberOfBedrooms: 0,
    street:"",
    postalCode: 0,
    country: "",
    city: "",
    adStatusId: 0,
    arrivalTimeRangeStart: "",
    arrivalTimeRangeEnd: "",
    leaveTime: "",
    features: [],
    pictures: [{id:0, path:""}],
    owner:{
      firstName: "",
      lastName: "",
      profilePicturePath: ""
    }
  }

  constructor(private _route: ActivatedRoute,
              private _adService : AdService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(args =>{

      if (args.has("id"))
      {
        this.fetchAdById(Number(args.get("id")));
      }
    });
  }

  private fetchAdById(id: number)
  {
    this._adService
      .fetchById(id)
      .subscribe(ad =>
      {
        this.ad = ad;

        //map pour recup les noms d images
        this.images = this.ad.pictures.map(item => item.path);

        this.pageLoaded = true ;
      });
  }

  setDate(range: FormGroup) {
    if (range.valid) {
      this.nbDays = dayDif(range.controls['start'].value._d, range.controls['end'].value._d);
    } else {
      this.nbDays = 0;
    }
  }

  submit() {

  }

  showListFeatures() {
    this.displayAllFeatures = true;
  }

  closeListFeatures() {
    this.displayAllFeatures = false;
  }

  // Called when the contact button is triggered
  contactHost() {

  }

  dateChange(range: FormGroup) {
    this.setDate(range);
  }
}
