import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportRoutingModule} from './report-routing.module';
import {GeneralLedgerComponent} from './general-ledger/general-ledger/general-ledger.component';
import {AgGridModule} from 'ag-grid-angular';
import {SharedModule} from '../../shared/shared.module';
import {TrialBalanceComponent} from './trial-balance/trial-balance/trial-balance.component';
import {BalanceSheetComponent} from './balance-sheet/balance-sheet/balance-sheet.component';
import {ProfitNLossComponent} from './profit-N-loss/profit-N-loss/profit-N-loss.component';
import {PartialsModule} from '../../partials/partials.module';
import {PrintBalanceSheetComponent} from './balance-sheet/print-balance-sheet/print-balance-sheet.component';
import {PrintProfitNLossComponent} from './profit-N-loss/print-profit-n-loss/print-profit-n-loss.component';
import 'ag-grid-enterprise'
import {PrintGeneralLedgerComponent} from './general-ledger/print-general-ledger/print-general-ledger.component';
import {PrintTrialBalanceComponent} from './trial-balance/print-trial-balance/print-trial-balance.component';


@NgModule({
  declarations: [
    GeneralLedgerComponent,
    TrialBalanceComponent,
    BalanceSheetComponent,
    ProfitNLossComponent,
    PrintBalanceSheetComponent,
    PrintProfitNLossComponent,
    PrintGeneralLedgerComponent,
    PrintTrialBalanceComponent

  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    PartialsModule
  ],

})
export class ReportModule { }
