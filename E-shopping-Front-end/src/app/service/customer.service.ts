import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  _url = 'http://172.16.144.166:3000/customer';

  _userAuthenticatedToken: String = localStorage.getItem('currentUser');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this._userAuthenticatedToken}`
    })
  };

  getRegistration(obj) {
      return this.http.post(this._url + '/registration', obj);
  }

  getLogin(obj: Product) {
    return this.http.post(this._url + '/login', obj);
  }

  sendOTP(obj) {
    return this.http.post(this._url + '/changePassword/verifyEmail', obj);
  }

  changePassword(obj) {
    return this.http.post(this._url + '/changePassword', obj);
  }

  registrationSendOTP(obj) {
    return this.http.post(this._url + '/registration/verifyEmail', obj);
  }

  getOrderProduct(obj) {
    return this.http.post(this._url + '/getOrderProduct', obj, this.httpOptions);
  }
}
