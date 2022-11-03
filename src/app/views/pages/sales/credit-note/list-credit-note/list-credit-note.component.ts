import { Component, Injector, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { CREDIT_NOTE } from 'src/app/views/shared/AppRoutes';
import { ICreditNote } from '../model/ICreditNote';
import { AppListComponentBase } from "../../../../shared/app-list-component-base";
import { Permissions } from "../../../../shared/AppEnum";
import { colDate, colDropDownStatus, colSimpleAmount, colText } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-credit-note',
  templateUrl: './list-credit-note.component.html',
  styleUrls: ['./list-credit-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListCreditNoteComponent extends AppListComponentBase<ICreditNote> implements OnInit {
  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  columnDefs = [
    colText({
      headerName: 'Credit Note #',
      field: 'docNo',
    }),
    colText({
      headerName: 'Customer',
      field: 'customerName',
    }),
    colDate.call(this, {
      headerName: 'Note Date',
      field: 'noteDate',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Total', field: 'totalAmount',
    }),
    colDropDownStatus()
  ];
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.creditNoteService,
      pageName: 'CreditNotePageNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }
  addCreditNote() {
    this.router.navigate(['/' + CREDIT_NOTE.CREATE]);
  }

  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions.CREDITNOTE_EDIT) || this.permission.isGranted(this.permissions.CREDITNOTE_VIEW)) {
      this.router.navigate(['/' + CREDIT_NOTE.ID_BASED_ROUTE('details', event.data.id)]);
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }

  detectChanges() {
    this.cdRef.markForCheck();
  }
}
