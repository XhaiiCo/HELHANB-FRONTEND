import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "../views/not-found/not-found.component";
import {HomepageComponent} from "../views/homepage/homepage.component";
import {LoginComponent} from "../views/login/login.component";
import {RegistrationComponent} from "../views/registration/registration.component";
import {RentingComponent} from "../views/renting/renting.component";
import {DisconnectComponent} from "../views/disconnect/disconnect.component";
import {AccountComponent} from "../views/account/account.component";
import {AdminPageComponent} from "../views/admin/admin-page/admin-page.component";
import {RoleGuardService} from "./guards/role-guard.service";
import {UserListComponent} from "../views/admin/users/user-list/user-list.component";

const routes: Routes = [
  {path: '', component: HomepageComponent   },
  {path: 'connexion', component: LoginComponent},
  {path: 'inscription', component: RegistrationComponent},
  {path: 'deconnexion', component: DisconnectComponent},
  {path: 'compte', component: AccountComponent},
  {path: 'location/:id', component: RentingComponent },
  {
    path: 'administration',
    component: AdminPageComponent,
    //canActivate: [RoleGuardService],
    data: {
      expectedRole: 3,
    },
    children: [
      {path: 'utilisateurs', component: UserListComponent},
    ]
  },
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
