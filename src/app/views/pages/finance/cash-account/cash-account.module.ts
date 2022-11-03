import {NgModule} from '@angular/core';
import {PartialsModule} from 'src/app/views/partials/partials.module';
import {SharedModule} from 'src/app/views/shared/shared.module';
import {ListCashAccountComponent} from './list-cash-account/list-cash-account.component';
import {CreateCashAccountComponent} from './create-cash-account/create-cash-account.component';
import {CashAccountRoutingModule} from './cash-account-routing.module';
import {NgxsCustomService} from "../../../shared/services/ngxs-service/ngxs-custom.service";


@NgModule({
  declarations: [
    CreateCashAccountComponent,
    ListCashAccountComponent
  ],
  imports: [
    SharedModule,
    PartialsModule,
    CashAccountRoutingModule,
  ],
  providers: [
    NgxsCustomService
  ],
  entryComponents: [CreateCashAccountComponent],
})

export class CashAccountModule {
}
