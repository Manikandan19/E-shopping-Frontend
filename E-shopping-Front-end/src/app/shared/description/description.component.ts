import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit
} from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/Model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'e-shopping-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit, AfterViewInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  product: any[]; // to get individual product details from back-end
  breadCrumbItems: any; // bread crumb item details
  home: MenuItem[]; // bread crumb item - home
  productName: any; // to get product name from product list component URL
  currentImage: any; // Product image selection

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.productName = {
        productName: params.get('productName')
      };
    });

    this.productService.getIndividualProduct(this.productName).subscribe(
      response => {
        this.product = response;
        // this.product = this.product;
        console.log(this.product);
        this.currentImage = this.product[0]['imageLocation'].normal;

        // Breadcrumb items
        this.breadCrumbItems = [
          { icon: 'pi pi-home', routerLink: '/home' },
          { label: 'Home', routerLink: '/home' },
          {
            label: `${this.product[0].productType}`,
            routerLink: `/productList/${this.product[0].productType}`
          },
          { label: `${this.product[0].productName}` }
        ];
      },
      error => {
        console.log('Error at product description', error);
      }
    );
  }

  ngAfterViewInit() {}

  sendImage(image) {
    this.currentImage = image;
  }
}
