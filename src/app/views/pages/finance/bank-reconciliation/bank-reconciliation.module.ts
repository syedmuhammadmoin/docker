import { NgModule} from '@angular/core';
import { ListBankReconciliationComponent} from './list-bank-reconciliation/list-bank-reconciliation.component';
import { SharedModule} from 'src/app/views/shared/shared.module';
import { PartialsModule} from 'src/app/views/partials/partials.module';
import { AgGridModule } from 'ag-grid-angular';
import { BankReconciliationRoutingModule } from './bank-reconciliation-routing.module';
import { BankAccountService } from '../bank-account/service/bankAccount.service';

@NgModule({
  declarations: [ListBankReconciliationComponent ],
  imports: [
    SharedModule,
    AgGridModule,
    PartialsModule,
    BankReconciliationRoutingModule
  ],
   providers: [
    BankAccountService
   ]
})
export class BankReconciliationModule { }
