import { BILL, DEBIT_NOTE, JOURNAL_ENTRY, PAYMENT } from '../../../../shared/AppRoutes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, } from '@angular/router';
import { FirstDataRenderedEvent, GridOptions, ICellRendererParams } from 'ag-grid-community';
import { finalize, take } from 'rxjs/operators';

import { ActionButton, DocType, DocumentStatus, Permissions } from 'src/app/views/shared/AppEnum';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { ITransactionRecon } from '../model/ITransactionRecon';
import { RegisterPaymentComponent } from '../../../sales/invoice/register-payment/register-payment.component';
import { colSimple, colSimpleAmount, colSimpleAmountPercentage, colSimpleNumber } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-vendor-bill-detail',
  templateUrl: './vendor-bill-detail.component.html',
  styleUrls: ['./vendor-bill-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VendorBillDetailComponent extends AppComponentBase implements OnInit {

  // routing variables
  public BILL = BILL;
  public DEBIT_NOTE = DEBIT_NOTE;
  public PAYMENT = PAYMENT;
  public JOURNAL_ENTRY = JOURNAL_ENTRY
  docType = DocType
  action = ActionButton
  docStatus = DocumentStatus

  transactionReconModel: ITransactionRecon = {} as ITransactionRecon;
  // handling register payment button
  isDisabled: boolean;

  // kt busy loading
  isLoading: boolean;

  // For ag grid

  // need for routing
  billId: number;

  // need for Register Payment
  totalBeforeTax: number;
  totalTax: number;
  totalBillAmount: number;
  transactionId: number
  businessPartnerId: number;
  // Variables for bill data
  billLines: any;
  billMaster: any;
  loader = true;
  paidAmountList: any = [];
  pendingAmount: any;
  status: string;
  paidAmount: number;
  bpUnReconPaymentList: any = [];

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
      headerName: 'Item',
      field: 'itemName',
    }),
    colSimple({
      headerName: 'Description', field: 'description'
    }),
    colSimpleNumber.call(this, {
      headerName: 'Quantity', field: 'quantity'
    }),
    colSimpleAmount.call(this, {
      headerName: 'Cost', field: 'cost',
    }),
    colSimpleAmountPercentage.call(this, {
      headerName: 'Tax', field: 'tax',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Sub total', field: 'subTotal',
    }),
    colSimple({
      headerName: 'Account', field: 'accountName',
    }),
    colSimple({
      headerName: 'Location', field: 'locationName',
    })
  ];


  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      style: {"height": "250px", "margin-top": "10px"}
    }
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.isLoading = true;
        this.getBillMasterData(id);
        this.billId = id;
        this.cdr.markForCheck();
      }
    });
  }

  // Getting Bill master data
  getBillMasterData(id: number) {
    this.billService.getVendorBillMaster(id).subscribe(res => {
      this.billMaster = res.result;
      this.raGridProperties.rowData = res.result.billLines;
      this.totalBeforeTax = this.billMaster.totalBeforeTax;
      this.totalTax = this.billMaster.totalTax;
      this.totalBillAmount = this.billMaster.totalAmount;
      this.businessPartnerId = this.billMaster.vendorId;
      this.transactionId = this.billMaster.transactionId;
      this.status = this.billMaster.status;
      this.paidAmount = this.billMaster.totalPaid;
      this.pendingAmount = this.billMaster.pendingAmount;
      this.paidAmountList = this.billMaster.paidAmountList == null ? [] : this.billMaster.paidAmountList;
      this.bpUnReconPaymentList = this.billMaster.bpUnreconPaymentList == null ? [] : this.billMaster.bpUnreconPaymentList;
      this.isLoading = false;
      this.cdr.detectChanges();
    }, (err: any) => {});
  }

  // on dialogue open funtions
  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterPaymentComponent, {
      width: '900px',
      data: {
        accountId: this.billMaster.payableAccountId,
        paymentType: 0,
        transactionId: this.billMaster.ledgerId,
        businessPartnerId: this.businessPartnerId,
        pendingAmount: this.pendingAmount,
        formName: 'Bill',
        docType: this.docType.Payment
      }
    });
    // Recalling getBillMasterData function on dialog close
    dialogRef.afterClosed().subscribe(result => {
      this.getBillMasterData(this.billId);
      this.cdr.markForCheck();
    });
  }

  reconcile(index: any) {
    // initializing empty model
    this.isLoading = true
    this.transactionReconModel = {} as ITransactionRecon;
    this.mapTransactionReconModel(index);
    this.billService.createTransitionReconcile(this.transactionReconModel).pipe(
      take(1),
      finalize(() => this.isLoading = false))
      .subscribe(
        () => {
          this.toastService.success('Reconciled Successfully', 'Bill')
          this.getBillMasterData(this.billId);
          this.cdr.detectChanges();
        },
        (err: any) => {
          this.toastService.error(`${err.error.message || 'Something went wrong, please try again later.'}`, 'Error Reconciling')
        }
      );
  }

  mapTransactionReconModel(index: any) {
    this.transactionReconModel.paymentLedgerId = index.paymentLedgerId || index.ledgerId;
    this.transactionReconModel.documentLedgerId = this.billMaster.ledgerId;
    this.transactionReconModel.amount = index.amount > this.pendingAmount
      ? this.pendingAmount == 0 ? 1 : this.pendingAmount
      : index.amount;
  };

  workflow(action: any) {
    this.isLoading = true
    this.billService.workflow({ action, docId: this.billMaster.id })
      .subscribe((res) => {
        this.getBillMasterData(this.billId);
        this.isLoading = false;
        this.cdr.detectChanges();
        this.toastService.success('' + res.message, 'Vendor Bill');
      }, (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.toastService.error('' + err.error.message, 'Vendor Bill')
      })
  }

  unReconcile(pay: any) {
    this.isLoading = true;
    this.mapTransactionReconModel(pay);
    this.billService.unReconcileDocument(this.transactionReconModel).pipe(
      take(1),
      finalize(() => {
        this.getBillMasterData(this.billId);
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
    this.billService.resetToDraft(this.billId)
      .pipe(
        finalize(() => {
          this.getBillMasterData(this.billId)
          this.isLoading = false
        })
      )
      .subscribe((res) => {
        this.toastService.success('Successfully Reset to Draft', 'Bill')
        this.cdr.detectChanges();
      })
  }
}
