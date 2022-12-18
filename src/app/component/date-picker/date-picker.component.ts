import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/fr';
import {ToastNotificationService} from "../../services/toast-notification.service";

const now = new Date();

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class DatePickerComponent implements OnInit {
  @Output() emitDateChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  min = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  range = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });

  @Input() notAvailableDates: Date[] = [];

  /* A function that is used to filter the dates that are not available. For disabled them in the date picker */
  dateFilter = (d: Date): boolean => {
    const time = new Date(d).getTime();
    return !this.notAvailableDates.find(x => new Date(x).getTime() == time);
  }

  constructor(
    private _ToastNotificationService: ToastNotificationService
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * If the date range is invalid, reset the date range and display an error message
   * @param {string} sent - string - This is the message that will be displayed in the toast notification.
   */
  private dateDPError(sent: string) {
    this.range.reset();
    this._ToastNotificationService.add(`${sent}`, "error");
  }

  /**
   * Check if the end date is not in the notAvailableDates array, if it is not, emit the date change
   * @param {any} e - any
   * @returns the date range form group.
   */
  endDateChange(e: any) {
    const date_tmp = e.value;

    if (!date_tmp) return;

    if (this.range.controls.start.value == null) return;

    const startDateSelected: number = new Date(this.range.controls.start.value).getTime();
    const endDateSelected: number = new Date(date_tmp).getTime();

    let conflictsDate = this.notAvailableDates.filter(item =>
      new Date(item).getTime() < endDateSelected &&
      new Date(item).getTime() > startDateSelected
    );

    if (conflictsDate.length !== 0)
      this.dateDPError("Les dates séléctionnées ne sont pas toutes disponibles");
    else
      this.emitDateChange.next(this.range);
  }
}
