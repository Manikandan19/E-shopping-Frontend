import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';
import { AddUpdateAdminComponent } from './add-update-admin/add-update-admin.component';
import { DeleteAdminComponent } from './delete-admin/delete-admin.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';

import { SuperAdminSideNavigationBarComponent } from './super-admin-side-navigation-bar/super-admin-side-navigation-bar.component';
import { SuperAdminRoutingModule } from './super-admin-routing.module';

@NgModule({
  declarations: [
    SuperAdminHomeComponent,
    AddUpdateAdminComponent,
    DeleteAdminComponent,
    ViewAdminComponent,
    SuperAdminSideNavigationBarComponent
  ],
  imports: [CommonModule, SuperAdminRoutingModule],
  exports: [
    SuperAdminHomeComponent,
    AddUpdateAdminComponent,
    DeleteAdminComponent,
    ViewAdminComponent,
    SuperAdminSideNavigationBarComponent
  ]
})
export class SuperAdminModule {}
