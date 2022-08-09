import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

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

  constructor(public dialog: MatDialog, private http: AuthService) { }
  ngOnInit(): void {

    this.returnToken();
    this.userIsLoggedIn()

  };



  userIsLoggedIn() {
    this.http.userLoggedIn$.subscribe((res) => {
      this.authStatusIsLoggedin = true

    })
  }


  returnToken() {
    this.http.getToken().subscribe((res) => {
      if (res) {
        this.authStatusIsLoggedin = true
      } else {
        this.authStatusIsLoggedin = false

      }
    })
  }


  openDialog() {
    this.http.getToken().subscribe((res) => {
      if (res) {
        this.http.logOut()
        this.authStatusIsLoggedin = false
      } else {
        this.dialog.open(LoginComponent)

      }
    })

  };
};
