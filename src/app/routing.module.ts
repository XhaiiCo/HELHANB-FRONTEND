import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssetsComponent} from "./dev/assets/assets.component";
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./views/index/index.component";
import {CardComponent} from "./component/card/card.component";
import {CropperComponent} from "./component/cropper/cropper.component";
import {NotFoundComponent} from "./views/not-found/not-found.component";
import {HomepageComponent} from "./views/homepage/homepage.component";
import {LoginComponent} from "./views/login/login.component";
import {RegistrationComponent} from "./views/registration/registration.component";

const routes: Routes = [
  {path: '', component: HomepageComponent   },
  {path: 'connexion', component: LoginComponent},
  {path: 'inscription', component: RegistrationComponent},
  {path: 'dev', component: IndexComponent},//Remove
  {path: 'assets', component: AssetsComponent  },//Remove
  {path: 'card', component: CardComponent},//Remove
  {path: 'cropper', component: CropperComponent},//Remove
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
