import {NgModule} from '@angular/core';
import {Permissions} from '../../../shared/AppEnum';
import {PermissionGuard} from 'src/app/core/auth/_guards/permission.guard';
import {RouterModule, Routes} from '@angular/router';
import {ListVendorBillComponent} from './list-vendor-bill/list-vendor-bill.component';
import {CreateVendorBillComponent} from './create-vendor-bill/create-vendor-bill.component';
import {FormConfirmationGuard} from 'src/app/views/shared/route-guards/form-confirmation.guard';
import {VendorBillDetailComponent} from './vendor-bill-detail/vendor-bill-detail.component';
import {PrintBillComponent} from './print-bill/print-bill.component';
import {AgingReportComponent} from './aging-report/aging-report.component';
import {CRUD_ROUTES, REPORT} from 'src/app/views/shared/AppRoutes';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListVendorBillComponent,
        data: {
          array: [
            {permission: Permissions.BILL_VIEW},
            {permission: Permissions.BILL_CREATE},
            {permission: Permissions.BILL_EDIT},
            {permission: Permissions.BILL_APPROVE},
            {permission: Permissions.BILL_REVIEW},
            {permission: Permissions.BILL_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.CREATE,
        component: CreateVendorBillComponent,
        canDeactivate: [FormConfirmationGuard],
        data: {
          array: [
            {permission: Permissions.BILL_CREATE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.EDIT,
        component: CreateVendorBillComponent,
        data: {
          array: [
            {permission: Permissions.BILL_EDIT},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.DETAILS,
        component: VendorBillDetailComponent,
        data: {
          array: [
            {permission: Permissions.BILL_VIEW},
            {permission: Permissions.BILL_CREATE},
            {permission: Permissions.BILL_EDIT},
            {permission: Permissions.BILL_APPROVE},
            {permission: Permissions.BILL_REVIEW},
            {permission: Permissions.BILL_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.PRINT,
        component: PrintBillComponent,
        data: {
          array: [
            {permission: Permissions.BILL_VIEW},
            {permission: Permissions.BILL_CREATE},
            {permission: Permissions.BILL_EDIT},
            {permission: Permissions.BILL_APPROVE},
            {permission: Permissions.BILL_REVIEW},
            {permission: Permissions.BILL_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.AGING_REPORT,
        component: AgingReportComponent,
        data: {
          array: [
            {permission: Permissions.BILL_VIEW},
            {permission: Permissions.BILL_CREATE},
            {permission: Permissions.BILL_EDIT},
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
export class VendorBillRoutingModule {
}
