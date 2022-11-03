import {BILL, DEBIT_NOTE} from '../../../../shared/AppRoutes';
import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {ActionButton, DocType, DocumentStatus} from 'src/app/views/shared/AppEnum';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {finalize} from "rxjs/operators";
import {
  colSimple,
  colSimpleAmount,
  colSimpleAmountPercentage,
  colSimpleNumber
} from 'src/app/views/shared/components/constants';
import {IRaGridProperties} from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';


@Component({
  selector: 'kt-debit-note-detail',
  templateUrl: './debit-note-detail.component.html',
  styleUrls: ['./debit-note-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DebitNoteDetailComponent extends AppComponentBase implements OnInit {
  // routing variables
  public DEBIT_NOTE = DEBIT_NOTE
  public BILL = BILL;

  docType = DocType
  action = ActionButton
  docStatus = DocumentStatus

  // handling register payment button
  isDisabled: boolean;

  // kt busy loading
  isLoading: boolean;


  // need for routing
  debitNoteId: number;

  totalBeforeTax: number;
  totalTax: number;
  totalAmount: number;
  // Variables for Debit Note Data
  debitNoteMaster: any;
  debitNoteLines: any;
  reconciledDocumentList: any = [];

  constructor(injector: Injector){
    super(injector)
  }

  columnDefs = [
    colSimple({
      headerName: 'Item', field: 'itemName',
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
      headerName: 'Account', field: 'accountName'
    }),
    colSimple({
      headerName: 'Location',field: 'locationName'
    })
  ];
  raGridProperties: Partial<IRaGridProperties> = {
    columnDefs: this.columnDefs,
    style: {"height": "250px", "margin-top": "10px"}
  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.isLoading = true
        this.getDebitNoteMasterData(id);
        this.debitNoteId = id;
      }
    });
  }

  // Debit Note Master Data
  getDebitNoteMasterData(id: number) {
    this.debitNoteService.getDebitNoteMaster(id).subscribe(res => {
      this.debitNoteMaster = res.result;
      this.raGridProperties.rowData = res.result.debitNoteLines;
      this.totalBeforeTax = this.debitNoteMaster.totalBeforeTax;
      this.totalTax = this.debitNoteMaster.totalTax;
      this.totalAmount = this.debitNoteMaster.totalAmount;
      this.reconciledDocumentList = this.debitNoteMaster.paidAmountList == null ? [] : this.debitNoteMaster.paidAmountList;
      this.isLoading = false;
      this.cdRef.markForCheck();
      });
  }

  workflow(action: any) {
    this.isLoading = true
    this.debitNoteService.workflow({ action, docId: this.debitNoteMaster.id })
      .subscribe((res) => {
        this.getDebitNoteMasterData(this.debitNoteId);
        this.toastService.success('' + res.message, 'Debit Note');
      }, (err) => {
        this.toastService.error('' + err.error.message, 'Debit Note')
      }, () => {
        this.isLoading = false;
      })
  }

  resetToDraft() {
    this.isLoading = true
    this.debitNoteService.resetToDraft(this.debitNoteId)
      .pipe(
        finalize(() => {
          this.getDebitNoteMasterData(this.debitNoteId)
          this.isLoading = false
        })
      )
      .subscribe((res) => {
        this.toastService.success('Successfully Reset to Draft', 'Debit Note')
        this.cdRef.detectChanges();
      })
  }
}
