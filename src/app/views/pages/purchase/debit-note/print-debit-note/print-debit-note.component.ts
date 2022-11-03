import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { IDebitNoteLines } from '../model/IDebitNoteLines';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'kt-print-debit-note',
  templateUrl: './print-debit-note.component.html',
  styleUrls: ['./print-debit-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PrintDebitNoteComponent extends AppComponentBase implements OnInit {

  gridOptions: GridOptions;
  debitNoteMaster: any;
  debitNoteLines: any;

  totalBeforeTax: number;
  totalTax: number;
  totalAmount: number;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.getDebitNoteMasterData(id);
      } else {
      }
    });
  }

  printDiv(divName: any) {
    const printContents = document.getElementById(divName).innerHTML;
    window.document.body.innerHTML = printContents;
    window.document.append('<link rel="stylesheet" href="print-invoice.component.scss">');
    window.print();
    window.document.close();
  }

  getDebitNoteMasterData(id: number) {
    this.debitNoteService.getDebitNoteMaster(id).subscribe(res => {
      this.debitNoteMaster = res.result;
      this.debitNoteLines = res.result.debitNoteLines;
      this.totalAmount = this.debitNoteMaster.totalAmount;
      this.totalBeforeTax = this.debitNoteLines.reduce((total: number, obj: IDebitNoteLines) => (obj.quantity * obj.cost) + total, 0);
      this.totalTax = this.debitNoteLines.reduce((total: number, obj: IDebitNoteLines) => (obj.quantity * obj.cost * obj.tax) / 100 + total, 0);
      this.cdRef.markForCheck();
    },
      (err: any) => {
      });
  }
}

