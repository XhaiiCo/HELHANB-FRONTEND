import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardComponent } from './component/card/card.component';
import { AssetsComponent } from './dev/assets/assets.component';
import {RoutingModule} from "./routing.module";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    AssetsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
