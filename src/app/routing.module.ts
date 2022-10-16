import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssetsComponent} from "./dev/assets/assets.component";
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./views/index/index.component";
import {CardComponent} from "./component/card/card.component";
import {CropperComponent} from "./component/cropper/cropper.component";

const routes: Routes = [
  {path: 'assets', component: AssetsComponent  },
  {path: 'card', component: CardComponent},
  {path: 'cropper', component: CropperComponent},
  {path: '**', component: IndexComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
