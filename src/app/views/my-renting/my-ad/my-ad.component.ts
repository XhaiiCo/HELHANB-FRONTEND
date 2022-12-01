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

  pictureBaseUri: string = environment.pictureUrl;

  @Input() nbImg: number = 0;

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

  deletePicture(picPath: string)
  {
    this.ad.pictures = this.ad.pictures.filter(pic => pic.path != picPath);
    this.picturesToDelete.push(picPath);
    this.decrNbImg();
  }

  decrNbImg(){
    this.nbImg--;
  }

  test()
  {
    console.log(this.nbImg);
  }





  constructor(public adHandleService : AdHandleService) { }

  ngOnInit(): void {
  }


}
