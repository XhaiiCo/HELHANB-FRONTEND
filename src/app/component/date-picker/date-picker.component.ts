import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/fr';
import {ToastNotificationService} from "../../services/toast-notification.service";
import * as url from "url";

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

  // Dates selected in the date picker
  range = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
  });

  // Array of unavailable dates
  @Input() unavailableDates: Date[] = [];

  @Input() urlDates!: { arrival: Date | null, leave: Date | null };

  /* A function that filters out unavailable dates and disables them in the date picker. */
  dateFilter = (d: Date): boolean => {
    const time = new Date(d).getTime();
    return !this.unavailableDates.find(x => new Date(x).setHours(0, 0, 0, 0) == time);
  }

  constructor(
    private _ToastNotificationService: ToastNotificationService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.patchDate();
  }

  patchDate() {
    if (this.urlDates)
      if (this.urlDates.arrival && this.urlDates.leave)
        this.range.patchValue({
          start: this.urlDates.arrival,
          end: this.urlDates.leave,
        });
      else
        this.range.reset();
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

    let conflictsDate = this.unavailableDates.filter(item =>
      new Date(item).getTime() < endDateSelected &&
      new Date(item).getTime() > startDateSelected
    );

    if (conflictsDate.length !== 0)
      this.dateDPError("Les dates séléctionnées ne sont pas toutes disponibles");
    else
      this.emitDateChange.next(this.range);
  }

  inputChangeStart(value: any) {
    if (!isNaN(new Date(value).getTime())) {
      this.range.patchValue({
        start: value.value,
      });
    }
    if (this.range.controls.end.value)
      this.emitInputChange();
  }

  inputChangeEnd(value: any) {
    if (!isNaN(new Date(value).getTime())) {
      this.range.patchValue({
        end: value.value,
      });
    }
    if (this.range.controls.start.value)
      this.emitInputChange();
  }

  emitInputChange() {
    this.emitDateChange.next(this.range);
  }
}
