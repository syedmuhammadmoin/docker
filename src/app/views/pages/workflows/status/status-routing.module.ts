import {CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PermissionGuard} from "src/app/core/auth/_guards/permission.guard";
import {Permissions} from "../../../shared/AppEnum";
import {ListStatusComponent} from "./list-status/list-status.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListStatusComponent,
        data: {
          array: [
            {permission: Permissions.STATUS_CREATE},
            {permission: Permissions.STATUS_EDIT},
            {permission: Permissions.STATUS_VIEW},
            {permission: Permissions.STATUS_DELETE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {path: '**', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusRoutingModule {
}
