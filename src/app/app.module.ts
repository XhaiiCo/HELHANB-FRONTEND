import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './component/card/card.component';
import { AssetsComponent } from './dev/assets/assets.component';
import {RoutingModule} from "./routing.module";
import {IndexComponent} from "./views/index/index.component";
import {CropperComponent} from "./component/cropper/cropper.component";
import {ImageCropperModule} from "ngx-image-cropper";
import {CarouselComponent} from "./component/carousel/carousel.component";
import {HeaderComponent} from "./elements/header/header.component";
import {NotFoundComponent} from "./views/not-found/not-found.component";
import {HomepageComponent} from "./views/homepage/homepage.component";
import {LoginComponent} from "./views/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AssetsComponent,
    IndexComponent,
    CropperComponent,
    CarouselComponent,
    HeaderComponent,
    NotFoundComponent,
    HomepageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    ImageCropperModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
