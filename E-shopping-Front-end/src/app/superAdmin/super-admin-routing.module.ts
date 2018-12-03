import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminHomeComponent } from './super-admin-home/super-admin-home.component';
import { SuperAdminSideNavigationBarComponent } from './super-admin-side-navigation-bar/super-admin-side-navigation-bar.component';
import { AddUpdateAdminComponent } from './add-update-admin/add-update-admin.component';
import { DeleteAdminComponent } from './delete-admin/delete-admin.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';

const routes: Routes = [
  { path: '', component: SuperAdminHomeComponent },
  {
    path: 'navigation',
    component: SuperAdminSideNavigationBarComponent,
    children: [
      { path: 'addAdmin', component: AddUpdateAdminComponent },
      { path: 'deleteAdmin', component: DeleteAdminComponent },
      { path: 'updateAdmin', component: AddUpdateAdminComponent },
      { path: 'viewAdmin', component: ViewAdminComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule {}
