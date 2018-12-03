import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {OrderService} from '../../service/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'e-shopping-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

orderAddressForm: FormGroup;
orderForm: FormGroup;
paymentForm: FormGroup;

cartRequestObject: Object;
cartResponseObject: any;
arrayObj: any[];
selectedItems: any[];

items: any[] = [ {label: '1', value: 1}, {label: '2', value: 2}, {label: '3', value: 3}, {label: '4', value: 4}, {label: '5', value: 5}];
items1: any[] = [ {label: '1', value: 1}, {label: '2', value: 2}, {label: '3', value: 3}, {label: '4', value: 4}, {label: '5', value: 5}];


ccRegExp: String = '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9]' +
  '[0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$';


  constructor(private formBuilder: FormBuilder, private orderService: OrderService) { }

  ngOnInit() {

    this.cartRequestObject = {
      email: localStorage.getItem('email')
    };
    this.orderService.getCartDetails(this.cartRequestObject).
    subscribe(
      response => {
        this.cartResponseObject = response;
      }, error => {
        console.log('Error');
      }
    );


    this.orderAddressForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3), Validators.maxLength(40)]],
      phone: ['', [Validators.required, Validators.pattern('[9876]{1}[0-9]{9}')]],
      pinCode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      address: ['', Validators.required],
      landMark: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      alternatePhone: ['', [Validators.pattern('[9876]{1}[0-9]{9}')]],
      district: ['', [Validators.required, Validators.pattern('[A-Z]{1}[a-z ]*'), Validators.minLength(3), Validators.maxLength(40)]],
      state: ['', [Validators.required, Validators.pattern('[A-Z]{1}[a-z ]*'), Validators.minLength(3), Validators.maxLength(40)]],
      type: ['', Validators.required]
    });

    this.orderForm = this.formBuilder.group({
        items: ['', Validators.required]
    });

    this.paymentForm = this.formBuilder.group({
        debitCard: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
        captcha: ['', Validators.required]
    });
  }

  captchaResponse(event) {
    console.log(event);
  }

  orderResponse() {
    Swal('Order Success', 'You have successfully order your items', 'success');
  }

}
