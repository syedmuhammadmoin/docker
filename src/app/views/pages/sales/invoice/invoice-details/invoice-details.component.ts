import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { ActionButton, DocType, DocumentStatus, Permissions } from 'src/app/views/shared/AppEnum';
import { RegisterPaymentComponent } from '../register-payment/register-payment.component'
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { ITransactionRecon } from '../../../purchase/vendorBill/model/ITransactionRecon';
import { CREDIT_NOTE, INVOICE, JOURNAL_ENTRY, PAYMENT } from 'src/app/views/shared/AppRoutes';
import { IInvoice } from '../model/IInvoice';
import { IApiResponse } from 'src/app/views/shared/IApiResponse';
import { colSimple, colSimpleAmount, colSimpleAmountPercentage, colSimpleNumber } from 'src/app/views/shared/components/constants';


@Component({
  selector: 'kt-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InvoiceDetailsComponent extends AppComponentBase implements OnInit {

  docType = DocType
  action = ActionButton
  docStatus = DocumentStatus

  public INVOICE = INVOICE;
  public CREDIT_NOTE = CREDIT_NOTE;
  public PAYMENT = PAYMENT;
  public JOURNAL_ENTRY = JOURNAL_ENTRY

  transactionReconModel: ITransactionRecon;

  // handling register payment button
  isDisabled: boolean;

  // kt busy loading
  isLoading: boolean;

  // need for routing
  invoiceId: number;

  loader = true;

  // Variables for Invoice data
  invoiceMaster: IInvoice | any;
  bpUnReconPaymentList: any = [];
  pendingAmount: any;
  status: string;
  paidAmount: number;
  paidAmountList: any = [];

  // need for Register Payment
  totalBeforeTax: number;
  totalTax: number;
  totalInvoiceAmount: number;
  businessPartnerId: number;
  transactionId: number

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    injector: Injector
  ) {
    super(injector)
  }

  // Defining columns for ag grid
  columnDefs = [
    colSimple({
      headerName: 'Item', field: 'itemName'
    }),
    colSimple({
      headerName: 'Description', field: 'description'
    }),
    colSimpleNumber.call(this, {
      headerName: 'Quantity', field: 'quantity',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Price', field: 'price',
    }),
    colSimpleAmountPercentage.call(this, {
      headerName: 'Tax%', field: 'tax',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Subtotal', field: 'subTotal'
    }),
    colSimple({
      headerName: 'Account', field: 'accountName'
    }),
    colSimple({
      headerName: 'Location', field: 'locationName'
    })
  ];

  ngOnInit() {
    // initializing empty model
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      style: {"height": "250px", "margin-top": "10px"}
    }
    this.transactionReconModel = {} as ITransactionRecon;

    this.route.paramMap.subscribe((params: Params) => {
      const id = +params.get('id');
      if (id) {
        this.isLoading = true
        this.invoiceId = id;
        this.getInvoiceData(id);
        this.cdr.markForCheck();
      }
    });
  }
  // Getting invoice master data
  getInvoiceData(id: number) {
    this.invoiceService.getInvoiceById(id).subscribe((res: IApiResponse<IInvoice>) => {
      this.invoiceMaster = res.result;
      this.raGridProperties.rowData = res.result.invoiceLines;
      this.totalBeforeTax = this.invoiceMaster.totalBeforeTax;
      this.totalTax = this.invoiceMaster.totalTax;
      this.totalInvoiceAmount = this.invoiceMaster.totalAmount;
      this.status = this.invoiceMaster.status;
      this.businessPartnerId = this.invoiceMaster.customerId;
      this.transactionId = this.invoiceMaster.transactionId;
      this.paidAmount = this.invoiceMaster.totalPaid;
      this.pendingAmount = this.invoiceMaster.pendingAmount;
      this.paidAmountList = this.invoiceMaster.paidAmountList == null ? [] : this.invoiceMaster.paidAmountList;
      this.bpUnReconPaymentList = this.invoiceMaster.bpUnreconPaymentList == null ? [] : this.invoiceMaster.bpUnreconPaymentList;

      this.isLoading = false;
      // //handling disablity of register payment button
      // this.isDisabled = (this.invoiceMaster.status === "Paid" ? true : false)
      this.cdr.detectChanges();
    }, (err: any) => {});
  }

  // on dialogue open funtions
  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterPaymentComponent, {
      width: '900px',
      data: {
        accountId: this.invoiceMaster.receivableAccountId,
        paymentType: 1,
        transactionId: this.invoiceMaster.ledgerId,
        businessPartnerId: this.businessPartnerId,
        pendingAmount: this.pendingAmount,
        formName: 'Invoice',
        docType: this.docType.Receipt
      }
    });
    // Recalling getInvoiceData function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      this.getInvoiceData(this.invoiceId);
      this.cdr.detectChanges();
    });
  }

  reconcile(index: number) {
    this.isLoading = true;
    this.mapTransactionReconModel(index);
    this.invoiceService.reconcilePayment(this.transactionReconModel).pipe(
      take(1),
      finalize(() => this.isLoading = false))
      .subscribe(() => {
        this.toastService.success('Reconciled Successfully', 'Invoice')
        this.getInvoiceData(this.invoiceId);
        this.isLoading = false
        this.cdr.detectChanges();
        this.cdr.markForCheck();
      },
        (err) => this.toastService.error(`${err.error.message || 'Something went wrong, please try again later.'}`, 'Error Reconciling')
      );
  }

  mapTransactionReconModel(index: any) {
    this.transactionReconModel.paymentLedgerId = index.paymentLedgerId || index.ledgerId;
    this.transactionReconModel.documentLedgerId = this.invoiceMaster.ledgerId
    this.transactionReconModel.amount = index.amount > this.pendingAmount
      ? this.pendingAmount == 0 ? 1 : this.pendingAmount
      : index.amount;
  };

  workflow(action: number) {
    this.isLoading = true
    this.invoiceService.workflow({ action, docId: this.invoiceMaster.id })
      .subscribe((res) => {
        this.getInvoiceData(this.invoiceId);
        this.isLoading = false;
        this.cdr.detectChanges();
        this.toastService.success('' + res.message, 'Invoice');
      }, (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.toastService.error('' + err.error.message, 'Invoice')
      })
  }

  unReconcile(pay: any) {
    this.isLoading = true;
    this.mapTransactionReconModel(pay);
    this.invoiceService.unReconcileDocument(this.transactionReconModel).pipe(
      take(1),
      finalize(() => {
        this.getInvoiceData(this.invoiceId);
        this.isLoading = false
      }))
      .subscribe(() => {
        this.toastService.success('Unreconciled Successfully', 'Document')
        this.cdr.detectChanges();
      },
        (err) => {
          this.toastService.error(`${err.error.message || 'Something went wrong, please try again later.'}`, 'Error Reconciling')
        }
      );
  }

  resetToDraft() {
    this.isLoading = true
    this.invoiceService.resetToDraft(this.invoiceId)
      .pipe(
        finalize(() => {
          this.getInvoiceData(this.invoiceId)
          this.isLoading = false
        })
      )
      .subscribe((res) => {
        this.toastService.success('Successfully Reset to Draft', 'Invoice')
        this.cdr.detectChanges();
      })
  }
}
