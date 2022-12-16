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

  @Input() notAvailableDates!: Date[] ;

  dateFilter = (d: Date): boolean => {
    const time = new Date(d).getTime();
    return !this.notAvailableDates.find(x => new Date(x).getTime() == time);
  }

  constructor(private _ToastNotificationService: ToastNotificationService) {
  }

  ngOnInit(): void {
  }

  startDateChange(e: any) { // Changer max pour les dates indispos
    /*const date_tmp = e.value;

    if (!date_tmp) return;

    const date = new Date(date_tmp).getTime();
    if (date == this.max.getTime()) {
      this.dateDPError("Cette date n'est pas disponible");
      return;
    }

    if (this.notAvailableDates.length == 0) return;

    let max_tmp = this.notAvailableDates.filter(x => new Date(x).getTime() > date);

    if (max_tmp.length != 0) {
      max_tmp.sort((a, b) => a.getTime() - b.getTime());
      //if (date == max_tmp[0].getTime() - (1000 * 60 * 60 * 24))
        //this.dateDPError("Cette date n'est pas disponible");
    }*/
  }

  private dateDPError(sent: string) {
    // Fermer le dp + reset la valeur d'input
    this.range.reset();
    this._ToastNotificationService.add(`${sent}`, "error");
  }

  endDateChange(e: any) {
    const date_tmp = e.value;

    if (!date_tmp) return;

    const date = new Date(date_tmp).getTime();

    if (this.notAvailableDates.length == 0) return;

    if (this.range.controls.start.value == null) return;
    // @ts-ignore
    let max_tmp = this.notAvailableDates.filter(x => new Date(x).getTime() < date && new Date(x).getTime() > new Date(this.range.controls.start.value).getTime());
    if (max_tmp.length != 0)
      this.dateDPError("Les dates séléctionnées ne sont pas toutes disponibles");
    else
      this.emitDateChange.next(this.range);
  }

}
