import { Component, OnInit } from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {
  imageChangedEvent: any;
  private _croppedImage: any;
  status: string = "";

  constructor() { }
  ngOnInit(): void {
  }

  get croppedImage(): any {
    return this._croppedImage;
  }

  set croppedImage(value: any) {
    this._croppedImage = value;
  }

  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64 ;
  }

  imageLoaded() {
    this.status = "image loaded"
  }

  cropperReady() {
    this.status = "cropper ready"
  }

  loadImageFailed() {
    this.status = "Image load failed"
  }

}
