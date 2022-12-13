import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdService} from "../../services/ad.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-filtering-form',
  templateUrl: './filtering-form.component.html',
  styleUrls: ['./filtering-form.component.scss']
})
export class FilteringFormComponent implements OnInit {

  countries: string[] = [];
  cities: string[] = [];

  filteringFormName: string[] = ["country", "city", "pricePerNight", "numberOfPersons"];
  params: any = {};

  filteringForm: FormGroup = this._fb.group({
    country: this._fb.control(""),
    city: this._fb.control(""),
    pricePerNight: this._fb.control(""),
    numberOfPersons: this._fb.control(""),
    startDate: this._fb.control(""),
    leaveDate: this._fb.control(""),
  });

  displayFiltre: boolean = false;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _fb: FormBuilder, private _adService: AdService, private _router: Router, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {

    let queryParams = this._route.snapshot.queryParamMap;

    this.fetchCountries();

    this.fetchDistinctsCities(queryParams.get('country')!);

    this.filteringForm.patchValue({
      country: queryParams.get('country') ? queryParams.get('country') : "",
      city: queryParams.get('city') ? queryParams.get('city') : "",
      pricePerNight: queryParams.get('pricePerNight'),
      numberOfPersons: queryParams.get('numberOfPersons'),
    });


  }

  toggleDisplayFiltre() {
    this.displayFiltre = !this.displayFiltre;
  }

  fetchCountries() {
    this._adService
      .fetchCountries()
      .subscribe(countries => this.countries = countries);
  }

  fetchDistinctsCitiesOnChange(event: any) {
    this._adService
      .fetchCities(event.target.value)
      .subscribe(cities => {
        this.cities = cities ;
        this.filteringForm.patchValue({
          city: "",
        });
      });
  }

  fetchDistinctsCities(country : string) {
    this._adService
      .fetchCities(country)
      .subscribe(cities => {
        this.cities = cities ;
      });
  }

  search() {

    this.clearParams();

    this.addAllParams();

    this._router.navigate(['annonces'], {queryParams: this.params}).then(() => {this.notify.emit("notify")});


  }

  addAllParams() {
    for (let name of this.filteringFormName) {
      let param = this.filteringForm.get(name)?.value;

      if (param) Object.assign(this.params, {[name]: param});
    }
  }

  clearParams() {
    for (const key in this.params) {
      delete this.params[key];
    }
  }

}
