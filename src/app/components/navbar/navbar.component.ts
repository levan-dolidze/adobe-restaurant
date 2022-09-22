import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin, Observable, of, shareReplay, tap } from 'rxjs';
import { AdminPermission } from 'src/app/classes/admin-permission';
import { LoginComponent } from 'src/app/login/login.component';
import { PrivateDiningModel } from 'src/app/models/privateDiningModel';
import { Notifications } from 'src/app/models/shared';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { fade } from 'src/app/shared/animations';
import { ReservationComponent } from '../reservation/reservation.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [fade]
})
export class NavbarComponent implements OnInit {
  authStatusIsLoggedin: boolean;
  adminPermission: AdminPermission = new AdminPermission();
  adminPanel: boolean = false;
  itemQTY: number = 0;
  eventNotification: number = 0;
  observable$: Observable<any>;
  test$:Observable<any>
  notifications: Notifications = new Notifications()

  constructor(public modal: MatDialog,
    private httpAuth: AuthService,
    private http: HttpService,
    private httpAdmin: AdminService,
    private router: Router

  ) { }
  privateDining$: Observable<PrivateDiningModel[]>

  ngOnInit(): void {
    this.returnTotifications();
    let dish = localStorage.getItem('dishes');
    if (dish) {
      this.itemQTY = JSON.parse(dish).length
    };
    this.returnToken();
    this.userIsLoggedIn();
    this.http.cartChanges.subscribe((QTY) => {
      this.itemQTY = QTY.length
    })
  };


  returnTotifications() {
    this.observable$ = forkJoin({
      event:this.httpAdmin.returnPrivateDining(),
      table: this.httpAdmin.getTableReservations(),
      orders: this.httpAdmin.getOnlineOrders(),
      messages: this.httpAdmin.getCustomerMessage(),
    }).pipe(
      shareReplay()
    )
  };


  showNotifications(){
    this.test$ = this.observable$.pipe(
      tap(() => console.log('one data exists')),
      shareReplay()
    )
    this.test$.subscribe((res) => {
      this.notifications = res
    })
  };



  adminChecking(adminMail: AdminPermission) {
    (this.adminPermission.adminPermission(adminMail)) ? this.adminPanel = true : this.adminPanel = false;
  };



  userIsLoggedIn() {
    this.httpAuth.userLoggedIn$.subscribe((adminMail) => {
      this.adminChecking(adminMail)
      this.authStatusIsLoggedin = true;
    })
  };


  returnToken() {
    this.httpAuth.getToken().subscribe((res) => {
      if (res) {
        this.adminChecking(res.email)
        this.authStatusIsLoggedin = true;
      } else {
        this.authStatusIsLoggedin = false;
      }
    })
  };


  openDialog() {
    this.httpAuth.getToken().subscribe((res) => {
      if (res) {
        this.httpAuth.logOut();
        this.adminPanel = false;
        this.authStatusIsLoggedin = false;
        this.itemQTY = 0
      } else {
        this.modal.open(LoginComponent)
      };
    })
  };

  openReserve() {
    this.modal.open(ReservationComponent, {
      autoFocus: false,
      maxHeight: '90vh'
    })
  };
  showCart() {
    this.router.navigate(['/cart'])
  };
};
