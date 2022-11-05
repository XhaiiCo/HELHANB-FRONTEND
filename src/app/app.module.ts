import { MbscModule } from '@mobiscroll/angular';
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RentingComponent } from './views/renting/renting.component';
import {RegistrationComponent} from "./views/registration/registration.component";
import {HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DatePickerComponent } from './views/renting/date-picker/date-picker.component';
import {CredentialsInterceptor} from "./interceptors/credentials.interceptor";
import { RoundPipePipe } from './views/renting/round-pipe.pipe';

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
    RentingComponent,
    RegistrationComponent,
    DatePickerComponent,
    RoundPipePipe,
  ],
  imports: [
    MbscModule,
    BrowserModule,
    RoutingModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
