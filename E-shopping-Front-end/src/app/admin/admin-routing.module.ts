import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SideNavigationBarComponent } from './side-navigation-bar/side-navigation-bar.component';
import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  { path: '', component: AdminHomeComponent,
    children: [
      { path: 'addProduct', component: AddUpdateProductComponent },
      { path: 'deleteProduct', component: DeleteProductComponent },
      { path: 'viewProduct', component: ViewProductComponent },
      { path: 'updateProduct', component: AddUpdateProductComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
