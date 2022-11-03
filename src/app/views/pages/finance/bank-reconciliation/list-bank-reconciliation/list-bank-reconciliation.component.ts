import { ChangeDetectorRef, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankAccountService } from '../../bank-account/service/bankAccount.service';
import { Permissions } from 'src/app/views/shared/AppEnum';
import { NgxsCustomService } from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import { colDateSimple, colSimple, colSimpleAmount } from 'src/app/views/shared/components/constants';
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { RaGridComponent } from 'src/app/views/shared/components/ra-grid/ra-grid.component';

@Component({
  selector: 'kt-list-bank-reconciliation',
  templateUrl: './list-bank-reconciliation.component.html',
  styleUrls: ['./list-bank-reconciliation.component.scss'],
  providers: [NgxsCustomService]
})

export class ListBankReconciliationComponent extends AppComponentBase implements OnInit {
  // Declaring FormGroup
  reconForm: FormGroup;
  // paymentGridApi;
  // statementGridApi;

  bankAccountId: number;
  clearingAccountId: number;
  isRowSelectable: boolean;
  paymentsToReconcile = [];

  isloading: boolean;
  constructor(
    injector: Injector,
    public ngxsService: NgxsCustomService,
    public accountService: BankAccountService,
  ) {
    super(injector);
  }

  // Validation Messages
  validationMessages = {
    bankName: {
      required: 'Bank Account is required'
    }
  }

  // Error keys for validation messages
  formErrors = {
    bankName: '',
  }
  columnBankStatement = [
    colSimple({
      headerName: 'Ref#', field: 'docNo', checkboxSelection: true
    }),
    colDateSimple.call(this, {
      headerName: 'Date', field: 'docDate',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Amount',
      field: 'unreconciledAmount',
    })
  ];

  columnPayment = [
    colSimple({
      headerName: 'Doc#', field: 'docNo', checkboxSelection: true
    }),
    colDateSimple.call(this, {
      headerName: 'Date', field: 'docDate',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Amount',
      field: 'unreconciledAmount',
    })
  ];
  raGridBankStatements: Partial<IRaGridProperties>
  raGridPayments: Partial<IRaGridProperties>
  ngOnInit() {
    this.isRowSelectable = false;
    // initializing formGroup
    this.reconForm = this.fb.group({
      bankName: ['', Validators.required],
    });
    this.raGridBankStatements = {
      columnDefs: this.columnBankStatement,
    }
    this.raGridPayments = {
      columnDefs: this.columnPayment,
    }
    this.ngxsService.getBankAccountFromState();
  }
  onSubmitBankAccount() {
    this.reconForm.markAllAsTouched();
    if (this.reconForm.invalid) {
      this.logValidationErrors(this.reconForm, this.formErrors, this.validationMessages);
      return;
    }
    // this.statementGrid.gridApi.showLoadingOverlay();
    // this.paymentGrid.gridApi.showLoadingOverlay();
    this.bankAccountId = this.reconForm.value.bankName;
    this.accountService.getBankAccount(this.bankAccountId)
      .subscribe(
        (bankAccount: any) => {
          this.clearingAccountId = bankAccount.result.clearingAccountId;
          this.loadReconciliationGridData();
          this.cdRef.detectChanges();
        },
        (err) => {

        }
      );
  }
  calculateReconTotal(array, fieldName) {
    return array.reduce((a, b) => {
      return a + this.prepareAmountToReconcile(b[fieldName]);
    }, 0);
  }
  @ViewChild('paymentGrid') paymentGrid: RaGridComponent;
  @ViewChild('statementGrid') statementGrid: RaGridComponent;
  onSubmit() {
    // TODO: Optimize the below code
    this.reconForm.markAllAsTouched();
    const isStatementNegative = this.statementGrid.gridApi.getSelectedRows().every((x) => Math.sign(x.unreconciledAmount) === -1)
    const isStatementPositive = this.statementGrid.gridApi.getSelectedRows().every((x) => Math.sign(x.unreconciledAmount) !== -1)
    const isPaymentNegative = this.paymentGrid.gridApi.getSelectedRows().every((x) => Math.sign(x.unreconciledAmount) === -1)
    const isPaymentPositive = this.paymentGrid.gridApi.getSelectedRows().every((x) => Math.sign(x.unreconciledAmount) !== -1)

    if ((isStatementNegative && isPaymentNegative) || (isPaymentPositive && isStatementPositive)) {
      // this.toastService.success('Success!')
      this.prepareToReconcile();
    } else {
      this.toastService.error('Both Sides Should either be positive or negative only!')
      return;
    }
  }
  reconcile(arrayOfReconData: any[], isExceeded: boolean) {
    if (!isExceeded && arrayOfReconData) {
      this.bankReconService.reconcileStatement(arrayOfReconData).subscribe((res) => {
        this.isloading = true;
        this.loadReconciliationGridData();
        this.toastService.success('Bank Reconciliation', 'Reconciled Successfully')
      })
    }
  }
  loadReconciliationGridData() {
    this.bankReconService.getPaymentStatement(this.clearingAccountId).subscribe(data => {
      this.paymentGrid.raGridProperties.rowData = data.result
      this.cdRef.detectChanges()
    });
    this.bankReconService.getBankStatement(this.bankAccountId).subscribe(data => {
      this.statementGrid.raGridProperties.rowData = data.result;
      this.cdRef.detectChanges()
    });
  }
  prepareAmountToReconcile(amount): number {
    let preparedAmount = 0;
    if (amount) {
      preparedAmount = Math.sign(amount) === -1 ? Math.abs(amount) : amount;
    }
    return preparedAmount;
  }

