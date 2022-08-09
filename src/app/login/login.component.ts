import { Component, OnInit } from '@angular/core';
import { SignupModule } from '../components/signup/signup.module';
import { AuthModel, SignupModel } from '../models/authModel';
import { AuthService } from '../services/auth.service';
import { getAuth, sendEmailVerification } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  auth: AuthModel = new AuthModel();
  signupModel: SignupModel = new SignupModel();
  authorizationModal: boolean = true;
  registrationModal: boolean;

  ngOnInit(): void {
  }

  signIn(form: any) {
    if (form.innvalid) {
      return
    }
    else {

    }
  }


  async userSignUp(form: any) {
    if (form.invalid||this.signupModel.pass.length<6) {
      return
    } else {
      await this.authservice.signUp(this.auth.email, this.auth.password);
      this.verifyEmail()
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
