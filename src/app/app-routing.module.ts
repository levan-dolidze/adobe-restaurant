import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'

  },

  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule) },
  { path: 'menu', loadChildren: () => import('./components/menu/menu.module').then(m => m.MenuModule) },
  { path: 'news', loadChildren: () => import('./components/news/news.module').then(m => m.NewsModule) },
  { path: 'contact', loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule) },
  { path: 'reservation', loadChildren: () => import('./components/reservation/reservation.module').then(m => m.ReservationModule) },
  { path: 'events', loadChildren: () => import('./components/events/events.module').then(m => m.EventsModule) },
  { path: 'order', loadChildren: () => import('./components/order/order.module').then(m => m.OrderModule) },
  { path: 'admin-product', loadChildren: () => import('./admin-components/admin-product/admin-product.module').then(m => m.AdminProductModule) },
  { path: 'admin-order', loadChildren: () => import('./admin-components/admin-order/admin-order.module').then(m => m.AdminOrderModule) },
  { path: 'admin-reservation', loadChildren: () => import('./admin-components/admin-reservation/admin-reservation.module').then(m => m.AdminReservationModule) },
  { path: 'admin--event', loadChildren: () => import('./admin-components/admin-event/admin-event.module').then(m => m.AdminEventModule) },
  { path: 'gallery', loadChildren: () => import('./components/gallery/gallery.module').then(m => m.GalleryModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
