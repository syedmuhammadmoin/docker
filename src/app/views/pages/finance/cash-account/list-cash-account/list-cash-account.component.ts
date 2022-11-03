import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { CreateCashAccountComponent } from '../create-cash-account/create-cash-account.component';
import { ICashAccount } from '../model/ICashAccount';
import { AppListComponentBase } from "../../../../shared/app-list-component-base";
import { Permissions } from "../../../../shared/AppEnum";
import { colDate, colSimpleAmount, colText, colTextAmount } from 'src/app/views/shared/components/constants';
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { RaGridComponent } from 'src/app/views/shared/components/ra-grid/ra-grid.component';


@Component({
  selector: 'kt-list-cashAccount',
  templateUrl: './list-cash-account.component.html',
  styleUrls: ['./list-cash-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListCashAccountComponent extends AppListComponentBase<ICashAccount> implements OnInit {
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  columnDefs = [
    colText({
      headerName: 'Cash Account',
      field: 'cashAccountName',
    }),
    colTextAmount.call(this, {
      headerName: 'Opening Balance',
      field: 'openingBalance',
    }),
    colText({
      headerName: 'Manager Name / Handler',
      field: 'handler',
    }),
    colDate.call(this, {
      headerName: 'Opening Balance Date',
      field: 'openingBalanceDate',
    }),
  ];
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.cashAccountService,
      pageName: 'CashAccountPageNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }
  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions.CASHACCOUNT_VIEW) || this.permission.isGranted(this.permissions.CASHACCOUNT_EDIT)) {
      this.openDialog(event.data.id)
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }

  @ViewChild('raGrid', { static: true }) grid: RaGridComponent;
  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(CreateCashAccountComponent, {
      width: '800px',
      data: id
    });
    // Recalling getCashAccounts function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      this.grid.gridReady()
    });
  }
}
