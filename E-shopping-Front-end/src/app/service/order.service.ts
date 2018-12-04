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

  addToCart(obj) {
    return this.http.post<Product[]>(this._url + '/addToCart', obj);
  }

  deleteFromCart(obj) {
    return this.http.post<Product[]>(this._url + '/deleteFromCart', obj);
  }

  getOrderItem(obj) {
    return this.http.post<Product[]>(this._url + '/addToPurchase', obj);
  }

  deleteOrderItem(obj) {
    return this.http.post<Product[]>(this._url + '/deleteFromPurchase', obj);
  }
}
