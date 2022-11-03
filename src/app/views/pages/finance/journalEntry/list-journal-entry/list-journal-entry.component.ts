import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { JOURNAL_ENTRY } from 'src/app/views/shared/AppRoutes';
import { IJournalEntry } from '../model/IJournalEntry';
import { AppListComponentBase } from '../../../../shared/app-list-component-base';
import { Permissions } from "../../../../shared/AppEnum";
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { colDate, colDropDownStatus, colSimple, colSimpleAmount, colText } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-journal-entry',
  templateUrl: './list-journal-entry.component.html',
  styleUrls: ['./list-journal-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class ListJournalEntryComponent extends AppListComponentBase<IJournalEntry> implements OnInit {
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  // Declaring AgGrid data
  columnDefs = [
    colText({
      headerName: 'JV #',
      field: 'docNo',
    }),
    colDate.call(this, {
      headerName: 'Date',
      field: 'date'
    }),
    colSimple({
      headerName: 'Description',
      field: 'description',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Debit',
      field: 'totalDebit',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Credit',
      field: 'totalCredit',
    }),
    colDropDownStatus()
  ];
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.journalEntryService,
      pageName: 'JournalEntry',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }
  addJournalEntry() {
    this.router.navigate(['/' + JOURNAL_ENTRY.CREATE])
  }
  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions.JOURNALENTRY_EDIT) || this.permission.isGranted(this.permissions.JOURNALENTRY_VIEW)) {
      this.router.navigate(['/' + JOURNAL_ENTRY.ID_BASED_ROUTE('details', event.data.id)]);
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }
}
