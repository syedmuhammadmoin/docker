import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-management/user-list/user-list.component';
import {CreateUserComponent} from './user-management/create-user/create-user.component';
import {RoleListComponent} from './role-management/role-list/role-list.component';
import {CreateRoleComponent} from './role-management/create-role/create-role.component';
import {ChangePasswordComponent} from './user-management/change-password/change-password.component';
import {ACCESS_MANAGEMENT, CRUD_ROUTES} from '../../shared/AppRoutes';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: ACCESS_MANAGEMENT.USER_LIST, pathMatch: 'full'},
      {
        path: ACCESS_MANAGEMENT.USER_LIST,
        component: UserListComponent
      },
      {
        path: ACCESS_MANAGEMENT.CREATE_USER,
        component: CreateUserComponent
      },
      {
        path: ACCESS_MANAGEMENT.CHANGE_PASSWORD,
        component: ChangePasswordComponent
      },
      {
        path: ACCESS_MANAGEMENT.ROLE_LIST,
        component: RoleListComponent
      },
      {
        path: ACCESS_MANAGEMENT.CREATE_ROLE,
        component: CreateRoleComponent
      },
      {path: '**', redirectTo: ACCESS_MANAGEMENT.USER_LIST, pathMatch: 'full'},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessManagementRoutingModule {
}
