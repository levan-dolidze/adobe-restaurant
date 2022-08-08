import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEventComponent } from './admin-event.component';

const routes: Routes = [{ path: '', component: AdminEventComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEventRoutingModule { }
