import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class AdHandleService {

  readonly NB_MIN_PICTURES: number = 3;
  readonly NB_MAX_PICTURES: number = 15;

  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   * If the feature doesn't already exist in the array, add it
   * @param {string} feature - string - the feature to add
   */
  addFeature(feature: string, renting_features: string[]) {
    if (!renting_features.find(f => f.toLowerCase() === feature.toLowerCase()))
      renting_features.push(feature);
  }

  /**
   * @param {string} feature - string - the feature to be removed
   */
  removeFeature(feature: string, renting_features: string[]): string[] {
    return renting_features.filter(obj => obj !== feature);
  }

  /**
   * It takes a file input event, converts the files to base64, and returns a promise with the base64 strings
   * @param {any} event - any: The event that triggered the file selection.
   * @returns A promise that resolves to an array of base64 strings.
   */
  filesToBase64(event: any): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      let result: string[] = [];
      const filesFromEvent = event.target.files;
      let cpt = 0;

      for (let i = 0; i < filesFromEvent.length; i++) {

        const file = filesFromEvent[i];

        this.fileToBase64(file).subscribe(base64 => {
          cpt++;
          result.push(base64);

          if (cpt === filesFromEvent.length) {
            resolve(result);
          }
        });
      }

    });
  }

  removePicture(file: string, files: string[]): string[] {
    return files.filter(image => image !== file);
  }

  /**
   * It takes a file in bas64 and a list of file in base64 and returns true if the file is in the list of files
   * @param {string} fileToCheck - The file you want to check if it's in the filesList in base64.
   * @param {string[]} filesList - The list of files that you want to check against in base64.
   * @returns A boolean value.
   */
  isPictureAlreadyUploaded(fileToCheck: string, filesList: string[]): boolean {
    return filesList.includes(fileToCheck);
  }

  /**
   * It returns true if the number of files is equal to the maximum number of pictures
   * @returns A boolean value.
   */
  isMaxNumberOfPicturesReached(nbImg: number): boolean {
    return nbImg === this.NB_MAX_PICTURES;
  }

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
