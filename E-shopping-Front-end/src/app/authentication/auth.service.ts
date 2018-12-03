import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationResult: Boolean = false;

  constructor(private http: HttpClient) {}

  login(token, role, email) {
    localStorage.setItem('currentUser', token);
    localStorage.setItem('role', role);
    localStorage.setItem('email', email);
    location.reload();
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
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
