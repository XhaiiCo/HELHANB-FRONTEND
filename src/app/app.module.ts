import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './component/card/card.component';
import { AssetsComponent } from './dev/assets/assets.component';
import {RoutingModule} from "./routing.module";
import {IndexComponent} from "./component/index/index.component";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {CropperComponent} from "./component/cropper/cropper.component";
import {ImageCropperModule} from "ngx-image-cropper";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AssetsComponent,
    IndexComponent,
    CropperComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    CarouselModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
