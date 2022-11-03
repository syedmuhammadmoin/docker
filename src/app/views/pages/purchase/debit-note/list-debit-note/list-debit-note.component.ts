import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { Permissions } from 'src/app/views/shared/AppEnum';
import { IDebitNote } from "../model/IDebitNote";
import { colTextAmount, colDate, colDropDownStatus, colText } from 'src/app/views/shared/components/constants';
import { DEBIT_NOTE } from 'src/app/views/shared/AppRoutes';
import { AppListComponentBase } from 'src/app/views/shared/app-list-component-base';

@Component({
  selector: 'kt-list-debit-note',
  templateUrl: './list-debit-note.component.html',
  styleUrls: ['./list-debit-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListDebitNoteComponent extends AppListComponentBase<IDebitNote> implements OnInit {
  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  columnDefs = [
    colText({
      headerName: 'Debit Note #',  field: 'docNo'
    }),
    colText({
      headerName: 'Vendor Name', field: 'vendorName'
    }),
    colDate.call(this, {
      headerName: 'Note Date', field: 'noteDate'
    }),
    colTextAmount.call(this, {
      headerName: 'Total', field: 'totalAmount',
    }),
    colDropDownStatus()
  ];


  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.debitNoteService,
      pageName: 'DebitNotePageNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }

  addDebitNote() {
    this.router.navigate(['/' + DEBIT_NOTE.CREATE]);
  }

  onRowDoubleClicked(event: any) {
    if (this.permission.isGranted(this.permissions.DEBITNOTE_EDIT) || this.permission.isGranted(this.permissions.DEBITNOTE_VIEW)) {
      this.router.navigate(['/' + DEBIT_NOTE.ID_BASED_ROUTE('details', event.data.id)]);
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }
}
