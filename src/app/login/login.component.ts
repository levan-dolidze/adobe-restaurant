import { Component, OnInit } from '@angular/core';
import { SignupModule } from '../components/signup/signup.module';
import { AuthModel, SignupModel } from '../models/authModel';
import { AuthService } from '../services/auth.service';
import { getAuth, sendEmailVerification } from "firebase/auth";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice: AuthService, private dialog: MatDialog) { }

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
            this.authservice.userLoggedIn$.next();
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
      await this.authservice.signUp(this.auth.email, this.auth.password);
      this.verifyEmail();
    }


  }


  verifyEmail() {
    const auth = getAuth();
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeout(() => {
            // this.dialog.closeAll()
            // this.authServise.userIsLogedin.next(true);

            // this.router.navigate([''])
          }, 3000);
        });

    }
  }
}
