import {Component, Inject, Injector, OnInit, Optional, ViewChild} from '@angular/core';
import {FormGroup, NgForm, Validators} from '@angular/forms';
import {ICashAccount} from '../model/ICashAccount';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {finalize, take} from 'rxjs/operators';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {NgxsCustomService} from "../../../../shared/services/ngxs-service/ngxs-custom.service";
import {IsReloadRequired} from "../../../profiling/store/profiling.action";
import {CashAccountState} from "../store/cash-account.state";

@Component({
  selector: 'kt-create-cash-account',
  templateUrl: './create-cash-account.component.html',
  styleUrls: ['./create-cash-account.component.scss']
})
export class CreateCashAccountComponent extends AppComponentBase implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  // Injecting dependencies
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number,
    public dialogRef: MatDialogRef<CreateCashAccountComponent>,
    public ngxService: NgxsCustomService,
    injector: Injector
  ) {
    super(injector)
  }


  title = 'Create Cash Account'
  isLoading: boolean;

  // Cash account Form variable
  cashAccountForm: FormGroup;

  // Cash account model
  cashAccountModel: ICashAccount;

  // validation messages
  validationMessages = {
    OBDate: {
      required: 'Opening Balance Date is required'
    },
  }

  // Error keys
  formErrors = {
    cashAccountName: '',
    // handler: '',
    openingBalance: '',
    OBDate: '',
    // currency: '',
  }

  // map form values
  maxDate = new Date();
  // Hide Submit And Cancel button
  isEditButtonShow = false;
  // disable dropdown
  disableDropdown = false;

  ngOnInit() {
    this.cashAccountForm = this.fb.group({
      cashAccountName: ['', [this.vs.TEXT()]],
      handler: ['', this.vs.TEXT({required: 0, alpha: 1})],
      openingBalance: [0, [this.vs.AMOUNT()]],
      OBDate: ['', [Validators.required]],
      // currency: ['', [Validators.required]]
    });

    if (this._id) {
      this.isLoading = true
      // For Edit button
      this.isEditButtonShow = true;
      this.disableDropdown = true;
      // disable all fields
      this.cashAccountForm.disable();
      this.title = 'Cash Account Details'
      this.getCashAccount(this._id);
    } else {
      this.cashAccountModel = {
        id: null,
        cashAccountName: '',
        handler: '',
        openingBalance: null,
        openingBalanceDate: '',
        currency: '',
      };
    }
  }

  // Edit Form
  toggleEdit() {
    this.isEditButtonShow = false;
    this.disableDropdown = false;
    this.title = 'Edit Cash Account'
    this.cashAccountForm.enable()
    this.cashAccountForm.get('openingBalance').disable()
    this.cashAccountForm.get('OBDate').disable()
  }

  // Dialogue close function
  onCloseDialog() {
    this.dialogRef.close();
  }

  // get Cash account by id
  getCashAccount(id: number) {
    this.cashAccountService.getCashAccount(id)
      .subscribe(
        (cashAccount: IApiResponse<ICashAccount>) => {
          this.isLoading = false;
          this.editCashAccount(cashAccount.result);
          this.cashAccountModel = cashAccount.result;
        },
        (err) => {}
      );
  }

  // Edit method
  editCashAccount(cashAccount: ICashAccount) {
    this.cashAccountForm.patchValue({
      id: cashAccount.id,
      cashAccountName: cashAccount.cashAccountName,
      handler: cashAccount.handler,
      openingBalance: cashAccount.openingBalance,
      OBDate: cashAccount.openingBalanceDate
      // currency: cashAccount.currency,
    });
  }

  // submit cash account form
  onSubmit() {
    this.cashAccountForm.markAllAsTouched();
    if (this.cashAccountForm.invalid) {
      return
    }
    this.isLoading = true;
    this.mapFormValueToCashAccountModel();
    if (this.cashAccountModel.id) {
      this.cashAccountService.updateCashAccount(this.cashAccountModel)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
          this.toastService.success('Updated Successfully', 'Cash Account')
          this.ngxService.store.dispatch(new IsReloadRequired(CashAccountState, true))
          this.onCloseDialog()
        }
        );
    } else {
      delete this.cashAccountModel.id;
      this.cashAccountService.addCashAccount(this.cashAccountModel)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
          this.toastService.success('Created Successfully', 'Cash Account')
          this.ngxService.store.dispatch(new IsReloadRequired(CashAccountState, true))
          this.onCloseDialog()
        }
        );
    }
  }
  mapFormValueToCashAccountModel() {
    this.cashAccountModel.cashAccountName = this.cashAccountForm.value.cashAccountName;
    this.cashAccountModel.handler = this.cashAccountForm.value.handler;
    this.cashAccountModel.openingBalance = this.cashAccountForm.value.openingBalance;
    this.cashAccountModel.openingBalanceDate = this.transformDate(this.cashAccountForm.value.OBDate, 'yyyy-MM-dd');
    this.cashAccountModel.currency = 'PKR';
  }

  reset() {
    this.formDirective.resetForm()
    /*this.cashAccountForm.get('cashAccountName').reset()
    this.cashAccountForm.get('handler').reset()
    this.cashAccountForm.get('OBDate').reset()
    if (!this._id) this.cashAccountForm.get('openingBalance').reset()
    this.logValidationErrors(this.cashAccountForm, this.formErrors, this.validationMessages)*/
  }
}
