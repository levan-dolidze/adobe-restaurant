import { Component, OnInit } from '@angular/core';
import { AuthModel, SignupModel } from '../models/authModel';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { getAuth, sendEmailVerification } from "firebase/auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authservice: AuthService, 
              private dialog: MatDialog) { }

  auth: AuthModel = new AuthModel();
  signupModel: SignupModel = new SignupModel();
  authorizationModal: boolean = true;
  registrationModal: boolean;

  ngOnInit(): void {

  }







  async userSignIn(form: any) {
    if (form.innvalid) {
      return
    }
    else {
      await this.authservice.signIn(this.auth.email, this.auth.password).then(res => {
        this.authservice.getToken().subscribe((res) => {
          if (res) {
            this.dialog.closeAll()
            this.authservice.userLoggedIn$.next(res.email);
          }
          else {
            return
          }

        })

      })
    };
  };


  async userSignUp(form: any) {
    if (form.invalid) {
      return
    } else {
      await this.authservice.signUp(this.signupModel.email, this.signupModel.pass);
      this.verifyEmail();
      this.dialog.closeAll()
    }
  };


  verifyEmail() {
    const auth = getAuth();
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeout(() => {
          }, 3000);
        });

    }
  }
}
