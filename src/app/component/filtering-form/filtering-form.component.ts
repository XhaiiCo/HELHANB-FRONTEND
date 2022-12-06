import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filtering-form',
  templateUrl: './filtering-form.component.html',
  styleUrls: ['./filtering-form.component.scss']
})
export class FilteringFormComponent implements OnInit {

  filteringForm: FormGroup = this._fb.group({
    country: this._fb.control(""),
    city: this._fb.control(""),
    price: this._fb.control(""),
    nbPersons: this._fb.control(""),
    startDate: this._fb.control(""),
    leaveDate: this._fb.control(""),
  });

  displayFiltre: boolean = false ;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  toggleDisplayFiltre() {
   this.displayFiltre = !this.displayFiltre ;
  }
}
