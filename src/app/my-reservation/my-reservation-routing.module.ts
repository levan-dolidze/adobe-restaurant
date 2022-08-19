import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyReservationComponent } from './my-reservation.component';

const routes: Routes = [
  {
    path: '',
    component: MyReservationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyReservationRoutingModule { }
