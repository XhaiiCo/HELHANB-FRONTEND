import { NgModule } from '@angular/core';
import {AssetsComponent} from "../dev/assets/assets.component";
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "../views/index/index.component";
import {CardComponent} from "../component/card/card.component";
import {CropperComponent} from "../component/cropper/cropper.component";
import {NotFoundComponent} from "../views/not-found/not-found.component";
import {HomepageComponent} from "../views/homepage/homepage.component";
import {LoginComponent} from "../views/login/login.component";
import {RegistrationComponent} from "../views/registration/registration.component";
import {RentingComponent} from "../views/renting/renting.component";
import {DisconnectComponent} from "../views/disconnect/disconnect.component";
import {AccountComponent} from "../views/account/account.component";
import {AdminPageComponent} from "../views/admin/admin-page/admin-page.component";

const routes: Routes = [
  {path: '', component: HomepageComponent   },
  {path: 'connexion', component: LoginComponent},
  {path: 'inscription', component: RegistrationComponent},
  {path: 'deconnexion', component: DisconnectComponent},
  {path: 'compte', component: AccountComponent},
  {path: 'dev', component: IndexComponent},//Remove
  {path: 'assets', component: AssetsComponent  },//Remove
  {path: 'card', component: CardComponent},//Remove
  {path: 'cropper', component: CropperComponent},//Remove
  {path: 'location/:id', component: RentingComponent },

  {path: 'administration', component: AdminPageComponent},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
