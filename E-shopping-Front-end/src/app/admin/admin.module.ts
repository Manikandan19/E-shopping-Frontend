import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavigationBarComponent } from './side-navigation-bar/side-navigation-bar.component';

import { ViewProductComponent } from './view-product/view-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';
import { AdminRoutingModule } from './admin-routing.module';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';


@NgModule({
  declarations: [
    SideNavigationBarComponent,
    ViewProductComponent,
    DeleteProductComponent,
    AdminHomeComponent,
    AddUpdateProductComponent
  ],
  imports: [CommonModule, SidebarModule, ButtonModule, MenuModule, AdminRoutingModule],
  exports: [
    SideNavigationBarComponent,
    ViewProductComponent,
    DeleteProductComponent,
    AdminHomeComponent,
    AddUpdateProductComponent
  ]
})
export class AdminModule {}
