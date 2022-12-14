import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { of, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public firebaseAuth: AngularFireAuth) { }
  userLoggedIn$: Subject<any> = new Subject()


  getToken() {
    let token = localStorage.getItem('user');
    if (token) {
      let tokenJson = JSON.parse(token);
      if (tokenJson.emailVerified) {
        return of(tokenJson)
      }
      return of(false)
    }
    return of(false)
  }


  async signUp(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  async signIn(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  };

  async logOut() {
    this.firebaseAuth.signOut();
    localStorage.clear()
  }
};


