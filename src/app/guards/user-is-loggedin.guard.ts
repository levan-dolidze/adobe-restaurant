import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserIsLoggedinGuard implements CanActivate {
  canActivate(): boolean {
    let token = localStorage.getItem('user');
    if (token) {
      let tokenJson = JSON.parse(token);
      if (tokenJson.emailVerified) {
        return true
      }
      return false
    }
    else {
      return false
    }
  }
};
