import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
  }

  dtoObjectToDateFR(date: Date): string {
    let d = new Date(date);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }

  dtoObjectToDateUS(date: Date): string {
    let d = new Date(date);
    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
  }

  nbDaysBetweenDates(startDate: Date, endDate: Date): number {
    startDate = new Date(startDate)
    endDate = new Date(endDate);
    let d1 = startDate.getFullYear() + "-" + startDate.getMonth() + "-" + startDate.getDate();
    let d2 = endDate.getFullYear() + "-" + endDate.getMonth() + "-" + endDate.getDate();
    let diffInMs = new Date(d2).getTime() - new Date(d1).getTime();
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
  }

  getDatesBetween(startDate: Date, endDate: Date): Date[] {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const dates: Date[] = [];

    let currentDate = startDate;
    while (currentDate < endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
}
