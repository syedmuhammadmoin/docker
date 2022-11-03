import { NgModule } from '@angular/core';
import { DocType, Permissions } from 'src/app/views/shared/AppEnum';
import { PermissionGuard } from 'src/app/core/auth/_guards/permission.guard';
import { RouterModule, Routes } from '@angular/router';
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { DetailPaymentComponent } from './detail-payment/detail-payment.component';
import { PaymentInvoiceComponent } from './print-payment/payment-invoice.component';
import { CRUD_ROUTES } from 'src/app/views/shared/AppRoutes';

const docType = DocType;
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'voucher/' + CRUD_ROUTES.LIST, pathMatch: 'full' },
      {
        path: 'voucher',
        children: [
          {
            path: CRUD_ROUTES.LIST,
            component: ListPaymentComponent,
            data: {
              docType: docType.Payment,
              array: [
                { permission: Permissions.PAYMENT_VIEW },
                { permission: Permissions.PAYMENT_CREATE },
                { permission: Permissions.PAYMENT_EDIT },
                { permission: Permissions.PAYMENT_DELETE },
                { permission: Permissions.PAYMENT_APPROVE },
                { permission: Permissions.PAYMENT_REVIEW },
              ]
            },
            canActivate: [PermissionGuard]
          },
          {
            path: CRUD_ROUTES.DETAILS,
            component: DetailPaymentComponent,
            data: {
              docType: docType.Payment,
              array: [
                { permission: Permissions.PAYMENT_VIEW },
                { permission: Permissions.PAYMENT_EDIT },
                { permission: Permissions.PAYMENT_DELETE },
                { permission: Permissions.PAYMENT_APPROVE },
                { permission: Permissions.PAYMENT_REVIEW },
              ]
            },
            canActivate: [PermissionGuard]
          },
          {
            path: CRUD_ROUTES.PRINT,
            component: PaymentInvoiceComponent,
            data: {
              docType: docType.Payment,
              array: [
                { permission: Permissions.PAYMENT_VIEW },
                { permission: Permissions.PAYMENT_CREATE },
                { permission: Permissions.PAYMENT_EDIT },
                { permission: Permissions.PAYMENT_DELETE },
                { permission: Permissions.PAYMENT_APPROVE },
                { permission: Permissions.PAYMENT_REVIEW },
              ]
            },
            canActivate: [PermissionGuard]
          },
        ]
      },
      {
        path: 'receipt',
        children: [
          {
            path: CRUD_ROUTES.LIST,
            component: ListPaymentComponent,
            data: {
              docType: docType.Receipt,
              array: [
                { permission: Permissions.RECEIPT_VIEW },
                { permission: Permissions.RECEIPT_CREATE },
                { permission: Permissions.RECEIPT_DELETE },
                { permission: Permissions.RECEIPT_EDIT },
              ]
            },
            canActivate: [PermissionGuard]
          },
          {
            path: CRUD_ROUTES.DETAILS,
            component: DetailPaymentComponent,
            data: {
              docType: docType.Receipt,
              array: [
                { permission: Permissions.RECEIPT_VIEW },
                { permission: Permissions.RECEIPT_DELETE },
                { permission: Permissions.RECEIPT_EDIT },
              ]
            },
            canActivate: [PermissionGuard]
          },
          {
            path: CRUD_ROUTES.PRINT,
            component: PaymentInvoiceComponent,
            data: {
              docType: docType.Receipt,
              array: [
                { permission: Permissions.RECEIPT_VIEW },
                { permission: Permissions.RECEIPT_CREATE },
                { permission: Permissions.RECEIPT_DELETE },
                { permission: Permissions.RECEIPT_EDIT },
              ]
            },
            canActivate: [PermissionGuard]
          },
        ]
      },
      { path: '**', redirectTo: 'voucher/' + CRUD_ROUTES.LIST, pathMatch: 'full' },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {
}
