import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Base64Service {

  constructor() { }

  fileToBase64(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(window.btoa(event.target!.result!.toString()));
    return result;
  }

  base64ToSrc(base64String: string): string {
    let extension = "";

    //fonctionne sans l extension exacte mais on sait jamais
    switch (base64String[0]) {
      case '/':
        extension = 'jpeg';
        break;
      case 'i':
        extension = 'png';
        break;
      case 'U':
        extension = 'webp';
        break;
    }

    return `data:image/${extension};base64, ${base64String}`;
  }
}
