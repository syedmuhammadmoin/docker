import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {ActionButton, DocType, DocumentStatus} from 'src/app/views/shared/AppEnum';
import {IWorkflow} from '../../../purchase/vendorBill/model/IWorkflow';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {CreatePaymentComponent} from '../create-payment/create-payment.component';
import {BANK_STATEMENT, BILL, INVOICE, PAYMENT} from 'src/app/views/shared/AppRoutes';
import {AppConst} from "../../../../shared/AppConst";
import {finalize} from "rxjs/operators";


@Component({
  selector: 'kt-detail-payment',
  templateUrl: './detail-payment.component.html',
  styleUrls: ['./detail-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailPaymentComponent extends AppComponentBase implements OnInit, OnDestroy {
  selectedDocument
  formName
  formRoute
  documents = AppConst.Documents;
  appConst = AppConst
  paymentMaster: any;
  loader: boolean = true;
  docStatus = DocumentStatus;

  //subscription
  subscription$: Subscription

  public paymentRoute = PAYMENT

  public INVOICE = INVOICE;
  public BILL = BILL;
  public BANKSTATEMENT = BANK_STATEMENT

  //for busy loading
  isLoading: boolean

  action = ActionButton;
  docType = DocType;

  // need for routing
  paymentId: number;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    injector: Injector
  ) {
    super(injector)
    this.selectedDocument = this.route.snapshot.data.docType;
    this.formName = this.documents.find(x => x.id === this.selectedDocument).value
    this.formRoute = this.documents.find(x => x.id === this.selectedDocument).route
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      const id = +params.get('id');
      if (id) {
        this.isLoading = true
        this.getPaymentData(id);
        this.paymentId = id;
        this.cdr.markForCheck();
      }
    });
  }

  //Getting Payment Master data
  getPaymentData(id: number) {
    this.subscription$ = this.paymentService.getPaymentById(this.formName, id).subscribe(
      (res) => {
        this.paymentMaster = res.result;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      (err) => {});
  }

  addPaymentDialog(id?: number): void {
    const dialogRef = this.dialog.open(CreatePaymentComponent, {
      width: '760px',
      data: { id, docType: this.selectedDocument },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getPaymentData(this.paymentId)
    });
  }

  workflow(action: number) {
    this.isLoading = true;
    const body: IWorkflow = { docId: this.paymentMaster.id, action }
    this.paymentService.paymentWorkflow(body).subscribe((res) => {
      this.getPaymentData(this.paymentId);
      this.cdr.detectChanges();
      this.isLoading = false;
      this.toastService.success('' + res.message, 'Payment');
    }, (err) => {
      this.isLoading = false
      this.cdr.detectChanges();
      this.toastService.error('' + err.error.message, 'Payment');
    })
  }

  ngOnDestroy() {
    if (this.subscription$) this.subscription$.unsubscribe()
  }

  resetToDraft() {
    this.isLoading = true
    this.paymentService.resetToDraft(this.formName, this.paymentId)
      .pipe(
        finalize(() => {
          this.getPaymentData(this.paymentId)
          this.isLoading = false
        })
      )
      .subscribe((res) => {
        this.toastService.success('Successfully Reset to Draft', this.formName)
        this.cdr.detectChanges();
      })
  }
}
