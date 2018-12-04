import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../service/order.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/service/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'e-shopping-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
  providers: [MessageService]
})
export class PlaceOrderComponent implements OnInit {
  orderAddressForm: FormGroup;
  orderForm: FormGroup;
  paymentForm: FormGroup;

  getCartRequestObject: Object;
  cartResponseObject: any;
  arrayObj: any[];
  selectedItems: any[];
  userEmail: String;
  orderProductName: String;
  orderProductResponse: any;
  orderProductObj: Object;
  enableRemoveItem: Boolean = false;
  deleteFromCartRequest: Object;
  deleteFromCartResponse: any;

  items: any[] = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
  ];

  deliveryState: any[] = [
    { label: 'Tamilnadu', value: 'Tamilnadu' },
    { label: 'Kerala', value: 'Kerala' }
  ];

  deliveryDistrict: any[];

  deliveryType: any[] = [
    { label: 'Home', value: 'Home' },
    { label: 'Office', value: 'Office' }
  ];

  tnObj: any[] = [
    { label: 'Chennai', value: 'Chennai' },
    { label: 'Coimbatore', value: 'Coimbatore' },
    { label: 'Salem', value: 'Salem' },
    { label: 'Madurai', value: 'Madurai' }
  ];

  klObj: any[] = [
    { label: 'Palakkad', value: 'Palakkad' },
    { label: '	Alappuzha', value: 'Alappuzha' },
    { label: 'Kozhikode', value: 'Kozhikode' },
    { label: 'Malappuram', value: 'Malappuram' }
  ];

  ccRegExp: String =
    '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9]' +
    '[0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$';

  constructor(
    private formBuilder: FormBuilder,
    private userService: CustomerService,
    private orderService: OrderService,
    private messageService: MessageService,
    private activatesRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatesRoute.queryParams.subscribe(parameter => {
      this.orderProductName = parameter['name'];
    });

    // Order Items from User Cart
    if (this.orderProductName === undefined) {
      this.getCartRequestObject = {
        email: localStorage.getItem('email')
      };
      this.userEmail = localStorage.getItem('email');
      this.orderService.getCartDetails(this.getCartRequestObject).subscribe(
        response => {
          this.cartResponseObject = response;
        },
        error => {
          console.log('Error at order item from cart');
        }
      );
    } else {
      // Order Item from description
      this.orderProductObj = {
        productName: this.orderProductName
      };

      this.userService
        .getOrderProduct(this.orderProductObj)
        .subscribe(response => {
          this.orderProductResponse = response;
          this.enableRemoveItem = true;
          if (!this.orderProductResponse.message) {
            this.cartResponseObject = this.orderProductResponse;
            console.log(this.cartResponseObject);
          } else if (this.orderProductResponse.message) {
            this.messageService.add({
              severity: 'error',
              detail: 'Product does not exist',
              summary: 'Product Not Exist'
            });
          }
        });
    }

    this.orderAddressForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z]*'),
          Validators.minLength(3),
          Validators.maxLength(40)
        ]
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern('[9876]{1}[0-9]{9}')]
      ],
      pinCode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      address: ['', Validators.required],
      landMark: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]
      ],
      alternatePhone: ['', [Validators.pattern('[9876]{1}[0-9]{9}')]],
      district: ['', [Validators.required]],
      state: ['', [Validators.required]],
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

  // Remove Item from cart
  deleteFromCart(productName) {
    this.deleteFromCartRequest = {
      productName: productName,
      email: this.userEmail
    };
    this.orderService.deleteFromCart(this.deleteFromCartRequest).subscribe(
      response => {
        this.deleteFromCartResponse = response;
        // console.log(this.deleteFromCartResponse);
        if (this.deleteFromCartResponse.message === 'success') {
          this.messageService.add({
            severity: 'success',
            summary: 'Cart Deletion',
            detail: 'You have successfully deleted from cart'
          });
          // Reload page after deletion
          this.orderService.getCartDetails(this.getCartRequestObject).subscribe(
            response1 => {
              this.cartResponseObject = response1;
            },
            error => {
              console.log('Error');
            }
          );
        }
      },
      error => {
        console.log('Error at delete from cart');
      }
    );
  }

  getSelectDeliveryState(event) {
    if (event.value === 'Tamilnadu') {
      this.deliveryDistrict = this.tnObj.slice(0);
    } else if (event.value === 'Kerala') {
      this.deliveryDistrict = this.klObj.slice(0);
    }
  }

  // Validation

  validateUsername() {
    if (this.orderAddressForm.get('name').hasError('pattern')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Invalid username - Username must contains alphabets'
      });
    } else  if (this.orderAddressForm.get('name').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Username must be required'
      });
    }
  }

  validatePhone() {
    if (this.orderAddressForm.get('phone').hasError('pattern')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Phone number must be 10 numerical digit.'
      });
    } else if (this.orderAddressForm.get('phone').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Phone number must be required'
      });
    }
  }


  validateDeliveryLandMark() {
    if (this.orderAddressForm.get('landMark').hasError('pattern')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Landmark specification - (Alphabets, space & numbers)'
      });
    } else if (this.orderAddressForm.get('landMark').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Landmark must be required'
      });
    }
  }

  validateAddress() {
    if (this.orderAddressForm.get('address').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Delivery Address must be required '
      });
    }
  }

  validateDeliveryPinCode() {
    if (this.orderAddressForm.get('pinCode').hasError('pattern')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Postal code must contain 6 digit numeric number'
      });
    } else if (this.orderAddressForm.get('pinCode').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Postal code must be required'
      });
    }
  }

  validateDeliveryState() {
    if (this.orderAddressForm.get('state').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Delivery State must be required'
      });
    }
  }

  validateDeliveryDistrict() {
    if (this.orderAddressForm.get('district').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Delivery District must be required'
      });
    }
  }

  validateDeliveryType() {
    if (this.orderAddressForm.get('type').hasError('required')) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Delivery Type must be required'
      });
    }
  }
}
