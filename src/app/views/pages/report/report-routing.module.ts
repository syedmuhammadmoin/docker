import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BalanceSheetComponent} from './balance-sheet/balance-sheet/balance-sheet.component';
import {GeneralLedgerComponent} from './general-ledger/general-ledger/general-ledger.component';
import {ProfitNLossComponent} from './profit-N-loss/profit-N-loss/profit-N-loss.component';
import {TrialBalanceComponent} from './trial-balance/trial-balance/trial-balance.component';
import {Permissions} from '../../shared/AppEnum';
import {PermissionGuard} from 'src/app/core/auth/_guards/permission.guard';
import {PrintBalanceSheetComponent} from './balance-sheet/print-balance-sheet/print-balance-sheet.component';
import {PrintProfitNLossComponent} from './profit-N-loss/print-profit-n-loss/print-profit-n-loss.component';
import {REPORT} from '../../shared/AppRoutes';
import {PrintGeneralLedgerComponent} from './general-ledger/print-general-ledger/print-general-ledger.component';
import {PrintTrialBalanceComponent} from './trial-balance/print-trial-balance/print-trial-balance.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: REPORT.GENERAL_LEDGER, pathMatch: 'full'},

      {
        path: REPORT.GENERAL_LEDGER,
        children: [
          {
            path: '',
            component: GeneralLedgerComponent,
            data: {
              array: [
                {permission: Permissions.GENERALLEDGER_VIEW},
              ]
            },
            canActivate: [PermissionGuard]
          },
          {
            path: REPORT.PRINT,
            component: PrintGeneralLedgerComponent,
            data: {
              array: [
                {permission: Permissions.GENERALLEDGER_VIEW},
              ]
            },
            canActivate: [PermissionGuard]
          }
        ]
      },

      {
        path: REPORT.TRIAL_BALANCE,
        children: [
          {
            path: '',
            component: TrialBalanceComponent,
            data: {
              array: [
                {permission: Permissions.TRIALBALANCE_VIEW},
              ]
            },
            canActivate: [PermissionGuard]
          },
          {
            path: REPORT.PRINT,
            component: PrintTrialBalanceComponent,
            data: {
              array: [
                {permission: Permissions.TRIALBALANCE_VIEW},
              ]
            },
            canActivate: [PermissionGuard]
          }
        ]
      },

      {
        path: REPORT.BALANCE_SHEET,
        children: [
          {
            path: '',
            component: BalanceSheetComponent,
            data: {
              array: [
                {permission: Permissions.BALANCESHEET_VIEW},
              ]
            },
            canActivate: [PermissionGuard]
          },
          {
            path: REPORT.PRINT,
            component: PrintBalanceSheetComponent,
            data: {
              array: [
                {permission: Permissions.BALANCESHEET_VIEW},
              ]
            },
            canActivate: [PermissionGuard]
          },
        ]
      },

      {
        path: REPORT.PROFIT_N_LOSS,
        children: [
          {
            path: '',
            component: ProfitNLossComponent,
            data: {
              array: [
                {permission: Permissions.PROFITLOSS_VIEW},
              ]
            },
            canActivate: [PermissionGuard]
          },
          {
            path: REPORT.PRINT,
            component: PrintProfitNLossComponent,
            data: {
              array: [
                {permission: Permissions.PROFITLOSS_VIEW},
              ]
            },
            canActivate: [PermissionGuard]
          },
        ]
      },

      {path: '**', redirectTo: REPORT.GENERAL_LEDGER, pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
