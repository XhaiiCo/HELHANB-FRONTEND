import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssetsComponent} from "./dev/assets/assets.component";
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./component/index/index.component";

const routes: Routes = [
  {path: 'assets', component: AssetsComponent  },
  {path: '**', component: IndexComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
