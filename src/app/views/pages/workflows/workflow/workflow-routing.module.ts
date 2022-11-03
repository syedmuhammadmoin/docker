import {CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PermissionGuard} from "src/app/core/auth/_guards/permission.guard";
import {Permissions} from "../../../shared/AppEnum";
import {FormConfirmationGuard} from "../../../shared/route-guards/form-confirmation.guard";
import {CreateWorkflowComponent} from "./create-workflow/create-workflow.component";
import {ListWorkflowComponent} from "./list-workflow/list-workflow.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListWorkflowComponent,
        data: {
          array: [
            {permission: Permissions.WORKFLOW_VIEW},
            {permission: Permissions.WORKFLOW_CREATE}
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.CREATE,
        component: CreateWorkflowComponent,
        canDeactivate: [FormConfirmationGuard],
        data: {
          array: [
            {permission: Permissions.WORKFLOW_CREATE},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {
        path: CRUD_ROUTES.EDIT,
        component: CreateWorkflowComponent,
        data: {
          array: [
            {permission: Permissions.WORKFLOW_EDIT},
          ]
        },
        canActivate: [PermissionGuard]
      },
      {path: '**', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkFlowRoutingModule {
}
