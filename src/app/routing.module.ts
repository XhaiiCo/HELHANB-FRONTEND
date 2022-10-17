import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssetsComponent} from "./dev/assets/assets.component";
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./views/index/index.component";
import {CardComponent} from "./component/card/card.component";
import {CropperComponent} from "./component/cropper/cropper.component";
import {NotFoundComponent} from "./views/not-found/not-found.component";
import {HomepageComponent} from "./views/homepage/homepage.component";

const routes: Routes = [
  {path: '', component: HomepageComponent   },
  {path: 'dev', component: IndexComponent},
  {path: 'assets', component: AssetsComponent  },
  {path: 'card', component: CardComponent},
  {path: 'cropper', component: CropperComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
