// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
// Auth
import { AuthGuard } from './core/auth';
import { APP_ROUTES } from './views/shared/AppRoutes';

const routes: Routes = [
  // {path: '', redirectTo: APP_ROUTES.DASHBOARD, pathMatch: 'full'},
  {
    path: APP_ROUTES.AUTH,
    loadChildren: () =>
      import('./views/pages/auth/auth.module').then(
        (m) => m.AuthModule
      ),
    canActivateChild: [AuthGuard]
  },
  /*{
    path: AUTH.FORGOT_PASSWORD,
    component: ForgotPasswordComponent
  },
  {
    path: AUTH.NEW_PASSWORD,
    component: SetPasswordComponent,
    canActivate: [QueryParamsGuard],
    data: {queryParamName: 'token', returnUrl: '/auth/login'}
  },*/
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: APP_ROUTES.DASHBOARD, pathMatch: 'full' },
      // Lazy Load DASHBOARD Module
      {
        path: APP_ROUTES.DASHBOARD,
        loadChildren: () =>
          import('./views/pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load ACCESS MANAGEMENT Module
      {
        path: APP_ROUTES.ACCESS_MANAGEMENT,
        loadChildren: () =>
          import('./views/pages/access-management/access-management.module').then(
            (m) => m.AccessManagementModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load BUSINESS PARTNER Module
      {
        path: APP_ROUTES.BUSINESS_PARTNER,
        loadChildren: () =>
          import('./views/pages/profiling/business-partner/business-partner.module').then(
            (m) => m.BusinessPartnerModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load CATEGORY Module
      {
        path: APP_ROUTES.CATEGORY,
        loadChildren: () =>
          import('./views/pages/profiling/category/category.module').then(
            (m) => m.CategoryModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load DEPARTMENT Module
      {
        path: APP_ROUTES.DEPARTMENT,
        loadChildren: () =>
          import('./views/pages/profiling/department/department.module').then(
            (m) => m.DepartmentModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load LOCATION Module
      {
        path: APP_ROUTES.LOCATION,
        loadChildren: () =>
          import('./views/pages/profiling/location/location.module').then(
            (m) => m.LocationModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load ORGANIZATION Module
      {
        path: APP_ROUTES.ORGANIZATION,
        loadChildren: () =>
          import('./views/pages/profiling/organization/organization.module').then(
            (m) => m.OrganizationModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load PRODUCT Module
      {
        path: APP_ROUTES.PRODUCT, // <= Page URL
        loadChildren: () =>
          import('./views/pages/profiling/product/product.module').then(
            (m) => m.ProductModule
          ),
        canActivateChild: [AuthGuard] // <= Page component registration
      },

      // Lazy Load WAREHOUSE Module
      {
        path: APP_ROUTES.WAREHOUSE, // <= Page URL
        loadChildren: () =>
          import('./views/pages/profiling/warehouse/warehouse.module').then(
            (m) => m.WarehouseModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load BANK ACCOUNT Module
      {
        path: APP_ROUTES.BANK_ACCOUNT,
        loadChildren: () =>
          import('./views/pages/finance/bank-account/bank-account.module').then(
            (m) => m.BankAccountModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load BANK RECONCILIATION Module
      {
        path: APP_ROUTES.BANK_RECONCILIATION,
        loadChildren: () =>
          import('./views/pages/finance/bank-reconciliation/bank-reconciliation.module').then(
            (m) => m.BankReconciliationModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load BANK STATEMENT Module
      {
        path: APP_ROUTES.BANK_STATEMENT,
        loadChildren: () =>
          import('./views/pages/finance/bank-statement/bank-statement.module').then(
            (m) => m.BankStatementModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load CASH ACCOUNT Module
      {
        path: APP_ROUTES.CASH_ACCOUNT,
        loadChildren: () =>
          import('./views/pages/finance/cash-account/cash-account.module').then(
            (m) => m.CashAccountModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load JOURNAL ENTRY Module
      {
        path: APP_ROUTES.JOURNAL_ENTRY, // <= Page URL
        loadChildren: () =>
          import('./views/pages/finance/journalEntry/journal-entry.module').then(
            (m) => m.JournalEntryModule
          ),
        canActivateChild: [AuthGuard] // <= Page component registration
      },

      // Lazy Load PAYMENT Module
      {
        path: APP_ROUTES.PAYMENT, // <= Page URL
        loadChildren: () =>
          import('./views/pages/finance/payment/payment.module').then(
            (m) => m.PaymentModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load VENDOR BILL Module
      {
        path: APP_ROUTES.CHART_OF_ACCOUNT, // <= Page URL
        loadChildren: () =>
          import('./views/pages/finance/chat-of-account/chat-of-account.module').then(
            (m) => m.ChatOfAccountModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load CREDIT NOTE Module
      {
        path: APP_ROUTES.CREDIT_NOTE,
        loadChildren: () =>
          import('./views/pages/sales/credit-note/credit-note.module').then(
            (m) => m.CreditNoteModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load INVOICE Module
      {
        path: APP_ROUTES.INVOICE, // <= Page URL
        loadChildren: () =>
          import('./views/pages/sales/invoice/invoice.module').then(
            (m) => m.InvoiceModule
          ),
        canActivateChild: [AuthGuard] // <= Page component registration
      },

      // Lazy Load SALES ORDER Module
      {
        path: APP_ROUTES.SALES_ORDER,
        loadChildren: () =>
          import('./views/pages/sales/sales-order/sales-order.module').then(
            (m) => m.SalesOrderModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load DEBIT NOTE Module
      {
        path: APP_ROUTES.DEBIT_NOTE,
        loadChildren: () =>
          import('./views/pages/purchase/debit-note/debit-note.module').then(
            (m) => m.DebitNoteModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load PURCHASE ORDER Module
      {
        path: APP_ROUTES.PURCHASE_ORDER, // <= Page URL
        loadChildren: () =>
          import('./views/pages/purchase/purchase-order/purchase-order.module').then(
            (m) => m.PurchaseOrderModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load PURCHASE REQUISITION Module
      {
        path: APP_ROUTES.PURCHASE_REQUISITION, // <= Page URL
        loadChildren: () =>
          import('./views/pages/purchase/purchase-requisition/purchase-requisition.module').then(
            (m) => m.PurchaseRequisitionModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load VENDOR BILL Module
      {
        path: APP_ROUTES.BILL, // <= Page URL
        loadChildren: () =>
          import('./views/pages/purchase/vendorBill/vendor-bill.module').then(
            (m) => m.VendorBillModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Reports Section
      {
        path: APP_ROUTES.REPORT,
        loadChildren: () =>
          import('./views/pages/report/report.module').then(
            (m) => m.ReportModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load INVENTORY ADJUSTMENT Module
      {
        path: APP_ROUTES.INVENTORY_ADJUSTMENT,
        loadChildren: () =>
          import('./views/pages/inventory/inventory-adjustment/inventory-adjustment.module').then(
            (m) => m.InventoryAdjustmentModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load STOCK Module
      {
        path: APP_ROUTES.STOCK,
        loadChildren: () =>
          import('./views/pages/inventory/stock/stock.module').then(
            (m) => m.StockModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load DISPATCH NOTE Module
      {
        path: APP_ROUTES.DISPATCH_NOTE, // <= Page URL
        loadChildren: () =>
          import('./views/pages/inventory/dispatch-note/dispatch-note.module').then(
            (m) => m.DispatchNoteModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load GOODS RECEIVED NOTE Module
      {
        path: APP_ROUTES.GOODS_RECEIVED_NOTE, // <= Page URL
        loadChildren: () =>
          import('./views/pages/inventory/goods-received-note/goods-received-note.module').then(
            (m) => m.GoodsReceivedNoteModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load WORKFLOW Module
      {
        path: APP_ROUTES.WORKFLOW, // <= Page URL
        loadChildren: () =>
          import('./views/pages/workflows/workflow/workflow.module').then(
            (m) => m.WorkflowModule
          ),
        canActivateChild: [AuthGuard]
      },

      // Lazy Load STATUS Module
      {
        path: APP_ROUTES.STATUS, // <= Page URL
        loadChildren: () =>
          import('./views/pages/workflows/status/status.module').then(
            (m) => m.StatusModule
          ),
        canActivateChild: [AuthGuard]
      },

      { path: '**', redirectTo: APP_ROUTES.DASHBOARD, pathMatch: 'full' },

    ],
  },
  { path: '**', redirectTo: APP_ROUTES.DASHBOARD, pathMatch: 'full' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
