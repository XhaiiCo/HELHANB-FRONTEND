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

  min = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) // Date de début de location de la baraque
  max = new Date(now.getFullYear()+1, now.getMonth() + 1, now.getDate()) // Date jusqu'à laquelle la personne veut louer sa baraque

  //@ViewChild('picker', { static: false })
  calendar!: Date[];
  @Output() dateUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  removeTrialDivs() {
    let tags = document.getElementsByTagName("div");
    for (let i = 0; i < tags.length; i++)
      if (tags[i].textContent == "TRIAL")
        tags[i].remove();

    let tags2 = document.getElementsByTagName("mbsc-calendar-weekdays")[1];
    let dayNamesShort = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    for (let i = 0; i < 7; i++)
      tags2.children[i].innerHTML = dayNamesShort[i];

    let tags3 = document.getElementsByTagName("mbsc-segmented-group");
    let arrStr = ['Début', 'Fin'];
    for (let i = 0; i < 2; i++) {
      tags3[0].children[i].children[0].children[2].children[0].innerHTML = arrStr[i];
      this.dateChanged();
    }
  }

  dateChanged() {
    this.changeSelectionString();

    if (this.calendar == null) { return }
    // Si les deux dates sont encodées
    if (this.calendar[1] != null)
      this.dateUpdated.next(this.calendar);
  }

  changeSelectionString() {
    let tags3 = document.getElementsByTagName("mbsc-segmented-group");
    // Le calendrier n'est pas initialisé
    if (this.calendar == null) {
      // le calendrier n'est pas initialisé
      for (let i = 0; i < 2; i++)
        tags3[0].children[i].children[0].children[2].children[1].innerHTML = "Séléctionnez";
      return;
    }

    // les deux dates sont entrée
    if (this.calendar[1] != null) {
      for (let i = 0; i < 2; i++)
        tags3[0].children[i].children[0].children[2].children[1].innerHTML = this.calendar[i].toString().substring(8, 10) + " " + this.calendar[i].toString().substring(4, 7) + " " + this.calendar[i].toString().substring(11, 15);
    } else {
      // que la première date est entrée
      if (this.calendar[0] != null) {
        tags3[0].children[0].children[0].children[2].children[1].innerHTML = this.calendar[0].toString().substring(8, 10) + " " + this.calendar[0].toString().substring(4, 7) + " " + this.calendar[0].toString().substring(11, 15);
        tags3[0].children[1].children[0].children[2].children[1].innerHTML = "Séléctionnez";
      } else {
        // aucune
        for (let i = 0; i < 2; i++)
          tags3[0].children[i].children[0].children[2].children[1].innerHTML = "Séléctionnez";
      }
    }
  }
}
