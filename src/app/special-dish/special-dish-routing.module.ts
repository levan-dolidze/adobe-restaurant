import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialDishComponent } from './special-dish.component';

const routes: Routes = [{ path: '', component: SpecialDishComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialDishRoutingModule { }
