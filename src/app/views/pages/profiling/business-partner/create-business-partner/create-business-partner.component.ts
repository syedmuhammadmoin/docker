import {NgxsCustomService} from '../../../../shared/services/ngxs-service/ngxs-custom.service';
import {Component, Inject, Injector, OnInit, Optional, ViewChild} from '@angular/core';
import {FormGroup, NgForm, Validators} from '@angular/forms';
import {IBusinessPartner} from '../model/IBusinessPartner';
import {Subject, Subscription} from 'rxjs';
import {IState} from 'src/app/views/shared/models/state';
import {ICity} from 'src/app/views/shared/models/city';
import {ICountry} from 'src/app/views/shared/models/country';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {CategoryService} from '../../category/service/category.service';
import {finalize, take} from 'rxjs/operators';
import {CscService} from 'src/app/views/shared/csc.service';
import {IsReloadRequired} from '../../store/profiling.action';
import {BusinessPartnerState} from '../store/business-partner.state';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {BusinessPartnerType} from 'src/app/views/shared/AppEnum';

@Component({
  selector: 'kt-create-business-partner',
  templateUrl: './create-business-partner.component.html',
  styleUrls: ['./create-business-partner.component.scss'],
  providers: [NgxsCustomService]
})

export class CreateBusinessPartnerComponent extends AppComponentBase implements OnInit {
  // Hide Submit And Cancel button
  isEditButtonShow = false;
  // disable dropdown
  disableDropdown = false;

  formName = 'Create Business Partner'
  // busy loading
  isLoading: boolean;

  // form variable
  businessPartnerForm: FormGroup;

  // Model
  businessPartner: IBusinessPartner = {} as any;

  // country , state and city list
  countryList: ICountry[] = [];
  stateList: IState[] = [];
  cityList: ICity[] = [];

  // for optionList dropdown
  stateList2: Subject<IState[]> = new Subject<IState[]>();
  cityList2: Subject<ICity[]> = new Subject<ICity[]>();

  // error messages
  validationMessages = {
    name: {
      required: 'Business Partner Name is required.'
    },
    businessPartnerType: {
      required: 'Business Partner Type is required.',
      RequireMatch: 'Please select a valid type from the list.'
    },
    entity: {
      required: 'Entity is required.',
    },
    country: {
      required: 'Country is required.'
    },
    state: {
      required: 'State is required.'
    },
    city: {
      required: 'City is required.'
    },
    address: {
      required: 'Address is required.'
    },
    phone: {
      maxlength: 'Invalid Phone number.',
      minlength: 'Invalid Phone number.',
      pattern: 'Only numeric values are allowed.'
    },
    mobile: {
      maxlength: 'Invalid Phone number.',
      minlength: 'Invalid Phone number.',
      pattern: 'Only numeric values are allowed.'
    },
    accountPayable: {
      required: 'Account Payable is required.',
    },
    accountReceivable: {
      required: 'Account Receivable is required.',
    },
    cnic: {
      maxlength: 'Invalid CNIC number.',
      minlength: 'Invalid CNIC number.',
      pattern: 'Only numeric values are allowed.'
    }
  };

  // error keys
  formErrors = {
    name: '',
    businessPartnerType: '',
    entity: '',
    country: '',
    state: '',
    city: '',
    address: '',
    phone: '',
    mobile: '',
    accountPayable: '',
    accountReceivable: '',
    cnic: ''
  };

