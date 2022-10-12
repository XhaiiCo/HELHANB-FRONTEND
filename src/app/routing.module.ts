import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssetsComponent} from "./dev/assets/assets.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'assets', component: AssetsComponent  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
