import {Injectable} from '@angular/core';
import {Base64Service} from "./base64.service";
import {DtoOutputTime} from "../dtos/ad/dto-output-time";

@Injectable({
  providedIn: 'root'
})
export class AdHandleService {

  readonly NB_MIN_PICTURES: number = 3;
  readonly NB_MAX_PICTURES: number = 15;

  constructor(private _base64Service : Base64Service) {
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

        this._base64Service.fileToBase64(file).subscribe(base64 => {
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

  imgSrc(base64String: string): string {
    return this._base64Service.base64ToSrc(base64String);
  }

  /**
   * It takes a string in the format "HH:mm" and returns an object with two properties, hours and minutes, which are both
   * numbers
   * @param {string} value - string - the value to be converted
   * @returns An object with two properties, hours and minutes.
   */
  toDtoOutputTime(value: string): DtoOutputTime {
    return {
      hours: Number(value.substring(0, 2)),
      minutes: Number(value.substring(3, 5)),
    };
  }
}
