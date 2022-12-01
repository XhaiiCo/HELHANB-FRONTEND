import { Injectable } from '@angular/core';
import {ImgData} from "../interfaces/img-data";

@Injectable({
  providedIn: 'root'
})
export class AdHandleService {

  public readonly nbMinPictures: number = 3;
  readonly nbMaxPictures: number = 15;

  constructor() { }

  /**
   * If the feature doesn't already exist in the array, add it
   * @param {string} feature - string - the feature to add
   */
  addFeature(feature: string, renting_features: string[]) {
    if (!renting_features.find(f => f.toLowerCase() === feature.toLowerCase()))
      renting_features.push(feature);

    feature = "";
  }

  /**
   * @param {string} feature - string - the feature to be removed
   */
  removeFeature(feature: string, renting_features: string[]) {
    renting_features = renting_features.filter(obj => obj !== feature);
  }

  /**
   * We're looping through the files from the event, checking if the file is already in the files array, and if it's not,
   * we're pushing it to the array
   * @param {any} event - any - the event that is triggered when the user selects a file.
   * @returns the value of the variable 'reader.result'
   */
  addPicture(event: any, files: ImgData[], nbImg:number): void {
    if (this.isFilesFull(nbImg)) return;

    const filesFromEvent = event.target.files;

    for (let i = 0; i < filesFromEvent.length; i++) {

      if (this.isFilesFull(nbImg)) return;
      const file = filesFromEvent[i];

      if (!this.isInFiles(file, files)) {

        nbImg++;
        const reader = new FileReader();

        reader.onload = e => {
          files.push({
            file: file,
            imageSrc: reader.result
          });
        }
        reader.readAsDataURL(file);
      }
    }
  }

  removePicture(file: ImgData, files: ImgData[], nbImg:number) {
    files = files.filter(image => image.file.name !== file.file.name)
    nbImg--;
  }

  /**
   * It returns true if the fileToCheck is in the files array
   * @param {File} fileToCheck - File - the file to check if it's in the files array
   * @returns A boolean value.
   */
  isInFiles(fileToCheck: File, files: ImgData[]): boolean {
    let filesName = files.map((file) => file.file.name)

    return filesName.includes(fileToCheck.name);
  }

  /**
   * It returns true if the number of files is equal to the maximum number of pictures
   * @returns A boolean value.
   */
  isFilesFull(nbImg:number): boolean {
    //NbImg cause the image adding is async
    return nbImg == this.nbMaxPictures;
  }

}
