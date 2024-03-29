import {NgModule} from '@angular/core';
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
import {ConnectedGuardService} from "./guards/connected-guard.service";
import {NotConnectedGuardService} from "./guards/not-connected-guard.service";
import {MyReservationComponent} from "../views/my-reservation/my-reservation.component";
import {MyRentingComponent} from "../views/my-renting/my-renting.component";
import {CreateAdComponent} from "../views/create-ad/create-ad.component";
import {AdToValidateComponent} from "../views/admin/ad-to-validate/ad-to-validate.component";
import {ConversationsComponent} from "../views/conversations/conversations.component";
import {AdminRentingsComponent} from "../views/admin/admin-rentings/admin-rentings.component";

const routes: Routes = [
  {path: '', redirectTo: 'annonces', pathMatch: 'full'},
  {path: 'annonces', component: HomepageComponent},
  {path: 'connexion', component: LoginComponent, canActivate: [NotConnectedGuardService]},
  {path: 'inscription', component: RegistrationComponent, canActivate: [NotConnectedGuardService]},
  {path: 'deconnexion', component: DisconnectComponent, canActivate: [ConnectedGuardService]},
  {path: 'compte', component: AccountComponent, canActivate: [ConnectedGuardService]},
  {
    path: 'nouvelle-annonce', component: CreateAdComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: ["hote", "utilisateur"],
    }
  },
  {
    path: 'mes-reservations', component: MyReservationComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: ["utilisateur", "hote"],
    },
  },
  {
    path: 'mes-annonces', component: MyRentingComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: ["hote"],
    },
  },
  {path: 'annonces/:slug', component: RentingComponent},
  {
    path: 'administration',
    component: AdminPageComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRoles: ["administrateur", "super-administrateur"],
    },
    children: [
      {path: 'utilisateurs', component: UserListComponent},
      {path: 'annonces', component: AdminRentingsComponent},
      {path: 'validation-annonces', component: AdToValidateComponent},
    ]
  },
  {path: 'conversations', component: ConversationsComponent, canActivate: [ConnectedGuardService]},
  {path: 'conversations/:id', component: ConversationsComponent, canActivate: [ConnectedGuardService]},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
