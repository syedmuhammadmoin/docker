import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { CreateBankAccountComponent } from '../create-bank-account/create-bank-account.component';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { RaGridComponent } from 'src/app/views/shared/components/ra-grid/ra-grid.component';
import { colTextAmount, colSimple, colText } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-bankAccount',
  templateUrl: './list-bank-account.component.html',
  styleUrls: ['./list-bank-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListBankAccountComponent extends AppComponentBase implements OnInit {
  constructor(
    injector: Injector,
    public dialog: MatDialog,
  ) {
    super(injector)
  }
  columnDefs = [
    colSimple({
      headerName: 'Account Number',
      field: 'accountNumber',
    }),
    colText({
      headerName: 'Account Title',
      field: 'accountTitle',
    }),
    colText({
      headerName: 'Bank',
      field: 'bankName',
    }),
    colSimple({
      headerName: 'Branch',
      field: 'branch',
    }),
    colTextAmount.bind(this, {
      headerName: 'Opening Balance',
      field: 'openingBalance',
    })
  ];
  ngOnInit(): void {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      pageName: 'BankAccountPageNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      service: this.bankAccountService,
      componentParent: this
    }
  }
  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions.BANKACCOUNT_VIEW) ||
      this.permission.isGranted(this.permissions.BANKACCOUNT_EDIT)) {
      this.openDialog(event.data.id)
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }
  @ViewChild('raGrid', { static: true }) grid: RaGridComponent;
  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(CreateBankAccountComponent, {
      width: '800px',
      data: id
    });
    // Recalling getBankAccounts function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      this.grid.gridReady()
    });
  }
}
