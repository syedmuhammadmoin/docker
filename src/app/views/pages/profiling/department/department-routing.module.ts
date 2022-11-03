import {NgModule} from '@angular/core';
import {Permissions} from 'src/app/views/shared/AppEnum';
import {PermissionGuard} from 'src/app/core/auth/_guards/permission.guard';
import {RouterModule, Routes} from '@angular/router';
import {ListDepartmentComponent} from './list-department/list-department.component';
import {CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';

const route: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListDepartmentComponent,
        data: {
          array: [
            {permission: Permissions.DEPARTMENTS_VIEW},
            {permission: Permissions.DEPARTMENTS_CREATE},
            {permission: Permissions.DEPARTMENTS_DELETE},
            {permission: Permissions.DEPARTMENTS_EDIT},
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

export class DepartmentRoutingModule {
}
