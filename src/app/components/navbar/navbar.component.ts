import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';

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
  authStatusIsLoggedin: boolean = true

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {

  };


  openDialog() {
    this.dialog.open(LoginComponent)
  };
};
