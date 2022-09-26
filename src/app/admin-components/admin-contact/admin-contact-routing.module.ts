import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminContactComponent } from './admin-contact.component';

const routes: Routes = [{ path: '', component: AdminContactComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminContactRoutingModule { }
