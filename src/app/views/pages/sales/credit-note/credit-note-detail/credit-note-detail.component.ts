import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { ActionButton, DocType, DocumentStatus, Permissions } from 'src/app/views/shared/AppEnum';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { CREDIT_NOTE, INVOICE } from 'src/app/views/shared/AppRoutes';
import { IApiResponse } from 'src/app/views/shared/IApiResponse';
import { ICreditNote } from '../model/ICreditNote';
import { finalize } from "rxjs/operators";
import { colSimple, colSimpleAmount, colSimpleAmountPercentage, colSimpleNumber } from 'src/app/views/shared/components/constants';


@Component({
  selector: 'kt-credit-note-detail',
  templateUrl: './credit-note-detail.component.html',
  styleUrls: ['./credit-note-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreditNoteDetailComponent extends AppComponentBase implements OnInit {

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  // For ag grid
  docType = DocType
  action = ActionButton
  docStatus = DocumentStatus

  public CREDIT_NOTE = CREDIT_NOTE
  public INVOICE = INVOICE

  // handling register payment button
  isDisabled: boolean;

  // kt busy loading
  isLoading: boolean;

  // need for routing
  creditNoteId: number;

  totalBeforeTax: number;
  totalTax: number;
  totalAmount: number;

  // For Credit Note data
  creditNoteMaster: ICreditNote | any;
  reconciledDocumentList: any = [];

  // Defining columns for ag grid
  columnDefs = [
    colSimple({
      headerName: 'Item', field: 'itemName'
    }),
    colSimple({
      headerName: 'Description', field: 'description'
    }),
    colSimpleNumber.call(this, {
      headerName: 'Quantity', field: 'quantity'
    }),
    colSimpleAmount.call(this, {
      headerName: 'Price', field: 'price',
    }),
    colSimpleAmountPercentage.call(this, {
      headerName: 'Tax%', field: 'tax',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Sub total', field: 'subTotal'
    }),
    colSimple({
      headerName: 'Account', field: 'accountName'
    }),
    colSimple({
      headerName: 'Location', field: 'locationName'
    })
  ];

  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      style: {"height": "250px", "margin-top": "10px"}
    }
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = +params.get('id');
      if (id) {
        this.isLoading = true
        this.creditNoteId = id;
        this.getCreditNoteData(id);
        this.cdRef.markForCheck();
      }
    });
  }

  getCreditNoteData(id: number) {
    this.creditNoteService.getCreditNoteById(id).subscribe((res: IApiResponse<ICreditNote>) => {
      this.creditNoteMaster = res.result;
      this.raGridProperties.rowData = res.result.creditNoteLines;
      this.reconciledDocumentList = this.creditNoteMaster.paidAmountList || []
      this.isLoading = false
      this.cdRef.detectChanges();
    })
  }

  workflow(action: number) {
    this.isLoading = true
    this.creditNoteService.workflow({ action, docId: this.creditNoteMaster.id })
      .subscribe((res) => {
        this.getCreditNoteData(this.creditNoteId);
        this.isLoading = false;
        this.cdRef.detectChanges();
        this.toastService.success('' + res.message, 'Credit Note');
      }, (err) => {
        this.isLoading = false;
        this.cdRef.detectChanges();
        this.toastService.error('' + err.error.message, 'Credit Note')
      })
  }

  resetToDraft() {
    this.isLoading = true
    this.creditNoteService.resetToDraft(this.creditNoteId)
      .pipe(
        finalize(() => {
          this.getCreditNoteData(this.creditNoteId)
          this.isLoading = false
        })
      )
      .subscribe((res) => {
        this.toastService.success('Successfully Reset to Draft', 'Credit Note')
        this.cdRef.detectChanges();
      })
  }
}
