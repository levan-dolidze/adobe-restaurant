import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) }, { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) }, { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) }, { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) }, { path: 'reservation', loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationModule) }, { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) }, { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) }, { path: 'admin-product', loadChildren: () => import('./admin-product/admin-product.module').then(m => m.AdminProductModule) }, { path: 'admin-order', loadChildren: () => import('./admin-order/admin-order.module').then(m => m.AdminOrderModule) }, { path: 'admin-reservation', loadChildren: () => import('./admin-reservation/admin-reservation.module').then(m => m.AdminReservationModule) }, { path: 'admin--event', loadChildren: () => import('./admin-event/admin-event.module').then(m => m.AdminEventModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
