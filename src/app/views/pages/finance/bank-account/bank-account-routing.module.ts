import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Permissions} from 'src/app/views/shared/AppEnum';
import {PermissionGuard} from 'src/app/core/auth/_guards/permission.guard';
import {ListBankAccountComponent} from './list-bank-account/list-bank-account.component';
import {CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';

const route: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListBankAccountComponent,
        data: {
          array: [
            {permission: Permissions.BANKACCOUNT_VIEW},
            {permission: Permissions.BANKACCOUNT_CREATE},
            {permission: Permissions.BANKACCOUNT_DELETE},
            {permission: Permissions.BANKACCOUNT_EDIT},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {path: '**', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})

export class BankAccountRoutingModule {
}
