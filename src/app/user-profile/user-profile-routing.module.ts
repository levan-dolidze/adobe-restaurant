import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent
  },
  // {
  //   path: 'user-profile',
  //   component: UserProfileComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: 'my-reservation',
  //       loadChildren: () => import('../my-reservation/my-reservation.module').then(m => m.MyReservationModule)
  //     },


  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
