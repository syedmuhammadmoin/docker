import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { INVOICE } from 'src/app/views/shared/AppRoutes';
import { IInvoice } from '../model/IInvoice';
import { AppListComponentBase } from "../../../../shared/app-list-component-base";
import { colTextAmount, colDate, colDropDownStatus, colText } from 'src/app/views/shared/components/constants';


@Component({
  selector: 'kt-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListInvoiceComponent extends AppListComponentBase<IInvoice> implements OnInit {
  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  columnDefs = [
    colText({
      headerName: 'Invoice #',
      field: 'docNo',
    }),
    colText({
      headerName: 'Customer',
      field: 'customerName',
    }),
    colDate.call(this, {
      headerName: 'Invoice Date',
      field: 'invoiceDate',
    }),
    colDate.call(this, {
      headerName: 'Due Data',
      field: 'dueDate',
    }),
    colTextAmount.call(this, {
      headerName: 'Total',
      field: 'totalAmount',
    }),
    colDropDownStatus()
  ];

  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.invoiceService,
      pageName: 'invoicePageNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }

  addInvoice() {
    this.router.navigate(['/' + INVOICE.CREATE]);
  }

  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions.INVOICE_VIEW) || this.permission.isGranted(this.permissions.INVOICE_EDIT)) {
      this.router.navigate(['/' + INVOICE.ID_BASED_ROUTE('details', event.data.id)]);
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }

  agingReport() {
    this.router.navigate(['/' + INVOICE.AGING_REPORT]);
  }
}
