import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminPermission } from 'src/app/classes/admin-permission';
import { LoginComponent } from 'src/app/login/login.component';
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
  cart: number = 0
  constructor(public modal: MatDialog,
    private httpAdmin: AuthService,
    private http: HttpService,
    private router:Router

  ) { }

  ngOnInit(): void {
    let cart = localStorage.getItem('cart');
    if (cart) {
      this.cart = JSON.parse(cart)
    }


    this.returnToken();
    this.userIsLoggedIn();
    this.http.cartChanges.subscribe((QTY) => {
      this.cart = QTY

    })
  };

  adminChecking(adminMail: AdminPermission) {
    (this.adminPermission.adminPermission(adminMail)) ? this.adminPanel = true : this.adminPanel = false;
  };



  userIsLoggedIn() {
    this.httpAdmin.userLoggedIn$.subscribe((adminMail) => {
      this.adminChecking(adminMail)
      this.authStatusIsLoggedin = true;
    })
  };


  returnToken() {
    this.httpAdmin.getToken().subscribe((res) => {
      if (res) {
        this.adminChecking(res.email)
        this.authStatusIsLoggedin = true;
      } else {
        this.authStatusIsLoggedin = false;
      }
    })
  };


  openDialog() {
    this.httpAdmin.getToken().subscribe((res) => {
      if (res) {
        this.httpAdmin.logOut();
        this.adminPanel = false;
        this.authStatusIsLoggedin = false;
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
   
  }
};
