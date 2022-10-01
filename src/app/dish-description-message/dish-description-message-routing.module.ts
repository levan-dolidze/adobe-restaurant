import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishDescriptionMessageComponent } from './dish-description-message.component';

const routes: Routes = [{ path: '', component: DishDescriptionMessageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishDescriptionMessageRoutingModule { }
