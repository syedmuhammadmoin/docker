import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { BANK_STATEMENT } from 'src/app/views/shared/AppRoutes';
import { AppListComponentBase } from '../../../../shared/app-list-component-base';
import { IBankStatement } from '../model/IBankStatement';
import { Permissions } from "../../../../shared/AppEnum";
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { colSimple, colSimpleAmount } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-bank-statement',
  templateUrl: './list-bank-statement.component.html',
  styleUrls: ['./list-bank-statement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListBankStatementComponent extends AppListComponentBase<IBankStatement> {
  constructor(
    injector: Injector
  ) {
    super(injector)
  }
  columnDefs = [
    colSimple({
      headerName: 'Bank Account',
      field: 'bankAccountName',
    }),
    colSimple({
      headerName: 'Description',
      field: 'description',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Opening Balance',
      field: 'openingBalance',
    })
  ];
  raGridProperties: Partial<IRaGridProperties> = {
    columnDefs: this.columnDefs,
    service: this.bankStatementService,
    pageName: 'BankStatementPageNumber',
    rowDoubleClicked: this.onRowDoubleClicked.bind(this),
    componentParent: this
  }
  addBankStatement() {
    this.router.navigate(['/' + BANK_STATEMENT.CREATE]);
  }

  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions.BANKSTATEMENT_EDIT) || this.permission.isGranted(this.permissions.BANKSTATEMENT_VIEW)) {
      this.router.navigate(['/' + BANK_STATEMENT.ID_BASED_ROUTE('details', event.data.id)]);
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }
}
