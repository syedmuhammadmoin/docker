import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Permissions} from 'src/app/views/shared/AppEnum';
import {PermissionGuard} from 'src/app/core/auth/_guards/permission.guard';
import {ListInvoiceComponent} from './list-invoice/list-invoice.component';
import {CreateInvoiceComponent} from './create-invoice/create-invoice.component';
import {FormConfirmationGuard} from 'src/app/views/shared/route-guards/form-confirmation.guard';
import {InvoiceDetailsComponent} from './invoice-details/invoice-details.component';
import {PrintInvoiceComponent} from './print-invoice/print-invoice.component';
import {AgingReportComponent} from './aging-report/aging-report.component';
import {CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: CRUD_ROUTES.LIST,
        component: ListInvoiceComponent,
        data: {
          array: [
            {permission: Permissions.INVOICE_VIEW},
            {permission: Permissions.INVOICE_CREATE},
            {permission: Permissions.INVOICE_EDIT},
            {permission: Permissions.INVOICE_REVIEW},
            {permission: Permissions.INVOICE_APPROVE},
            {permission: Permissions.INVOICE_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.CREATE,
        component: CreateInvoiceComponent,
        canDeactivate: [FormConfirmationGuard],
        data: {
          array: [
            {permission: Permissions.INVOICE_CREATE},
          ]
        },
        canActivate: [PermissionGuard],
      },
      {
        path: CRUD_ROUTES.EDIT,
        component: CreateInvoiceComponent,
        canDeactivate: [FormConfirmationGuard],
        data: {
          array: [
            {permission: Permissions.INVOICE_EDIT},
          ]
        },
        canActivate: [PermissionGuard],
      },
      {
        path: CRUD_ROUTES.DETAILS,
        component: InvoiceDetailsComponent,
        data: {
          array: [
            {permission: Permissions.INVOICE_VIEW},
            {permission: Permissions.INVOICE_CREATE},
            {permission: Permissions.INVOICE_EDIT},
            {permission: Permissions.INVOICE_REVIEW},
            {permission: Permissions.INVOICE_APPROVE},
            {permission: Permissions.INVOICE_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.PRINT,
        component: PrintInvoiceComponent,
        data: {
          array: [
            {permission: Permissions.INVOICE_VIEW},
            {permission: Permissions.INVOICE_CREATE},
            {permission: Permissions.INVOICE_EDIT},
            {permission: Permissions.INVOICE_REVIEW},
            {permission: Permissions.INVOICE_APPROVE},
            {permission: Permissions.INVOICE_DELETE},

          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.AGING_REPORT,
        component: AgingReportComponent,
        data: {
          array: [
            {permission: Permissions.INVOICE_VIEW},
            {permission: Permissions.INVOICE_CREATE},
            {permission: Permissions.INVOICE_EDIT},
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
export class InvoiceRoutingModule {
}
