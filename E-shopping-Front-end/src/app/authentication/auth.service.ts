import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationResult: Boolean = false;

  constructor(private http: HttpClient) {}

  login(token, role, email, username, userId, phone) {
    localStorage.setItem('currentUser', token);
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
    localStorage.setItem('phone', phone);
    location.reload();
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('phone');
    location.reload();
  }

  isAuthenticatedUser(): Boolean {
    const localItem = localStorage.getItem('currentUser');
    if (localItem !== null) {
      this.authenticationResult = true;
    }
    return this.authenticationResult;
  }

  isAuthenticatedRole(): Boolean {
    const localItem = localStorage.getItem('role');
    if (localItem !== null) {
      return true;
    }
  return false;
  }
}
