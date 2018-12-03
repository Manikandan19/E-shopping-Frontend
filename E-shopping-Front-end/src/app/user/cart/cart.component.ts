import { Component, OnInit } from '@angular/core';

import {OrderService} from '../../service/order.service';
import { Product } from 'src/app/Model/product';

@Component({
  selector: 'e-shopping-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartRequestObject: Object;
  cartResponseObject: any;
  arrayObj: any[];
  selectedItems: any[];
  items: any[] = [ {label: '1', value: 1}, {label: '2', value: 2}, {label: '3', value: 3}, {label: '4', value: 4}, {label: '5', value: 5}];
  items1: any[] = [ {label: '1', value: 1}, {label: '2', value: 2}, {label: '3', value: 3}, {label: '4', value: 4}, {label: '5', value: 5}];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.cartRequestObject = {
      email: localStorage.getItem('email')
    };
    this.orderService.getCartDetails(this.cartRequestObject).
    subscribe(
      response => {
        this.cartResponseObject = response;
        if (this.cartResponseObject.message !== 'Not available') {
          this.cartResponseObject = response;
        } else {
          this.cartResponseObject = undefined;
        }
      }, error => {
        console.log('Error');
      }
    );
  }

}
