import {ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormGroup, NgForm, Validators} from '@angular/forms';
import {IBankStatement} from '../model/IBankStatement';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {finalize, take} from 'rxjs/operators';
import {IBankStatementLines} from '../model/IBankStatementLines';
import {Observable} from 'rxjs';
import {BANK_STATEMENT} from 'src/app/views/shared/AppRoutes';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {NgxsCustomService} from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import {AppConst} from 'src/app/views/shared/AppConst';

@Component({
  selector: 'kt-create-bank-statement',
  templateUrl: './create-bank-statement.component.html',
  styleUrls: ['./create-bank-statement.component.scss'],
  providers: [NgxsCustomService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateBankStatementComponent extends AppComponentBase implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  formName = 'Create'
  body: { data: IBankStatement, files: File } = { data: null, files: null }
  fileName: string;
  showFileName: boolean = false;
  showLines: boolean = true;
  math = Math;
  isEdit: boolean = false;
  isLoading: boolean;
  cumulativeBalance: number;
  appConst = AppConst

  // Limit Date
  maxDate: Date = new Date();

  openingBalance: number;
  cumulativeBalances: number[] = [0];
  // For Table Columns
  displayedColumns = ['reference', 'stmtDate', 'label', 'debit', 'credit', 'cumulativeBalance', 'action']

  // Getting Table by id
  @ViewChild('table', { static: false }) table: any;

  // bank Statment Form variable
  bankStatementForm: FormGroup;

  // bank Statement Model
  bankStatementModel: IBankStatement;


  // validation messages
  validationMessages = {
    bankAccountId: {
      required: 'Bank Account is required'
    },
    description: {
      required: 'Description is required'
    },

  }

  // keys for validation
  formErrors = {
    bankAccountId: '',
    description: ''
  }

  // Injecting dependencies  in constructor
  constructor(
    public ngxsService: NgxsCustomService,
    injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    // Initializing bank Statement Form
    this.bankStatementForm = this.fb.group({
      bankAccountId: ['', [Validators.required]],
      description: ['', [this.vs.TEXT()]],
      openingBalance: [0, [this.vs.AMOUNT()]],
      bankStmtLines: this.fb.array([
        this.addBanKStatementLines()
      ])
    });

    // business partner names
    this.ngxsService.getBankAccountFromState();
    // this.bankAccountService.getBankAccounts().subscribe(res => this.bankAccountList = res.result)
    this.activatedRoute.paramMap.subscribe(params => {
      const bankStatementId = +params.get('id');
      if (bankStatementId) {
        this.isEdit = true;
        this.isLoading = true;
        this.formName = 'Edit'
        this.getBankStatement(bankStatementId);
      } else {
        this.bankStatementModel = {
          id: null,
          bankAccountId: null,
          description: null,
          openingBalance: null,
          bankStmtLines: []
        }
      }
    });
  }

  // get Bank Statement
  getBankStatement(id: number) {
    this.bankStatementService.getBankStatement(id).subscribe(
      (bankStatement: IApiResponse<IBankStatement>) => {
        this.isLoading = false;
        this.editBankStatement(bankStatement.result)
        this.bankStatementModel = bankStatement.result
      },
      (err) => {

      }
    );
  }

  // Edit Bank Statement
  editBankStatement(bankStatement: IBankStatement) {
    this.bankStatementForm.patchValue({ ...bankStatement });
    this.bankStatementForm.setControl('bankStmtLines', this.patchStatementLines(bankStatement.bankStmtLines))
    this.calculateRunningTotal();
  }

  patchStatementLines(statementLines: IBankStatementLines[]): FormArray {
    const formArray = new FormArray([]);
    statementLines.forEach((line: IBankStatementLines) => {
      formArray.push(this.fb.group({
        id: line.id,
        reference: [line.reference, [this.vs.TEXT()]],
        stmtDate: [line.stmtDate, [Validators.required]],
        label: [line.label, [this.vs.TEXT()]],
        debit: [line.debit, [this.vs.AMOUNT()]],
        credit: [line.credit, [this.vs.AMOUNT()]],
        cumulativeBalance: [0]
      }))
      if (this.cumulativeBalances.length < statementLines.length) {
        this.cumulativeBalances.push(0);
      }
    })
    return formArray
  }

  // submitting Form
  onSubmit() {
    this.bankStatementForm.markAllAsTouched();
    if (this.bankStatementForm.get('bankStmtLines').invalid) {
      this.bankStatementForm.get('bankStmtLines').markAllAsTouched();
    }
    if (this.bankStatementForm.invalid) {
      this.logValidationErrors(this.bankStatementForm, this.formErrors, this.validationMessages)
      return
    }

    this.isLoading = true;
    this.mapFormValueToBankStatementModel();
    if (this.bankStatementModel.id) {
      this.bankStatementService.updateBankStatement(this.bankStatementModel)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
          this.toastService.success('Updated Successfully', 'Bank Statement')
          this.bankStatementForm.reset();
          this.router.navigate(['/' + BANK_STATEMENT.LIST])
        }
        );
    } else {
      delete this.bankStatementModel.id;
      this.bankStatementService.addBankStatement(this.body)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
          this.toastService.success('Created Successfully', 'Bank Statement')
          this.bankStatementForm.reset();
          this.router.navigate(['/' + BANK_STATEMENT.LIST])
        }
        );
    }
  }

  // mapping Form Values
  mapFormValueToBankStatementModel() {
    this.bankStatementModel = { ...this.bankStatementModel, ...this.bankStatementForm.value } as IBankStatement
    this.bankStatementModel.bankAccountId = this.bankStatementForm.value.bankAccountId;
    this.bankStatementModel.description = this.bankStatementForm.value.description;
    this.bankStatementModel.openingBalance = Number(this.bankStatementForm.value.openingBalance);
    this.bankStatementModel.bankStmtLines.map((data: IBankStatementLines) => {
      //delete data.id
      delete data.cumulativeBalance;
      data.id = data.id !== 0 ? data.id : 0;
      data.reference = Number(data.reference)
      data.credit = data.credit != null ? Number(data.credit) : 0;
      data.debit = data.debit != null ? Number(data.debit) : 0;
      data.stmtDate = this.transformDate(new Date(data.stmtDate), 'yyyy-MM-dd')
    });
    this.body.data = this.bankStatementModel as IBankStatement;
    if (this.body.files !== null) {
      delete this.body.data.bankStmtLines;
    }
  }

  // Add Bank Statement Line
  addBankStatementLineClick() {
    const controls = this.bankStatementForm.controls.bankStmtLines as FormArray;
    controls.push(this.addBanKStatementLines());
    this.cumulativeBalances.push(this.cumulativeBalance);
    this.table?.renderRows();
  }

  // add Bank Statement Line
  addBanKStatementLines(): FormGroup {
    return this.fb.group({
      id: [0],
      reference: [0, this.vs.TEXT()],
      stmtDate: ['', Validators.required],
      label: ['', [this.vs.TEXT()]],
      debit: [0, [this.vs.AMOUNT()]],
      credit: [0, [this.vs.AMOUNT()]],
      cumulativeBalance: [0, this.vs.AMOUNT()]
    });
  }

  // Remove Bank Statement Line
  removeBankStatementLine(bankStatementLineIndex: number): void {
    const BankStatementLineArray = this.bankStatementForm.get('bankStmtLines') as FormArray;
    if (BankStatementLineArray.length > 1) {
      BankStatementLineArray.removeAt(bankStatementLineIndex);
      this.cumulativeBalances.splice(bankStatementLineIndex, 1);
      this.calculateRunningTotal();
      BankStatementLineArray.markAsDirty();
      BankStatementLineArray.markAsTouched();
      this.table?.renderRows();
    }
  }

  // onChangeEvent to set debit or credit zero '0'
  onChangeEvent(_: unknown, index: number) {
    const arrayControl = this.bankStatementForm.get('bankStmtLines') as FormArray;
    const debitControl = arrayControl.at(index).get('debit');
    const creditControl = arrayControl.at(index).get('credit');
    const debit = (debitControl.value) !== null ? debitControl.value : null;
    const credit = (creditControl.value) !== null ? creditControl.value : null;
    if (debit > 0) {
      creditControl.setValue(0);
      creditControl.disable();
    } else if (credit > 0) {
      debitControl.setValue(0);
      debitControl.disable();
    } else if (debit === null || credit === null) {
      creditControl.enable();
      debitControl.enable();
    }
  }

  // Form Reset
  reset() {
    this.formDirective.resetForm()
    const journalEntryArray = this.bankStatementForm.get('bankStmtLines') as FormArray;
    journalEntryArray.clear();
    this.addBankStatementLineClick()
    this.body.files = null;
    this.fileName = '';
    this.showFileName = false;
    this.showLines = true;
    this.table?.renderRows();
  }

  calculateRunningTotal() {
    const arrayControl = this.bankStatementForm.get('bankStmtLines') as FormArray;
      this.openingBalance = +(this.bankStatementForm.get('openingBalance').value) || 0
      if (this.cumulativeBalances[0] !== this.openingBalance) {
        this.cumulativeBalances[0] = this.openingBalance;
      }
      for (let i = 0; i < arrayControl.length; i++) {
        const debitControl = arrayControl.at(i).get('debit');
        const creditControl = arrayControl.at(i).get('credit');
        const cumulativeControl = arrayControl.at(i).get('cumulativeBalance');
        const sum = +creditControl.value - +debitControl.value
        this.cumulativeBalance = sum !== 0 ? +this.cumulativeBalances[i] + sum : 0;
        cumulativeControl.setValue(this.cumulativeBalance);
        if (this.cumulativeBalances[i + 1] !== null) {
          this.cumulativeBalances[i + 1] = this.cumulativeBalance;
        }
      }
      this.calculateClosingBalance()
  }

  calculateClosingBalance() {
    const arrayControl = this.bankStatementForm.get('bankStmtLines') as FormArray;
    const cumulativeBalance = arrayControl.at(arrayControl.length - 1).get('cumulativeBalance');
    const closingBalance = cumulativeBalance !== null ? cumulativeBalance.value : 0.00
    return closingBalance !== null ? Number(closingBalance) : 0.00;
  }

  uploadFile(files: File[]) {
    this.showLines = false;
    this.body.files = files[0] as File;
    if (files) {
      this.showFileName = true;
      this.fileName = files[0].name
    }
    const bankStatementLines = this.bankStatementForm.get('bankStmtLines') as FormArray;
    bankStatementLines.clear()
  }

  canDeactivate(): boolean | Observable<boolean> {
    return !this.bankStatementForm.dirty;
  }
}
