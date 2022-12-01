import {Component, Input, OnInit} from '@angular/core';
import {DtoInputMyAds} from "../../../dtos/ad/dto-input-my-ads";
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ImgData} from "../../../interfaces/img-data";

@Component({
  selector: 'app-my-ad',
  templateUrl: './my-ad.component.html',
  styleUrls: ['./my-ad.component.scss']
})
export class MyAdComponent implements OnInit {

  pictureBaseUri: string = environment.pictureUrl;

  readonly nbMinPictures: number = 3;
  readonly nbMaxPictures: number = 15;

  private nbImg: number = 0;

  @Input() ad!: DtoInputMyAds ;

  readonly pictureBaseUrl: string = environment.pictureUrl ;

  picturesToAdd: ImgData[] = [];
  picturesToDelete: string[] = [];

  adUpdateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    numberOfPersons: new FormControl([], [Validators.required, Validators.min(0)]),
    numberOfBedrooms: new FormControl([], [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    pricePerNight: new FormControl([], [Validators.required, Validators.min(0)]),
    arrivalTimeRangeStart: new FormControl('', Validators.required),
    arrivalTimeRangeEnd: new FormControl('', Validators.required),
    leaveTime: new FormControl('', Validators.required),
  });

  tmp_feature: string = "";

  addFeature(feature: string) {
    if (!this.ad.features.find(f => f.toLowerCase() === feature.toLowerCase()))
      this.ad.features.push(feature);

    this.tmp_feature = "";
  }

  removeFeature(feature: string) {
    this.ad.features = this.ad.features.filter(obj => obj !== feature);
  }

  deletePicture(picPath: string)
  {
    this.ad.pictures = this.ad.pictures.filter(pic => pic.path != picPath);
    this.picturesToDelete.push(picPath);
  }

  addPicture(event: any): void {
    if (this.isFilesFull()) return;

    const filesFromEvent = event.target.files;

    for (let i = 0; i < filesFromEvent.length; i++) {

      if (this.isFilesFull()) return;
      const file = filesFromEvent[i];

      if (!this.isInFiles(file)) {

        this.nbImg++;
        const reader = new FileReader();

        reader.onload = e => {
          this.picturesToAdd.push({
            file: file,
            imageSrc: reader.result
          });
        }
        reader.readAsDataURL(file);
      }
    }

    console.log(this.picturesToAdd);
  }

  removePicture(file: ImgData) {
    this.picturesToAdd = this.picturesToAdd.filter(image => image.file.name !== file.file.name)
    this.nbImg--;
  }

  isInFiles(fileToCheck: File): boolean {
    let filesName = this.picturesToAdd.map((file) => file.file.name)

    return filesName.includes(fileToCheck.name);
  }

  isFilesFull(): boolean {
    //NbImg cause the image adding is async
    return this.nbImg == this.nbMaxPictures;
  }







  constructor() { }

  ngOnInit(): void {
  }


}
