import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { IApiResponse } from 'src/app/views/shared/IApiResponse';
import { IInvoice } from '../model/IInvoice';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'kt-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PrintInvoiceComponent extends AppComponentBase implements OnInit {

  gridOptions: GridOptions;
  invoiceMaster: any;
  invoiceLines: any;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      const id = +params.get('id');
      if (id) {
        this.getInvoiceData(id);
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

  getInvoiceData(id: number) {
    this.invoiceService.getInvoiceById(id).subscribe((res: IApiResponse<IInvoice>) => {
      this.invoiceMaster = res.result;
      this.invoiceLines = res.result.invoiceLines;
      this.cdRef.markForCheck();
    });
  }
}
