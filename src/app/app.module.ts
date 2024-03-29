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
import { DatePickerComponent } from './component/date-picker/date-picker.component';
import {CredentialsInterceptor} from "./interceptors/credentials.interceptor";
import { RoundPipePipe } from './views/renting/round-pipe.pipe';
import {ToastNotificationComponent} from "./elements/toast-notification/toast-notification.component";
import {AdminPageComponent} from "./views/admin/admin-page/admin-page.component";
import {UserListComponent} from "./views/admin/users/user-list/user-list.component";
import { ModalConfirmationComponent } from './component/modal-confirmation/modal-confirmation.component';
import {AccountComponent} from "./views/account/account.component";
import { MyRentingComponent } from './views/my-renting/my-renting.component';
import { MyReservationComponent } from './views/my-reservation/my-reservation.component';
import { CreateAdComponent } from './views/create-ad/create-ad.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatNativeDateModule } from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { PaginationComponent } from './component/pagination/pagination.component';
import { AdToValidateComponent } from './views/admin/ad-to-validate/ad-to-validate.component';
import { AdItemComponent } from './views/admin/ad-to-validate/ad-item/ad-item.component';
import { LoaderComponent } from './component/loader/loader.component';
import { MessagesComponent } from './views/conversations/messages/messages.component';
import { MyAdComponent } from './views/my-renting/my-ad/my-ad.component';
import { ConversationsComponent } from './views/conversations/conversations.component';
import { MyAdReservationsToManageListComponent } from './views/my-renting/my-ad/my-ad-reservations-to-manage-list.component/my-ad-reservations-to-manage-list.component';
import { FilteringFormComponent } from './component/filtering-form/filtering-form.component';
import { AdminRentingsComponent } from './views/admin/admin-rentings/admin-rentings.component';
import { ReservationListComponent } from './views/my-reservation/reservation-list/reservation-list.component';
import { MyAdConfirmedReservationListComponent } from './views/my-renting/my-ad/my-ad-confirmed-reservation-list/my-ad-confirmed-reservation-list.component';
import { MyAdReservationCardComponent } from './views/my-renting/my-ad/my-ad-reservation-card/my-ad-reservation-card.component';

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
    CreateAdComponent,
    PaginationComponent,
    AdToValidateComponent,
    AdItemComponent,
    LoaderComponent,
    MessagesComponent,
    MyAdComponent,
    ConversationsComponent,
    MyAdReservationsToManageListComponent,
    FilteringFormComponent,
    AdminRentingsComponent,
    ReservationListComponent,
    MyAdConfirmedReservationListComponent,
    MyAdReservationCardComponent,
  ],
    imports: [
        BrowserModule,
        RoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
