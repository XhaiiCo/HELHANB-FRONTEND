import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/fr';

const now = new Date();

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class DatePickerComponent implements OnInit {
  @Output() emitDateChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  min = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); // Date de début de location de la baraque
  max = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()); // Date jusqu'à laquelle la personne veut louer sa baraque

  range = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });

  notAvailableDates = [
    new Date("11/30/2022"),  // Example
    new Date("12/5/2022"),  // Example
  ];

  dateFilter = (d: Date): boolean => {
    const time = new Date(d).getTime();
    return !this.notAvailableDates.find(x => new Date(x).getTime() == time);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  dateChange() {
    this.emitDateChange.next(this.range);
  }
}
