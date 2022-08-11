import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminPermission } from 'src/app/classes/admin-permission';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('fade', [
      transition('void=>*', [
        style({ backgroundColor: 'white', opacity: 0 }),
        animate(1000, style({ backgroundColor: '#rgb(171, 155, 86)', opacity: 1 }))

      ])
    ]),
    trigger('fadeout', [
      transition('void=>*', [
        style({ color: 'white', opacity: 0 }),
        animate(1000, style({ color: 'black', opacity: 1 }))
      ])

    ])
  ]
})
export class NavbarComponent implements OnInit {
  authStatusIsLoggedin: boolean;
  adminPermission: AdminPermission = new AdminPermission();
  adminPanel: boolean = false;
  constructor(public dialog: MatDialog, private http: AuthService) { }

  ngOnInit(): void {
    this.returnToken();
    this.userIsLoggedIn();
  };

  adminChecking(adminMail: AdminPermission) {
    (this.adminPermission.adminPermission(adminMail))?this.adminPanel = true:this.adminPanel = false;
  };



  userIsLoggedIn() {
    this.http.userLoggedIn$.subscribe((adminMail) => {
      this.adminChecking(adminMail)
      this.authStatusIsLoggedin = true;
    })
  };


  returnToken() {
    this.http.getToken().subscribe((res) => {
      switch (res) {
        case res:true
        this.adminChecking(res.email)
        this.authStatusIsLoggedin = true;
          break;
        default:
        this.authStatusIsLoggedin = false;
          break;
      }
    })
  };


  openDialog() {
    this.http.getToken().subscribe((res) => {
      if (res) {
        this.http.logOut();
        this.adminPanel = false
        this.authStatusIsLoggedin = false
      } else {
        this.dialog.open(LoginComponent)
      };
    })
  };
};
