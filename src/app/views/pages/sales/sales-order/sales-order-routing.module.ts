import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Permissions} from 'src/app/views/shared/AppEnum';
import {PermissionGuard} from 'src/app/core/auth/_guards/permission.guard';
import {ListSaleOrderComponent} from './list-sale-order/list-sale-order.component';

import {FormConfirmationGuard} from 'src/app/views/shared/route-guards/form-confirmation.guard';
import {SalesOrderDetailComponent} from './sales-order-detail/sales-order-detail.component';
import {PrintSalesOrderComponent} from './print-sales-order/print-sales-order/print-sales-order.component';
import {CreateSalesOrderComponent} from './create-sales-order/create-sales-order.component';
import {CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListSaleOrderComponent,
        data: {
          array: [
            {permission: Permissions.SALESORDER_VIEW},
            {permission: Permissions.SALESORDER_CREATE},
            {permission: Permissions.SALESORDER_EDIT},
            {permission: Permissions.SALESORDER_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.CREATE,
        component: CreateSalesOrderComponent,
        canDeactivate: [FormConfirmationGuard],
        data: {
          array: [
            {permission: Permissions.SALESORDER_CREATE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.EDIT,
        component: CreateSalesOrderComponent,
        data: {
          array: [
            {permission: Permissions.SALESORDER_EDIT},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.DETAILS,
        component: SalesOrderDetailComponent,
        data: {
          array: [
            {permission: Permissions.SALESORDER_VIEW},
            {permission: Permissions.SALESORDER_CREATE},
            {permission: Permissions.SALESORDER_EDIT},
            {permission: Permissions.SALESORDER_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.PRINT,
        component: PrintSalesOrderComponent,
        data: {
          array: [
            {permission: Permissions.SALESORDER_VIEW},
            {permission: Permissions.SALESORDER_CREATE},
            {permission: Permissions.SALESORDER_EDIT},
            {permission: Permissions.SALESORDER_DELETE},
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
export class SalesOrderRoutingModule {
}
