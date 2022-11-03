import {NgModule} from '@angular/core';
import {Permissions} from 'src/app/views/shared/AppEnum';
import {PermissionGuard} from 'src/app/core/auth/_guards/permission.guard';
import {RouterModule, Routes} from '@angular/router';
import {ListBankStatementComponent} from './list-bank-statement/list-bank-statement.component';
import {CreateBankStatementComponent} from './create-bank-statement/create-bank-statement.component';
import {FormConfirmationGuard} from 'src/app/views/shared/route-guards/form-confirmation.guard';
import {CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';
import { DetailBankStatementComponent } from './detail-bank-statement/detail-bank-statement.component';

const route: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListBankStatementComponent,
        data: {
          array: [
            {permission: Permissions.BANKSTATEMENT_VIEW},
            {permission: Permissions.BANKSTATEMENT_CREATE},
            {permission: Permissions.BANKSTATEMENT_EDIT},
            {permission: Permissions.BANKSTATEMENT_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.CREATE,
        component: CreateBankStatementComponent,
        canDeactivate: [FormConfirmationGuard],
        data: {
          array: [
            {permission: Permissions.BANKSTATEMENT_CREATE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.EDIT,
        component: CreateBankStatementComponent,
        data: {
          array: [
            {permission: Permissions.BANKSTATEMENT_EDIT},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.DETAILS,
        component: DetailBankStatementComponent,
        // data: {
        //   array: [
        //     {permission: Permissions.BANKSTATEMENT_VIEW},
        //   ]
        // },
        // canActivate: [PermissionGuard]
      },
      {path: '**', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class BankStatementRoutingModule {
}
