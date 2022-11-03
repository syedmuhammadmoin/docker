import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatOfAccountComponent} from './chat-of-account.component';
import {CreateLevel3Component} from './level3/create-level3/create-level3.component';
import {CreateLevel4Component} from './level4/create-level4/create-level4.component';
import {ChartOfAccountService} from './service/chart-of-account.service';
import {SharedModule} from 'src/app/views/shared/shared.module';
import {PartialsModule} from 'src/app/views/partials/partials.module';
import {ChartOfAccountRoutingModule} from './chart-of-account-routing.module';
import 'ag-grid-enterprise';
import {NgxsCustomService} from '../../../shared/services/ngxs-service/ngxs-custom.service';

@NgModule({
  declarations: [
    ChatOfAccountComponent,
    CreateLevel3Component,
    CreateLevel4Component,
  ],
  imports: [
    SharedModule,
    CommonModule,
    PartialsModule,
    ChartOfAccountRoutingModule,
  ],
  providers: [
    ChartOfAccountService,
    NgxsCustomService
  ],
  entryComponents: [
    CreateLevel3Component,
    CreateLevel4Component
  ]
})
export class ChatOfAccountModule {
}
