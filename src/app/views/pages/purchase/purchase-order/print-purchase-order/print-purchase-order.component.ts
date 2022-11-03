import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'kt-print-purchase-order',
  templateUrl: './print-purchase-order.component.html',
  styleUrls: ['./print-purchase-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PrintPurchaseOrderComponent extends AppComponentBase implements OnInit {
  isLoading = true;
  gridOptions: GridOptions;
  masterData: any;
  purchaseOrderLines: any;

  totalBeforeTax: number;
  totalTax: number;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.getPurchaseOrderMasterData(id);
      } else {
      }
    });
  }

  printDiv(divName: any) {
    const printContents = document.getElementById(divName).innerHTML;
    window.document.body.innerHTML = printContents
    window.document.append('<link rel="stylesheet" href="print-bill.component.scss">')
    window.print();
    window.document.close();
  }

  getPurchaseOrderMasterData(id: number) {
    this.purchaseOrderService.getPurchaseMasterById(id).subscribe(res => {
      this.masterData = res.result;
      this.purchaseOrderLines = res.result.purchaseOrderLines;
      this.totalBeforeTax = this.purchaseOrderLines.reduce((total, obj) => (obj.quantity * obj.cost) + total, 0);
      this.totalTax = this.purchaseOrderLines.reduce((total, obj) => (obj.quantity * obj.cost * obj.tax) / 100 + total, 0);
      this.isLoading = false;
      this.cdRef.markForCheck();
    },
      (err: any) => {
        this.isLoading = false;
      })
  }
}
