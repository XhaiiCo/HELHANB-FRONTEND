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
    numberOfPersons: this._fb.control("")
  });

  dates!: { arrival: Date, leave: Date };
  urlDates!: { arrival: Date, leave: Date };

  displayFilter: boolean = false;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _fb: FormBuilder,
    private _adService: AdService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.fillFilteringFormWithQueryParams();
  }

  /**
   * It fills the filtering form with the query parameters from the URL
   */
  private fillFilteringFormWithQueryParams() {
    let queryParams = this._route.snapshot.queryParamMap;

    this.fetchCountries();
    this.fetchDistinctCities(queryParams.get('country')!);

    this.filteringForm.patchValue({
      country: queryParams.get('country') ? queryParams.get('country') : "",
      city: queryParams.get('city') ? queryParams.get('city') : "",
      pricePerNight: queryParams.get('pricePerNight'),
      numberOfPersons: queryParams.get('numberOfPersons'),
    });

    if (queryParams.get('arrivalDate') && queryParams.get('leaveDate')) {
      let tmp = queryParams.get('arrivalDate')?.toString().split("/");
      // @ts-ignore
      let arrDate = new Date(+tmp[2], tmp[1] - 1, +tmp[0]);
      tmp = queryParams.get('leaveDate')?.toString().split("/");
      // @ts-ignore
      let leaDate = new Date(+tmp[2], tmp[1] - 1, +tmp[0]);

      this.dates = {
        arrival: arrDate,
        leave: leaDate
      }
      this.urlDates = this.dates;
    }
  }

  /**
   * If the displayFilter is true, then set it to false. If the displayFilter is false, then set it to true
   */
  toggleDisplayFilter() {
    this.displayFilter = !this.displayFilter;
  }

  fetchCountries() {
    this._adService
      .fetchCountries()
      .subscribe(countries => this.countries = countries);
  }

  fetchDistinctCitiesOnChange(event: any) {
    this._adService
      .fetchCities(event.target.value)
      .subscribe(cities => {
        this.cities = cities;
        this.filteringForm.patchValue({
          city: "",
        });
      });
  }

  fetchDistinctCities(country: string) {
    this._adService
      .fetchCities(country)
      .subscribe(cities => {
        this.cities = cities;
      });
  }

  search() {
    this.clearParams();

    this.addAllParams();

    const adName = this._route.snapshot.queryParamMap.get('adName');
    if (adName)
      Object.assign(this.params, {adName: adName})
    this._router.navigate(['/annonces'], {
      queryParams: this.params,
    });
  }

  addAllParams() {
    for (let name of this.filteringFormName) {
      let param = this.filteringForm.get(name)?.value;

      if (param) Object.assign(this.params, {[name]: param});
    }

    if (this.dates?.arrival && this.dates?.leave) {
      Object.assign(this.params, {arrivalDate: this.dateToString(this.dates.arrival)});
      Object.assign(this.params, {leaveDate: this.dateToString(this.dates.leave)});
    }
  }

  clearParams() {
    for (const key in this.params) {
      delete this.params[key];
    }
  }

  setDate(range: FormGroup) {
    if (range.valid) {
      this.dates = {
        arrival: range.get("start")?.value,
        leave: range.get("end")?.value,
      }
    }
  }

  dateChange(range: FormGroup) {
    this.setDate(range);
  }

  dateToString(date: Date): string {
    const dateObj: Date = new Date(date.toString());

    return dateObj.getDate().toString() + "/" + (dateObj.getMonth() + 1).toString() + "/" + dateObj.getFullYear();
  }

  deleteFilters() {
    this.filteringForm.setValue({
      country: "",
      city: "",
      pricePerNight: "",
      numberOfPersons: ""
    });

    const adName: string | null = this._route.snapshot.queryParamMap.get('adName');

    if (adName)
      this._router.navigate(['/annonces'], {queryParams: {adName}});
    else
      this._router.navigate(['/annonces']);
  }
}

