// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { APP_ROUTES } from "../../shared/AppRoutes";
import { AuthGuard } from "../../../core/auth";



@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      { path: '', redirectTo: APP_ROUTES.DASHBOARD, pathMatch: 'full' },
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      { path: '**', redirectTo: APP_ROUTES.DASHBOARD, pathMatch: 'full' },
    ]),
  ],
  providers: [],
  declarations: [
    DashboardComponent,
  ]
})
export class DashboardModule {
}
