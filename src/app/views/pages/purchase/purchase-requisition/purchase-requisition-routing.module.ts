import {CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListPurchaseRequisitionComponent} from './list-purchase-requisition/list-purchase-requisition.component';
import {PurchaseRequisitionDetailComponent} from './purchase-requisition-detail/purchase-requisition-detail.component';
import {PrintPurchaseRequisitionComponent} from './print-purchase-requisition/print-purchase-requisition.component';
import {CreatePurchaseRequisitionComponent} from './create-purchase-requisition/create-purchase-requisition.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListPurchaseRequisitionComponent,
        /*data: {
          array: [
            { permission: Permissions.PURCHASEORDER_VIEW },
            { permission: Permissions.PURCHASEORDER_CREATE },
          ]
        },
        canActivate: [PermissionGuard]*/
      },
      {
        path: CRUD_ROUTES.CREATE,
        component: CreatePurchaseRequisitionComponent,
        /*data: {
          array: [
            { permission: Permissions.PURCHASEORDER_CREATE },
          ]
        },
        canActivate: [PermissionGuard]*/
      },
      {
        path: CRUD_ROUTES.EDIT,
        component: CreatePurchaseRequisitionComponent,
        /*data: {
          array: [
            { permission: Permissions.PURCHASEORDER_EDIT },
          ]
        },
        canActivate: [PermissionGuard]*/
      },
      {
        path: CRUD_ROUTES.DETAILS,
        component: PurchaseRequisitionDetailComponent,
        /*data: {
          array: [
            { permission: Permissions.PURCHASEORDER_VIEW },
            { permission: Permissions.PURCHASEORDER_CREATE },
          ]
        },
        canActivate: [PermissionGuard]*/
      },
      {
        path: CRUD_ROUTES.PRINT,
        component: PrintPurchaseRequisitionComponent,
        /*data: {
          array: [
            { permission: Permissions.PURCHASEORDER_VIEW },
            { permission: Permissions.PURCHASEORDER_CREATE },
          ]
        },
        canActivate: [PermissionGuard]*/
      },
      {path: '**', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequisitionRoutingModule {
}
