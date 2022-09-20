import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMessageComponent } from './customer-message.component';

const routes: Routes = [{ path: '', component: CustomerMessageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerMessageRoutingModule { }
