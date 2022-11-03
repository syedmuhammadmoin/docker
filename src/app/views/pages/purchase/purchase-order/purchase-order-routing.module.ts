import {CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListPurchaseOrderComponent} from './list-purchase-order/list-purchase-order.component';
import {PurchaseOrderDetailComponent} from './purchase-order-detail/purchase-order-detail.component';
import {PrintPurchaseOrderComponent} from './print-purchase-order/print-purchase-order.component';
import {CreatePurchaseOrderComponent} from './create-purchase-order/create-purchase-order.component';
import {PermissionGuard} from "../../../../core/auth/_guards/permission.guard";
import {Permissions} from "../../../shared/AppEnum";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListPurchaseOrderComponent,
        data: {
          array: [
            {permission: Permissions.PURCHASEORDER_VIEW},
            {permission: Permissions.PURCHASEORDER_CREATE},
            {permission: Permissions.PURCHASEORDER_EDIT},
            {permission: Permissions.PURCHASEORDER_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.CREATE,
        component: CreatePurchaseOrderComponent,
        data: {
          array: [
            {permission: Permissions.PURCHASEORDER_CREATE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.EDIT,
        component: CreatePurchaseOrderComponent,
        data: {
          array: [
            {permission: Permissions.PURCHASEORDER_EDIT},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.DETAILS,
        component: PurchaseOrderDetailComponent,
        data: {
          array: [
            {permission: Permissions.PURCHASEORDER_VIEW},
            {permission: Permissions.PURCHASEORDER_CREATE},
            {permission: Permissions.PURCHASEORDER_EDIT},
            {permission: Permissions.PURCHASEORDER_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.PRINT,
        component: PrintPurchaseOrderComponent,
        data: {
          array: [
            {permission: Permissions.PURCHASEORDER_VIEW},
            {permission: Permissions.PURCHASEORDER_CREATE},
            {permission: Permissions.PURCHASEORDER_EDIT},
            {permission: Permissions.PURCHASEORDER_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {path: '**', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }
