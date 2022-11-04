import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { MbscDatepicker, setOptions } from "@mobiscroll/angular";

setOptions({
  theme: "ios",
  themeVariant: "light"
})

const now = new Date();

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  min = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  max = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())

  //@ViewChild('picker', { static: false })
  calendar!: any;
  @Output() dateUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  removeTrialDivs() {
    let tags = document.getElementsByTagName("div");
    for (let i = 0; i < tags.length; i++)
      if (tags[i].textContent == "TRIAL")
        tags[i].remove();
  }

  dateChanged() {
    this.dateUpdated.next(this.calendar);
  }
}
