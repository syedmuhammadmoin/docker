import {Component, Inject, Injector, OnInit, Optional, ViewChild} from '@angular/core';
import {FormGroup, NgForm, Validators} from '@angular/forms';
import {IPayment} from '../model/IPayment';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {BehaviorSubject, Subscription} from 'rxjs';
import {finalize, take} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppConst} from 'src/app/views/shared/AppConst';
import {DocType} from 'src/app/views/shared/AppEnum';
import {AddModalButtonService} from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import {CRUD_ROUTES, PAYMENT} from 'src/app/views/shared/AppRoutes';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {ICashAccount} from '../../cash-account/model/ICashAccount';
import {IBankAccount} from '../../bank-account/model/IBankAccount';
import {MatRadioChange} from '@angular/material/radio';
import {NgxsCustomService} from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';

@Component({
  selector: 'kt-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss'],
  providers: [NgxsCustomService]
})

export class CreatePaymentComponent extends AppComponentBase implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;

  // doc type enum
  docType = DocType

  // for document type app constant
  documents = AppConst.Documents
  // Declaring form variable
  paymentForm: FormGroup;

  // Limit Date
  maxDate = new Date();

  // payment Model
  paymentModel: IPayment;

  // subscription
  subscription$: Subscription;

  propertyValue: string;
  propertyName: string;
  paymentRegisterList: BehaviorSubject<ICashAccount[] | IBankAccount[] | []> = new BehaviorSubject<ICashAccount[] | IBankAccount[] | []>([]);
  netPayment: number;

  // for Busy Loading
  isLoading: boolean;
  paymentMaster: any


  // validation messages
  validationMessages = {
    registerType: {
      required: 'Register Type is required'
    },
    paymentType: {
      required: 'Payment Type is required'
    },
    date: {
      required: 'Date is required'
    },
    description: {
      required: 'Description is required'
    },
    businessPartner: {
      required: 'Business Partner is required'
    },
    account: {
      required: 'Account is required'
    },
    paymentRegister: {
      required: 'Payment Register is required'
    },
    grossPayment: {
      required: 'Gross Payment is required',
      min: 'Please insert correct Payment !'
    },
    discount: {
      min: 'Minimum Value of Discount is 0'
    },
    incomeTax: {
      min: 'Minimum Value of Income Tax W/H is 0'
    },
    salesTax: {
      min: 'Minimum Value of Sales Tax W/H is 0'
    }
  }

  // Error keys
  formErrors = {
    registerType: '',
    paymentType: '',
    date: '',
    description: '',
    businessPartner: '',
    account: '',
    paymentRegister: '',
    grossPayment: '',
    discount: '',
    incomeTax: '',
    salesTax: ''

  }

  groups = [
    { id: 0, viewValue: 'Inflow' },
    { id: 1, viewValue: 'Outflow' }
  ];

  // close dialog
  currentDate = new Date();
  formName;
  title = 'Create'
  selectedDocumentType;
  formRoute

  // Injecting dependencies
  constructor(
    public addButtonService: AddModalButtonService,
    public ngxsService: NgxsCustomService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreatePaymentComponent>,
    injector: Injector
  ) {
    super(injector)
    this.formName = this.documents.find((x) => x.id === this.data.docType).value
    this.formRoute = this.documents.find((x) => x.id === this.data.docType).route
  }


  ngOnInit() {
    this.paymentForm = this.fb.group({
      registerType: ['', [Validators.required]],
      date: ['', [Validators.required]],
      description: ['', [this.vs.TEXT()]],
      businessPartner: ['', [Validators.required]],
      account: ['', [Validators.required]],
      paymentRegister: ['', [Validators.required]],
      grossPayment: [0, [this.vs.AMOUNT({min: 1})]], // Server Validation
      discount: [0, [this.vs.AMOUNT()]],
      salesTax: [0, [this.vs.AMOUNT()]],
      incomeTax: [0, [this.vs.AMOUNT()]]
    });

    // initializing payment model
    if (this.data.id) {
      this.isLoading = true;
      this.title = 'Edit'
      this.getPayment(this.data.id);
      this.cdRef.markForCheck();
    } else {
      // initializing payment model
      this.paymentModel = {
        paymentRegisterType: null,
        id: null,
        paymentType: null,
        businessPartnerId: null,
        accountId: null,
        paymentDate: null,
        paymentRegisterId: null,
        description: '',
        grossPayment: null,
        discount: null,
        salesTax: null,
        incomeTax: null,
        // documentTransactionId: null,
      }
    }
    ;
    this.calculatingNetPayment();
    this.ngxsService.getBusinessPartnerFromState();
    this.ngxsService.getAccountLevel4FromState();
  }

  getPayment(id: number) {
    this.paymentService.getPaymentById(this.formName, id)
      .subscribe(
        (payment: IApiResponse<IPayment>) => {
          this.paymentMaster = payment.result;
          this.editPayment(payment.result);
          this.paymentModel = payment.result;
          this.isLoading = false;
          this.calculatingNetPayment();
        },
        (err) => {

        }
      );
  }

  editPayment(payment: IPayment) {
    this.paymentForm.patchValue({
      registerType: payment.paymentRegisterType,
      paymentType: payment.paymentType,
      date: payment.paymentDate,
      description: payment.description,
      businessPartner: payment.businessPartnerId,
      account: payment.accountId,
      paymentRegister: payment.paymentRegisterId,
      grossPayment: payment.grossPayment,
      salesTax: payment.salesTax,
      incomeTax: payment.incomeTax,
      discount: payment.discount
    });
    this.loadAccountList({ value: payment.paymentRegisterType }, payment.paymentRegisterId)
  }

  // unsubscribe Observable
  ngOnDestroy() {
    if (this.subscription$) this.subscription$.unsubscribe()
  }

  // submit payment form
  onSubmit() {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.mapFormValueToPaymentModel();
    if (this.paymentModel.id) {
      this.paymentService.updatePayment(this.formName, this.paymentModel)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
          this.toastService.success('Updated Successfully', this.formName)
          this.router.navigate([PAYMENT.CONDITIONAL_ROUTE(this.formRoute) + PAYMENT.ID_BASED_ROUTE('details', this.paymentModel.id)])
          this.onCloseDialog()
        }
        );
    } else {
      delete this.paymentModel.id;
      this.subscription$ = this.paymentService.addPayment(this.formName, this.paymentModel)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
          this.toastService.success('Created Successfully', this.formName)
          this.router.navigate([PAYMENT.CONDITIONAL_ROUTE(this.formRoute) + CRUD_ROUTES.LIST])
          this.onCloseDialog();
        }
        );
    }
  }

  mapFormValueToPaymentModel() {
    this.paymentModel.paymentType = this.selectedDocumentType === this.docType.Payment ? 1 : 0;
    this.paymentModel.businessPartnerId = this.paymentForm.value.businessPartner;
    this.paymentModel.accountId = this.paymentForm.value.account;
    this.paymentModel.paymentDate = this.transformDate(this.paymentForm.value.date, 'yyyy-MM-dd');
    this.paymentModel.paymentRegisterId = this.paymentForm.value.paymentRegister;
    this.paymentModel.description = this.paymentForm.value.description;
    this.paymentModel.grossPayment = this.paymentForm.value.grossPayment;
    this.paymentModel.discount = this.paymentForm.value.discount;
    this.paymentModel.salesTax = this.paymentForm.value.salesTax;
    this.paymentModel.incomeTax = this.paymentForm.value.incomeTax;
    this.paymentModel.paymentRegisterType = this.paymentForm.value.registerType
    // this.paymentModel.documentTransactionId = 0;
  }

  // for save or submit
  isSubmit(val: number) {
    this.paymentModel.isSubmit = (val === 0) ? false : true;
  }

  loadAccountList($event: MatRadioChange | any, id: number = null) {
    this.paymentForm.patchValue({
      paymentRegister: id
    })
    if ($event.value === 1) {
      this.cashAccountService.getCashAccountsDropdown().subscribe((res: IApiResponse<ICashAccount[]>) => {
        this.paymentRegisterList.next(res.result)
        this.cdRef.markForCheck();
      })
      this.propertyValue = 'chAccountId';
      this.propertyName = 'cashAccountName';
    } else {
      this.bankAccountService.getBankAccountsDropdown().subscribe((res: IApiResponse<IBankAccount[]>) => {
        this.paymentRegisterList.next(res.result)
        this.cdRef.markForCheck();
      })
      this.propertyValue = 'clearingAccountId';
      this.propertyName = 'accountTitle';
    }
  }

  // Calculating net payment amount
  calculatingNetPayment(): void {
    this.paymentForm.valueChanges.subscribe((val: IPayment) => {
      // this.netPayment = (Number(val.grossPayment) - (Number(val.discount) + Number(val.salesTax) + Number(val.incomeTax))).toFixed(2);
      this.netPayment = +(Number(val.grossPayment) - (Number(val.discount) + Number(val.salesTax) + Number(val.incomeTax))).toFixed(2);
    });
  }

  // open business partner dialog
  openBusinessPartnerDialog() {
    if (this.permission.isGranted(this.permissions.BUSINESSPARTNER_CREATE)) {
      this.addButtonService.openBuinessPartnerDialog();
    }
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  reset() {
    // this.formDirective.reset()
    // this.paymentForm.updateValueAndValidity()
    this.formErrors = {} as any
    this.formDirective.resetForm()
  }
}
