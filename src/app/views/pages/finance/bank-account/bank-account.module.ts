import { NgModule} from '@angular/core';
import { SharedModule} from 'src/app/views/shared/shared.module';
import { RouterModule} from '@angular/router';
import { PartialsModule} from 'src/app/views/partials/partials.module';
import { ListBankAccountComponent} from './list-bank-account/list-bank-account.component';
import { CreateBankAccountComponent } from './create-bank-account/create-bank-account.component';
import { BankAccountRoutingModule } from './bank-account-routing.module';
import {NgxsCustomService} from "../../../shared/services/ngxs-service/ngxs-custom.service";
@NgModule({
  declarations: [
    ListBankAccountComponent,
    CreateBankAccountComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    PartialsModule,
    BankAccountRoutingModule,
  ],
  providers: [
    NgxsCustomService
  ],
  entryComponents: [CreateBankAccountComponent]
})
export class BankAccountModule { }