  // variable for un-subscription
  subscription1$: Subscription;
  subscription2$: Subscription;
  subscription3$: Subscription;


  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number,
    public dialogRef: MatDialogRef<CreateBusinessPartnerComponent>,
    injector: Injector,
    public categoryService: CategoryService,
    public ngxsService: NgxsCustomService,
    private cscService: CscService, // Country, State, City
  ) {
    super(injector);
  }

  // business partner type list
  typeList = [
    {id: 0, viewValue: 'Customer'},
    {id: 1, viewValue: 'Vendor'},
    {id: 2, viewValue: 'Employee'}
  ];

  // business partner entity list
  entityList = [
    {id: 0, viewValue: 'Individual'},
    {id: 1, viewValue: 'Company'},
  ];

  ngOnInit() {
    this.businessPartnerForm = this.fb.group({
      name: ['', [this.vs.TEXT()]],
      businessPartnerType: [null, [Validators.required]],
      entity: [null, [Validators.required]],
      country: [null],
      state: [null],
      city: [null],
      address: ['', this.vs.TEXT({required: 0})],
      phone: ['', [this.vs.NUM({required: 0})]],
      mobile: ['', [this.vs.NUM({required: 0})]],
      incomeTaxId: [null, [this.vs.NUM({required: 0, min: 6, max: 20})]],
      salesTaxId: [null, [this.vs.NUM({required: 0, min: 6, max: 20})]],
      bankAccountTitle: ['', this.vs.TEXT({required: 0})],
      bankAccountNumber: ['', [this.vs.NUM({required: 0, min: 16, max: 24})]],
      accountPayable: [null, [Validators.required]],
      accountReceivable: [null, [Validators.required]],
      cnic: ['', [this.vs.NUM({required: 0, min: 13, max: 13})]]
    });
    this.ngxsService.getAccountLevel4ReceivablesFromState();
    this.ngxsService.getAccountLevel4PayablesFromState();

    this.getCountryList();

    if (this._id) {
      this.isLoading = true;
      // For Edit button
      this.isEditButtonShow = true;
      this.disableDropdown = true;
      this.formName = 'Business Partner Details';
      // disable all fields
      this.businessPartnerForm.disable();
      this.getBusinessPartner(this._id);
    } else {
      this.businessPartner = {
        id: null,
        businessPartnerType: '',
        entity: '',
        country: '',
        state: '',
        city: '',
        name: '',
        address: '',
        phone: null,
        email: '',
        mobile: null,
        website: '',
        incomeTaxId: '',
        salesTaxId: '',
        bankAccountTitle: '',
        bankAccountNumber: '',
        accountPayableId: null,
        accountReceivableId: null,
        cnic: null,
      };
    }

  }

  // Edit Form
  toggleEdit() {
    this.isEditButtonShow = false;
    this.disableDropdown = false;
    this.formName = 'Edit Business Partner'
    this.businessPartnerForm.enable()
  }

  getBusinessPartner(id: number) {
    this.subscription1$ = this.ngxsService.businessPartnerService.getBusinessPartner(id)
      .subscribe(
        (businessPartner: IApiResponse<IBusinessPartner>) => {
          this.isLoading = false;
          this.editBusinessPartner(businessPartner.result);
          this.businessPartner = businessPartner.result
        },
        (err) => {

        }
      );
  }

  editBusinessPartner(businessPartner: IBusinessPartner) {
    if (businessPartner.country) this.onChangeCountry(this.countryList.find(c => c.name == businessPartner.country).id);
    if (businessPartner.state) this.onChangeState(this.stateList.find(c => c.name == businessPartner.state).id)

    this.businessPartnerForm.patchValue({

      id: businessPartner.id,
      // businessPartnerType: this.typeList.find(i => i.viewValue === businessPartner.businessPartnerType).id,
      businessPartnerType: businessPartner.businessPartnerType,
      entity: this.entityList.find(i => i.viewValue === businessPartner.entity).id,
      country: businessPartner.country ? this.countryList.find(c => c.name == businessPartner.country).id : null,
      state: businessPartner.state ? this.stateList.find(c => c.name == businessPartner.state).id : null,
      city: businessPartner.city ? this.cityList.find(c => c.name == businessPartner.city).id : null,
      name: businessPartner.name,
      address: businessPartner.address,
      phone: businessPartner.phone,
      mobile: businessPartner.mobile,
      incomeTaxId: businessPartner.incomeTaxId,
      salesTaxId: businessPartner.salesTaxId,
      bankAccountTitle: businessPartner.bankAccountTitle,
      bankAccountNumber: businessPartner.bankAccountNumber,
      accountPayable: businessPartner.accountPayableId,
      accountReceivable: businessPartner.accountReceivableId,
      cnic: businessPartner.cnic
    });
  }

  getCountryList() {
    this.cscService.getCountries().subscribe((data: ICountry[]) => {
      this.countryList = data;
    });
  }

  getStateLists(id: number) {
    this.cscService.getStates(id).subscribe((data: IState[]) => {
      this.stateList = data;
      this.stateList2.next(this.stateList);
      if (this.businessPartnerForm.controls.city.value) {
        this.businessPartnerForm.controls.city.reset();
      }
    });
  }


  onChangeCountry(countryId: number) {
    if (countryId) {
      this.getStateLists(parseInt(countryId.toString()));
      this.stateList2.next(this.stateList)
    }
  }

  onChangeState(stateId: number) {
    if (stateId) {
      this.cscService.getCities(parseInt(stateId.toString())).subscribe(
        (data: ICity[]) => {
          this.cityList = data
          this.cityList2.next(this.cityList)
        });
    }
  }

  onSubmit() {
    this.businessPartnerForm.markAllAsTouched();
    if (this.businessPartnerForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.mapFormValueToClientModel();
    if (this.businessPartner.id) {
      this.subscription2$ = this.ngxsService.businessPartnerService.updateBusinessPartner(this.businessPartner)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
            this.ngxsService.store.dispatch(new IsReloadRequired(BusinessPartnerState, true));
            this.toastService.success('Updated Successfully', 'Business Partner')
            this.onCloseDialog();
          }
        );
    } else {
      delete this.businessPartner.id;
      this.subscription3$ = this.ngxsService.businessPartnerService.addBusinessPartner(this.businessPartner)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
            this.ngxsService.store.dispatch(new IsReloadRequired(BusinessPartnerState, true));
            this.toastService.success('Created Successfully', 'Business Partner')
            this.onCloseDialog();
          }
        );
    }
  }

  mapFormValueToClientModel() {
    const form = this.businessPartnerForm.value
    this.businessPartner.name = form.name;
    this.businessPartner.businessPartnerType = BusinessPartnerType[this.typeList[form.businessPartnerType].viewValue]
    this.businessPartner.entity = this.entityList[form.entity].viewValue;
    this.businessPartner.country = form.country ? this.countryList.find(c => c.id == form.country).name : '';
    this.businessPartner.state = form.state ? this.stateList.find(c => c.id == form.state).name : '';
    this.businessPartner.city = form.city ? this.cityList.find(c => c.id == form.city).name : '';
    this.businessPartner.address = form.address;
    this.businessPartner.phone = form.phone;
    this.businessPartner.email = form.email;
    this.businessPartner.website = form.website;
    this.businessPartner.mobile = form.mobile;
    this.businessPartner.incomeTaxId = form.incomeTaxId;
    this.businessPartner.salesTaxId = form.salesTaxId;
    this.businessPartner.bankAccountTitle = form.bankAccountTitle;
    this.businessPartner.bankAccountNumber = form.bankAccountNumber;
    this.businessPartner.accountPayableId = form.accountPayable;
    this.businessPartner.accountReceivableId = form.accountReceivable;
    this.businessPartner.cnic = form.cnic;
  }

  // Dialogue close function
  onCloseDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    // if (this.subscription1$ !== null) {
    //   this.subscription1$.unsubscribe()
    // }
    // if (this.subscription2$ !== null) {
    //   this.subscription3$.unsubscribe()
    // }
    // if (this.subscription3$ !== null) {
    //   this.subscription3$.unsubscribe()
    // }

  }

  @ViewChild('formDirective') private formDirective: NgForm;

  reset() {
    this.formDirective.resetForm();
  }
}









