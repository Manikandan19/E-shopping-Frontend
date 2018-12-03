import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http: HttpClient) {}

  _url = 'http://172.16.144.166:3000/order';

  getCartDetails(obj) {
    console.log(obj);
    return this.http.post<Product[]>(this._url + '/getCart', obj);
  }
}
