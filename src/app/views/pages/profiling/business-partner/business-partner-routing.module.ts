import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListBusinessPartnerComponent} from './list-business-partner/list-business-partner.component';
import {Permissions} from 'src/app/views/shared/AppEnum';
import {PermissionGuard} from 'src/app/core/auth/_guards/permission.guard';
import {BUSINESS_PARTNER, CRUD_ROUTES} from 'src/app/views/shared/AppRoutes';

const route: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: CRUD_ROUTES.LIST, pathMatch: 'full'},
      {
        path: CRUD_ROUTES.LIST,
        component: ListBusinessPartnerComponent,
        data: {
          array: [
            {permission: Permissions.BUSINESSPARTNER_VIEW},
            {permission: Permissions.BUSINESSPARTNER_CREATE},
            {permission: Permissions.BUSINESSPARTNER_DELETE},
            {permission: Permissions.BUSINESSPARTNER_EDIT},
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

export class BusinessPartnerRoutingModule {
}
