import {Component, Input, OnInit} from '@angular/core';
import {DtoInputMyAds} from "../../../dtos/ad/dto-input-my-ads";
import {environment} from "../../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ImgData} from "../../../interfaces/img-data";
import {AdHandleService} from "../../../services/ad-handle.service";

@Component({
  selector: 'app-my-ad',
  templateUrl: './my-ad.component.html',
  styleUrls: ['./my-ad.component.scss']
})
export class MyAdComponent implements OnInit {

  readonly pictureBaseUrl: string = environment.pictureUrl ;

  @Input() ad!: DtoInputMyAds ;

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

  constructor(public adHandleService : AdHandleService) { }

  ngOnInit(): void {

  }

  onPictureAdded(files: any) {
    this.adHandleService.filesToBase64(files).then(files =>
    {
      for (let i = 0; i < files.length; i++)
      {
        if (this.adHandleService.isMaxNumberOfPicturesReached(this.ad.picturesToAdd.length + this.ad.pictures.length)) break;
        if (this.adHandleService.isPictureAlreadyUploaded(files[i], [...this.ad.picturesToAdd])) continue;

        this.ad.picturesToAdd.push(files[i]);
      }
    });
  }

  deletePicture(picPath: string)
  {
    this.ad.pictures = this.ad.pictures.filter(pic => pic.path != picPath);
    this.ad.picturesToDelete.push(picPath);
  }

  removePicture(file: string)
  {
    this.ad.picturesToAdd = this.adHandleService.removePicture(file, [...this.ad.picturesToAdd]);
  }




}
