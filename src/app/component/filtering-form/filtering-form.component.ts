import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdService} from "../../services/ad.service";

@Component({
  selector: 'app-filtering-form',
  templateUrl: './filtering-form.component.html',
  styleUrls: ['./filtering-form.component.scss']
})
export class FilteringFormComponent implements OnInit {

  countries : string[] = [];
  cities : string[] = [];

  filteringForm: FormGroup = this._fb.group({
    country: this._fb.control(""),
    city: this._fb.control(""),
    price: this._fb.control(""),
    nbPersons: this._fb.control(""),
    startDate: this._fb.control(""),
    leaveDate: this._fb.control(""),
  });

  displayFiltre: boolean = false ;

  constructor(private _fb: FormBuilder, private _adService: AdService) {
  }

  ngOnInit(): void {
    this.fetchCountries()
  }

  toggleDisplayFiltre() {
   this.displayFiltre = !this.displayFiltre ;
  }

  fetchCountries()
  {
    this._adService
      .fetchCountries()
      .subscribe(countries => this.countries = countries);
  }

  fetchDistinctsCities(event: any)
  {
    this._adService
      .fetchCities(event.target.value)
      .subscribe(cities => this.cities = cities);
  }


}
