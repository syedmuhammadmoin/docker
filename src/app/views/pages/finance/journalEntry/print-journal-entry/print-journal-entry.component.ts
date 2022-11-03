import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { IApiResponse } from 'src/app/views/shared/IApiResponse';
import { IJournalEntry } from '../model/IJournalEntry';
import { IJournalEntryLines } from '../model/IJournalEntryLines';
import { AppComponentBase } from "../../../../shared/app-component-base";

@Component({
  selector: 'kt-print-journal-entry',
  templateUrl: './print-journal-entry.component.html',
  styleUrls: ['./print-journal-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PrintJournalEntryComponent extends AppComponentBase implements OnInit {

  gridOptions: GridOptions;
  journalEntryMaster: any;
  journalEntryLines: IJournalEntryLines[];

  constructor(
    injector: Injector,
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      const id = +params.get('id');
      if (id) {
        this.getJournalEntryMasterData(id);
      } else {
      }
    });
  }

  printDiv(divName: string) {
    const printContents = document.getElementById(divName).innerHTML;
    window.document.body.innerHTML = printContents
    window.document.append('<link rel="stylesheet" href="print-bill.component.scss">')
    window.print();
    window.document.close();
  }

  getJournalEntryMasterData(id: number) {
    this.journalEntryService.getJournalEntryById(id).subscribe((res: IApiResponse<IJournalEntry>) => {
      this.journalEntryMaster = res.result;
      this.journalEntryLines = res.result.journalEntryLines;
      this.cdRef.markForCheck();
    })
  }
}
