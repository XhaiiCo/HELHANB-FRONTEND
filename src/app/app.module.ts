import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './component/card/card.component';
import {RoutingModule} from "./routing/routing.module";
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
import {ToastNotificationComponent} from "./component/toast-notification/toast-notification.component";
import {AdminPageComponent} from "./views/admin/admin-page/admin-page.component";
import {UserListComponent} from "./views/admin/users/user-list/user-list.component";
import { ModalConfirmationComponent } from './component/modal-confirmation/modal-confirmation.component';
import {AccountComponent} from "./views/account/account.component";
import { MyRentingComponent } from './views/my-renting/my-renting.component';
import { MyReservationComponent } from './views/my-reservation/my-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CarouselComponent,
    HeaderComponent,
    NotFoundComponent,
    HomepageComponent,
    LoginComponent,
    RentingComponent,
    RegistrationComponent,
    DatePickerComponent,
    RoundPipePipe,
    ToastNotificationComponent,
    AdminPageComponent,
    UserListComponent,
    ModalConfirmationComponent,
    AccountComponent,
    MyRentingComponent,
    MyReservationComponent,
  ],
  imports: [
    MbscModule,
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
