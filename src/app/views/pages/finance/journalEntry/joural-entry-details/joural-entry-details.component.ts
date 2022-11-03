import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { ActionButton, DocumentStatus, DocType, Permissions } from 'src/app/views/shared/AppEnum';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { JOURNAL_ENTRY } from 'src/app/views/shared/AppRoutes';
import { IJournalEntry } from '../model/IJournalEntry';
import { IApiResponse } from 'src/app/views/shared/IApiResponse';
import { IJournalEntryLines } from '../model/IJournalEntryLines';
import { colSimple, colSimpleAmount } from 'src/app/views/shared/components/constants';
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';

@Component({
  selector: 'kt-joural-entry-details',
  templateUrl: './joural-entry-details.component.html',
  styleUrls: ['./joural-entry-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class JouralEntryDetailsComponent extends AppComponentBase implements OnInit {
  // for busy loading
  isLoading: boolean;

  docType = DocType
  action = ActionButton
  docStatus = DocumentStatus

  // need for routing
  journalEntryId: number;

  public journalEntryRoute = JOURNAL_ENTRY

  // For ag grid

  // Detail Data
  journalEntryMaster: any;
  journalEntryLines: IJournalEntryLines[];

  constructor(
    private layoutUtilService: LayoutUtilsService,
    injector: Injector
  ) {
    super(injector)
  }


  columnDefs: ColDef[] = [
    colSimple({
      headerName: 'Account', field: 'accountName',
    }),
    colSimple({
      headerName: 'Partner', field: 'businessPartnerName',
    }),
    colSimple({
      headerName: 'Description', field: 'description',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Debit', field: 'debit',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Credit', field: 'credit',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Location', field: 'locationName',
    })
  ];
  raGridProperties: Partial<IRaGridProperties> = {
    columnDefs: this.columnDefs,
    style: {"height": "250px", "margin-top": "10px"}
  };

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      const id = +params.get('id');
      if (id) {
        this.isLoading = true;
        this.getJournalEntryData(id);
        this.journalEntryId = id;
        this.cdRef.markForCheck();
      } else {
        this.layoutUtilService.showActionNotification('Cannot find record with out id parameter', null, 5000, true, false)
        this.router.navigate(['/' + JOURNAL_ENTRY.LIST])
      }
    });
  }

  private getJournalEntryData(id: number) {
    this.journalEntryService.getJournalEntryById(id).subscribe((res: IApiResponse<IJournalEntry>) => {
      this.journalEntryMaster = res.result;
      this.raGridProperties.rowData = res.result.journalEntryLines
      this.isLoading = false;
      this.cdRef.markForCheck();
    })
  }

  workflow(action: number) {
    this.isLoading = true
    this.journalEntryService.workflow({ action, docId: this.journalEntryMaster.id })
      .subscribe((res) => {
        this.getJournalEntryData(this.journalEntryId);
        this.isLoading = false;
        this.cdRef.detectChanges();
        this.toastService.success('' + res.message, 'Journal Entry');
      }, (err) => {
        this.isLoading = false;
        this.cdRef.detectChanges();
        this.toastService.error('' + err.error.message, 'Journal Entry')
      })
  }
}