  prepareToReconcile() {
    // TODO: Optimize the below conditions or segregate the below conditions
    let isExceeded = true;
    this.paymentsToReconcile = [];
    if (this.statementGrid.gridApi.getSelectedRows().length === 0 || this.paymentGrid.gridApi.getSelectedRows().length === 0) {
      this.toastService.error('Select row to reconcile', 'Invalid Values');
      return;
    }
    if (this.statementGrid.gridApi.getSelectedRows().length === 1 && this.paymentGrid.gridApi.getSelectedRows().length === 1) {
      const statementAmount = this.prepareAmountToReconcile(this.statementGrid.gridApi.getSelectedRows()[0].unreconciledAmount)
      const paymentAmount = this.prepareAmountToReconcile(this.paymentGrid.gridApi.getSelectedRows()[0].unreconciledAmount)
      isExceeded = false;
      this.paymentsToReconcile.push({
        bankStmtId: this.statementGrid.gridApi.getSelectedRows()[0]?.id,
        paymentId: this.paymentGrid.gridApi.getSelectedRows()[0]?.id,
        amount: (statementAmount !== paymentAmount) ? (statementAmount > paymentAmount ? paymentAmount : statementAmount) : statementAmount

      })
    } else if (this.statementGrid.gridApi.getSelectedRows().length > this.paymentGrid.gridApi.getSelectedRows().length) {
      const paymentAmount = this.prepareAmountToReconcile(this.paymentGrid.gridApi.getSelectedRows()[0].unreconciledAmount)

      paymentAmount
        < this.calculateReconTotal(this.statementGrid.gridApi.getSelectedRows(), 'unreconciledAmount')
        ? this.toastService
          .error('Statements amount total cannot exceed Payment amount', 'Amount Exceeded')
        : isExceeded = false;
      this.statementGrid.gridApi.getSelectedRows().forEach((row) => {
        this.paymentsToReconcile.push({
          bankStmtId: row.id,
          paymentId: this.paymentGrid.gridApi.getSelectedRows()[0]?.id,
          amount: this.prepareAmountToReconcile(row.unreconciledAmount)
        })
      })
    } else if (this.paymentGrid.gridApi.getSelectedRows().length > this.statementGrid.gridApi.getSelectedRows().length) {
      const statementAmount = this.prepareAmountToReconcile(this.statementGrid.gridApi.getSelectedRows()[0].unreconciledAmount)
      statementAmount
        < this.calculateReconTotal(this.paymentGrid.gridApi.getSelectedRows(), 'unreconciledAmount')
        ? this.toastService
          .error('Payments amount total cannot exceed Statement amount', 'Amount Exceeded')
        : isExceeded = false;
      this.paymentGrid.gridApi.getSelectedRows().forEach((row) => {
        this.paymentsToReconcile.push({
          bankStmtId: this.statementGrid.gridApi.getSelectedRows()[0].id,
          paymentId: row.id,
          amount: this.prepareAmountToReconcile(row.unreconciledAmount)
        })
      })
    }
    this.reconcile(this.paymentsToReconcile, isExceeded);
  }
}
