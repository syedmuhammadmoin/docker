import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { IPayment } from '../model/IPayment';
import { IApiResponse } from 'src/app/views/shared/IApiResponse';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { AppConst } from '../../../../shared/AppConst';
import { DocType } from "../../../../shared/AppEnum";


@Component({
  selector: 'kt-payment-invoice',
  templateUrl: './payment-invoice.component.html',
  styleUrls: ['./payment-invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaymentInvoiceComponent extends AppComponentBase implements OnInit, OnDestroy {

  selectedDocument
  formName
  route
  documents = AppConst.Documents
  docType = DocType
  gridOptions: GridOptions;
  paymentMaster: any;

  // subscription
  subscription$: Subscription

  // Injecting dependencies
  constructor(
    private injector: Injector
  ) {
    super(injector);
    this.selectedDocument = this.activatedRoute.snapshot.data.docType;
    this.formName = this.documents.find(x => x.id === this.selectedDocument).value;
    this.route = this.selectedDocument === this.docType.Receipt ? 'Receipt Voucher' : 'Payment Voucher';;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      const id = +params.get('id');
      if (id) {
        this.getPaymentMaster(id);
      }
    });
  }

  printDiv(divName: any) {
    const printContents = document.getElementById(divName).innerHTML;
    window.document.body.innerHTML = printContents
    window.document.append('<link rel="stylesheet" href="print-invoice.component.scss">')
    window.print();
    window.document.close();
  }

  getPaymentMaster(id: number) {
    this.paymentService.getPaymentById(this.formName, id).subscribe((res: IApiResponse<IPayment>) => {
      this.paymentMaster = res.result;
      // this.netPayment = (res.result.grossPayment - res.result.discount - res.result.incomeTax - res.result.salesTax);
      this.cdRef.markForCheck();
    })
  }

  ngOnDestroy() {
    if (this.subscription$) this.subscription$.unsubscribe()
  }
}
