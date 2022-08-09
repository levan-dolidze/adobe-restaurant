import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public firebaseAuth: AngularFireAuth) { }



  async signUp(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }
};


