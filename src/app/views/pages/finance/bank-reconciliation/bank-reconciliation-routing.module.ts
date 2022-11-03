import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListBankReconciliationComponent} from './list-bank-reconciliation/list-bank-reconciliation.component';
import {Permissions} from 'src/app/views/shared/AppEnum';
import {PermissionGuard} from 'src/app/core/auth/_guards/permission.guard';
import {CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';


const route: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListBankReconciliationComponent,
        data: {
          array: [
            {permission: Permissions.BANK_RECON_VIEW},
            {permission: Permissions.BANK_RECON_CREATE},
            {permission: Permissions.BANK_RECON_EDIT},
            {permission: Permissions.BANK_RECON_DELETE},
          ]
        },
        canActivate: [PermissionGuard],
      },
      {path: '**', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class BankReconciliationRoutingModule {
}
