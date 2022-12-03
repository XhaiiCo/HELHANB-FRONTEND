import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class AdHandleService {

  public readonly nbMinPictures: number = 3;
  readonly nbMaxPictures: number = 15;

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
   * We're looping through the files from the event, checking if the file is already in the files array, and if it's not,
   * we're pushing it to the array
   * @param {any} event - any - the event that is triggered when the user selects a file.
   * @returns the value of the variable 'reader.result'
   */
  addPicture(event: any, files: string[], nbImg: number): Promise<number> {

    return new Promise<number>((resolve, reject) => {
      if (this.isFilesFull(nbImg)) reject(nbImg);

      const filesFromEvent = event.target.files;
      let cpt = 0;

      for (let i = 0; i < filesFromEvent.length; i++) {

        if (this.isFilesFull(nbImg)) reject(nbImg);

        const file = filesFromEvent[i];

        this.fileToBase64(file).subscribe(base64 => {
          cpt++;
          if (!this.isInFiles(base64, files)) {
            nbImg++;
            files.push(base64);
          }

          if (cpt === filesFromEvent.length) {
            resolve(nbImg);
          }
        });
      }

    });
  }

  removePicture(file: string, files: string[]): string[] {
    return files.filter(image => image !== file);
  }

  /**
   * It returns true if the fileToCheck is in the files array
   * @param {File} fileToCheck - File - the file to check if it's in the files array
   * @returns A boolean value.
   */
  isInFiles(fileToCheck: string, picturesToAdd: string[]): boolean {
    //let filesName = files.map((file) => file.file.name)

    return picturesToAdd.includes(fileToCheck);
  }

  /**
   * It returns true if the number of files is equal to the maximum number of pictures
   * @returns A boolean value.
   */
  isFilesFull(nbImg: number): boolean {
    //NbImg cause the image adding is async
    return nbImg == this.nbMaxPictures;
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
