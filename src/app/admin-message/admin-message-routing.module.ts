import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMessageComponent } from './admin-message.component';

const routes: Routes = [{ path: '', component: AdminMessageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMessageRoutingModule { }
