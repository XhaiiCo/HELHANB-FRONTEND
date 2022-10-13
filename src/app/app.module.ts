import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './component/card/card.component';
import { AssetsComponent } from './dev/assets/assets.component';
import {RoutingModule} from "./routing.module";
import {IndexComponent} from "./component/index/index.component";
import {CropperComponent} from "./component/cropper/cropper.component";
import {ImageCropperModule} from "ngx-image-cropper";
import {CarouselComponent} from "./component/carousel/carousel.component";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AssetsComponent,
    IndexComponent,
    CropperComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
