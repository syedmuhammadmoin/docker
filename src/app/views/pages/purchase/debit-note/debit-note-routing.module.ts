import {RouterModule, Routes} from '@angular/router';
import {Permissions} from '../../../shared/AppEnum';
import {PermissionGuard} from 'src/app/core/auth/_guards/permission.guard';
import {FormConfirmationGuard} from '../../../shared/route-guards/form-confirmation.guard';
import {ListDebitNoteComponent} from './list-debit-note/list-debit-note.component';
import {CreateDebitNoteComponent} from './create-debit-note/create-debit-note.component';
import {DebitNoteDetailComponent} from './debit-note-detail/debit-note-detail.component';
import {PrintDebitNoteComponent} from './print-debit-note/print-debit-note.component';
import {NgModule} from '@angular/core';
import {CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';


const route: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListDebitNoteComponent,
        data: {
          array: [
            {permission: Permissions.DEBITNOTE_VIEW},
            {permission: Permissions.DEBITNOTE_CREATE},
            {permission: Permissions.DEBITNOTE_EDIT},
            {permission: Permissions.DEBITNOTE_APPROVE},
            {permission: Permissions.DEBITNOTE_REVIEW},
            {permission: Permissions.DEBITNOTE_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.CREATE,
        component: CreateDebitNoteComponent,
        canDeactivate: [FormConfirmationGuard],
        data: {
          array: [
            {permission: Permissions.DEBITNOTE_CREATE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.EDIT,
        component: CreateDebitNoteComponent,
        data: {
          array: [
            {permission: Permissions.DEBITNOTE_EDIT},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.DETAILS,
        component: DebitNoteDetailComponent,
        data: {
          array: [
            {permission: Permissions.DEBITNOTE_VIEW},
            {permission: Permissions.DEBITNOTE_CREATE},
            {permission: Permissions.DEBITNOTE_EDIT},
            {permission: Permissions.DEBITNOTE_APPROVE},
            {permission: Permissions.DEBITNOTE_REVIEW},
            {permission: Permissions.DEBITNOTE_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.PRINT,
        component: PrintDebitNoteComponent,
        data: {
          array: [
            {permission: Permissions.DEBITNOTE_VIEW},
            {permission: Permissions.DEBITNOTE_CREATE},
            {permission: Permissions.DEBITNOTE_EDIT},
            {permission: Permissions.DEBITNOTE_APPROVE},
            {permission: Permissions.DEBITNOTE_REVIEW},
            {permission: Permissions.DEBITNOTE_DELETE},
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
export class DebitNoteRoutingModule {
}
