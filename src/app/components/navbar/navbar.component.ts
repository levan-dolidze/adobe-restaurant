import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminPermission } from 'src/app/classes/admin-permission';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(public modal: MatDialog,
    private http: AuthService,
  ) { }

  ngOnInit(): void {
    this.returnToken();
    this.userIsLoggedIn();
  };

  adminChecking(adminMail: AdminPermission) {
    (this.adminPermission.adminPermission(adminMail)) ? this.adminPanel = true : this.adminPanel = false;
  };



  userIsLoggedIn() {
    this.http.userLoggedIn$.subscribe((adminMail) => {
      this.adminChecking(adminMail)
      this.authStatusIsLoggedin = true;
    })
  };


  returnToken() {
    this.http.getToken().subscribe((res) => {
      if (res) {
        this.adminChecking(res.email)
        this.authStatusIsLoggedin = true;
      } else {
        this.authStatusIsLoggedin = false;
      }
    })
  };


  openDialog() {
    this.http.getToken().subscribe((res) => {
      if (res) {
        this.http.logOut();
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

};
