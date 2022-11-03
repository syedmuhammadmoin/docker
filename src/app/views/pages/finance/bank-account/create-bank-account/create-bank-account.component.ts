import {Component, Inject, Injector, OnInit, Optional, ViewChild} from '@angular/core';
import {FormGroup, NgForm, Validators} from '@angular/forms';
import {IBankAccount} from '../model/IBankAccount';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {finalize, take} from 'rxjs/operators';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {NgxsCustomService} from "../../../../shared/services/ngxs-service/ngxs-custom.service";
import {IsReloadRequired} from "../../../profiling/store/profiling.action";
import {BankAccountState} from "../store/bank-account.state";


@Component({
  selector: 'kt-create-bank-account',
  templateUrl: './create-bank-account.component.html',
  styleUrls: ['./create-bank-account.component.scss']
})

export class CreateBankAccountComponent extends AppComponentBase implements OnInit {
  // Hide Submit And Cancel button
  isEditButtonShow = false;
  // disable dropdown
  disableDropdown = false;
  @ViewChild('formDirective') private formDirective: NgForm;

  title = 'Create Bank Account'

  // Injecting dependencies
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number,
    public dialogRef: MatDialogRef<CreateBankAccountComponent>,
    public ngxsService: NgxsCustomService,
    injector: Injector
  ) {
    super(injector)
  }

  isLoading: boolean;

  // Bank account Form variable
  bankAccountForm: FormGroup;

  // Bank account model
  bankAccount: IBankAccount;

  // validation messages
  validationMessages = {
    accountTitle: {
      required: 'Account Title is required.'
    },
    OBDate: {
      required: 'Opening Balance Date is required.'
    },
  }

  // Error keys
  formErrors = {
    accountNumber: '',
    bankName: '',
    // 'branch': '',
    openingBalance: '',
    accountTitle: '',
    OBDate: ''
  }

  // Dialogue close function
  currentDate = new Date();

  ngOnInit() {
    this.bankAccountForm = this.fb.group({
      accountNumber: ['', [this.vs.NUM({max: 20})]],
      bankName: ['', [this.vs.TEXT()]],
      branch: ['', [this.vs.TEXT({required: 0})]],
      openingBalance: [0, [this.vs.AMOUNT()]],
      OBDate: ['', [Validators.required]],
      accountTitle: ['', [this.vs.TEXT()]],
    });


    if (this._id) {
      this.isLoading = true
      // For Edit button
      this.isEditButtonShow = true;
      this.disableDropdown = true;
      this.title = 'Bank Account Details';
      // disable all fields
      this.bankAccountForm.disable();

      this.getBankAccount(this._id);
    } else {
      this.bankAccount = {
        id: null,
        accountNumber: null,
        bankName: '',
        branch: '',
        openingBalance: null,
        accountTitle: '',
        openingBalanceDate: null,
        currency: ''
      };
    }
  }

  // Edit Form
  toggleEdit() {
    this.isEditButtonShow = false;
    this.disableDropdown = false;
    this.title = 'Edit Bank Account'
    this.bankAccountForm.enable()
    this.bankAccountForm.get('openingBalance').disable()
    this.bankAccountForm.get('OBDate').disable()
  }


  getBankAccount(id: number) {
    this.bankAccountService.getBankAccount(id)
      .subscribe(
        (bankAccount: IApiResponse<IBankAccount>) => {
          this.isLoading = false;
          this.editBankAccount(bankAccount.result);
          this.bankAccount = bankAccount.result;
        },
        (err) => {

        }
      );
  }

  // edit bank account
  editBankAccount(bankAccount: IBankAccount) {
    this.bankAccountForm.patchValue({
      id: bankAccount.id,
      accountNumber: bankAccount.accountNumber,
      bankName: bankAccount.bankName,
      branch: bankAccount.branch,
      openingBalance: bankAccount.openingBalance,
      OBDate: bankAccount.openingBalanceDate,
      accountTitle: bankAccount.accountTitle,
      currency: 'PKR'
    });

  }

  // submit Bank Account Form
  onSubmit() {
    console.log('Submit Button Called');


    this.bankAccountForm.markAllAsTouched();
    this.bankAccountForm.updateValueAndValidity();
    if (this.bankAccountForm.invalid) {
      return
    }
    this.isLoading = true;
    this.mapFormValueToClientModel();

    if (this.bankAccount.id) {
      this.bankAccountService.updateBankAccount(this.bankAccount)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
          this.toastService.success('Updated Successfully', 'Bank Account')
          this.ngxsService.store.dispatch(new IsReloadRequired(BankAccountState, true))
          this.onCloseDialog()
        }
        )
    } else {
      delete this.bankAccount.id;
      this.bankAccountService.addBankAccount(this.bankAccount)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(
          () => {
            this.toastService.success('Created Successfully', 'Bank Account')
            this.ngxsService.store.dispatch(new IsReloadRequired(BankAccountState, true))
            this.onCloseDialog()
          }
        );
    }
  }

  mapFormValueToClientModel() {
    this.bankAccount.accountNumber = this.bankAccountForm.value.accountNumber;
    this.bankAccount.bankName = this.bankAccountForm.value.bankName;
    this.bankAccount.branch = this.bankAccountForm.value.branch;
    this.bankAccount.openingBalance = this.bankAccountForm.value.openingBalance;
    this.bankAccount.accountTitle = this.bankAccountForm.value.accountTitle;
    this.bankAccount.openingBalanceDate = this.transformDate(this.bankAccountForm.value.OBDate, 'yyyy-MM-dd') || '';
    this.bankAccount.currency = 'PKR';
  }
  onCloseDialog() {
    this.dialogRef.close();
  }

  reset() {
    this.formDirective.resetForm();
    /*this.bankAccountForm.get('accountNumber').reset()
    this.bankAccountForm.get('bankName').reset()
    this.bankAccountForm.get('branch').reset()
    this.bankAccountForm.get('accountTitle').reset()
    this.bankAccountForm.get('OBDate').reset()
    if(!this._id)  this.bankAccountForm.get('openingBalance').reset()
    this.logValidationErrors(this.bankAccountForm , this.formErrors , this.validationMessages)*/
  }
}
