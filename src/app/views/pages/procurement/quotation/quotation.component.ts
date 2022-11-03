import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { IQuotation } from './IQuotation';
import { AgGridAngular } from 'ag-grid-angular';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppComponentBase } from '../../../shared/app-component-base';
import { BusinessPartnerService } from "../../profiling/business-partner/service/businessPartner.service";
import { ILocation } from '../../profiling/location/model/ILocation';
import { IBusinessPartner } from '../../profiling/business-partner/model/IBusinessPartner';
import { IAccount } from '../../profiling/category/model/IAccount';
import { IProduct } from '../../profiling/product/model/IProduct';
import { RequireMatch } from 'src/app/views/shared/requireMatch';
import { ChartOfAccountService } from "../../finance/chat-of-account/service/chart-of-account.service";


@Component({
  selector: 'kt-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})

export class QuotationComponent extends AppComponentBase implements OnInit {

  constructor(
    private accountService: ChartOfAccountService,
    private quotationService: BusinessPartnerService,
    injector: Injector
  ) {
    super(injector)
  }

  // Declaring form variable
  quotationForm: FormGroup;
  // For Table Columns
  displayedColumns = ['itemId', 'description', 'salesPrice', 'quantity', 'salesTax', 'subTotal', 'accountId', 'locationId', 'action']
  // Getting Table by id
  @ViewChild('table', { static: true }) table: any;

  quotationModel: IQuotation;
  locationList: ILocation[];
  // projectList: IProject[];
  accountList: IAccount[];
  quotationList: IBusinessPartner[];
  quotationItem: IProduct[] = [];


  filteredQuotation: Observable<IBusinessPartner[]>;
  // filteredWarehouse:Observable<IWarehouse[]>;
  // filteredPaymentTerms:Observable<IPaymentTerms[]>;
  filteredItem: Observable<IProduct[]>[] = [];
  filteredAccount: Observable<IAccount[]>[] = [];
  filteredLocation: Observable<ILocation[]>[] = [];

  @ViewChild('myGrid', { static: false }) agGrid: AgGridAngular;
  grandTotal = 0;
  totalBeforeTax = 0;
  totalTax = 0;


  validationMessages = {
    customerName: {
      required: 'Customer Name is required'
    },
    paymentTerms: {
      required: 'Payment Term is required'
    },
    billDate: {
      required: 'Bill Date is required'
    },
    dueDate: {
      required: 'Due Date is required'
    },
    currency: {
      required: 'Currency is required'
    },
    contactNo: {
      required: 'Contact Nubmer is required'
    },
    vehicleNo: {
      required: 'Vehicle Number is required'
    },
    from: {
      required: 'It is required'
    },
    to: {
      required: 'It is required'
    },
  }

  formErrors = {
    customerName: '',
    paymentTerms: '',
    billDate: '',
    dueDate: '',
    currency: '',
    contactNo: '',
    vehicleNo: '',
    from: '',
    to: '',
  }


  // private _filter(name: string): IBusinessPartner[] {
  //   const filterValue = name.toLowerCase();

  //   return this.businessPartnerList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  // }

  // FOR PAYMENT NAME

  // displayFn2(user: IPayment): string {
  //   return user && user.viewValue ? user.viewValue : '';
  // }

  // private _filter2(name: string): IPayment[] {
  // const filterValue = name.toLowerCase();

  // return this.groups.filter(option => option.viewValue.toLowerCase().indexOf(filterValue) === 0);
  // }


  // Checking validation messages
  private formSubmitAttempt = true;


  ngOnInit() {
    this.quotationForm = this.fb.group({
      customerName: ['', [RequireMatch, Validators.required]],
      paymentTerms: ['', [Validators.required]],
      billDate: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      vehicleNo: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      quotationLines: this.fb.array([
        this.addQuotationLines()
      ])
      // warehouse:['', [RequireMatch,Validators.required]],
    });


    this.getQuotationList();
    this.getItemList(0);
    this.getAccountList(0);
    this.getLocationList(0);
    // this.getWarehouseList();
    // this.getPaymentType();

    this.quotationModel = {
      id: null,
      businessPartnerId: null,
      customerName: '',
      paymentTerms: '',
      billDate: null,
      dueDate: null,
      currency: '',
      contactNo: null,
      vehicleNo: null,
      from: '',
      to: '',
      transactionId: null,
      quotationDetails: []
    }
  }

  // FOR CUSTOMER NAME

  displayFn(user: IBusinessPartner): string {
    return user && user.name ? user.name : '';
  }

  logValidationErrors(group: FormGroup = this.quotationForm, a: number = 1): void {
    Object.keys(group.controls).forEach((Key: string) => {
      const abstractControl = group.get(Key);
      this.formErrors[Key] = '';
      if (a != 1 && this.formSubmitAttempt) {
        if (abstractControl && !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '' || abstractControl.untouched)) {
          const messages = this.validationMessages[Key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[Key] += messages[errorKey] + ' ';
            }
          }
        }
      }

      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[Key];
        this.formErrors[Key] = '';
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[Key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }


  // Form Reset
  reset() {
    // this.formSubmitAttempt = false;
    const quotationLineArray = this.quotationForm.get('quotationLines') as FormArray;
    quotationLineArray.clear();
    this.table.renderRows();
  }

  // Get Customer Names
  getQuotationList() {
    this.quotationService.getBusinessPartners().subscribe(
      (res) => {
        this.quotationList = res.result;
        this.filteredQuotation = this.quotationForm.get('customerName').valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterQuotation(name) : this.quotationList.slice())
          );
      },
      (err: any) => {

      });
  }

  displayQuotation(customerId: number): string {
    if (customerId) {
      return this.quotationList.find(customer => customer.id == customerId).name
    }
  }

  private filterQuotation(name: string): IBusinessPartner[] {
    const filterValue = name.toLowerCase();
    return this.quotationList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // Get Item List
  getItemList(index: number) {
    this.productService.getProducts().subscribe(
      (res) => {
        this.quotationItem = res.result;
        const arrayControl = this.quotationForm.get('quotationLines') as FormArray;
        this.filteredItem[index] = arrayControl.at(index).get('itemId').valueChanges
          .pipe(
            startWith<string | IProduct>(''),
            map(value => typeof value === 'string' ? value : value.productName),
            map(name => name ? this.filterItem(name) : this.quotationItem.slice())
          );
      },
      (err: any) => {
      });
  }

  displayItems(itemId: number): string {
    if (itemId) {
      return this.quotationItem.find(i => i.id === itemId).productName
    }
  }

  private filterItem(name: string): IProduct[] {
    const filterValue = name.toLowerCase();
    return this.quotationItem.filter(option => option.productName.toLowerCase().indexOf(filterValue) === 0);
  }

  // OnItemSelected
  onItemSelected(itemId: number, index: number) {
    const arrayControl = this.quotationForm.get('quotationLines') as FormArray;
    if (itemId) {
      const salesPrice = this.quotationItem.find(i => i.id === itemId).salesPrice
      const salesTax = this.quotationItem.find(i => i.id === itemId).salesTax
      // set values for price & tax
      arrayControl.at(index).get('salesPrice').setValue(salesPrice);
      arrayControl.at(index).get('salesTax').setValue(salesTax);
      // Calculating subtotal
      const quantity = arrayControl.at(index).get('quantity').value;
      const subTotal = (salesPrice * quantity) + ((salesPrice * quantity) * (salesTax / 100))
      arrayControl.at(index).get('subTotal').setValue(subTotal);
    }
  }

  // onChangeEvent for calculating subtotal
  onChangeEvent(value: any, index: number) {
    const arrayControl = this.quotationForm.get('quotationLines') as FormArray;
    if (value.target.value) {
      const salesPrice = arrayControl.at(index).get('salesPrice').value;
      const salesTax = arrayControl.at(index).get('salesTax').value;
      const quantity = arrayControl.at(index).get('quantity').value;
      // var sumWithoutTax = salesPrice * quantity;
      // var taxVal = salesTax/100;
      // var calTax = sumWithoutTax * taxVal;
      // var result = sumWithoutTax + calTax;
      const subTotal = (salesPrice * quantity) + ((salesPrice * quantity) * (salesTax / 100))
      arrayControl.at(index).get('subTotal').setValue(subTotal);
      this.totalCalculation();
    }
  }

  // Calculations
  // Calculate Total Before Tax ,Total Tax , grandTotal
  totalCalculation() {
    this.totalTax = 0;
    this.totalBeforeTax = 0;
    this.grandTotal = 0;
    const arrayControl = this.quotationForm.get('quotationLines') as FormArray;
    arrayControl.controls.forEach((element, index) => {
      const price = arrayControl.at(index).get('salesPrice').value;
      const tax = arrayControl.at(index).get('salesTax').value;
      const quantity = arrayControl.at(index).get('quantity').value;
      this.totalTax += ((price * quantity) * tax) / 100
      this.totalBeforeTax += price * quantity;
      this.grandTotal += Number(arrayControl.at(index).get('subTotal').value);
    });
  }


  // Get account list
  getAccountList(index: number) {
    this.accountService.getLevel4Accounts().subscribe(
      (res) => {
        this.accountList = res.result;
        const arrayControl = this.quotationForm.get('quotationLines') as FormArray;
        this.filteredAccount[index] = arrayControl.at(index).get('accountId').valueChanges
          .pipe(
            startWith<string | IAccount>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterAccount(name) : this.accountList.slice())
          );
      },
      (err: any) => {

      });
  }

  displayAccount(accountId: number): string {
    if (accountId) {
      return this.accountList.find(i => i.id === accountId).name
    }
  }

  private filterAccount(name: string): IAccount[] {
    const filterValue = name.toLowerCase();
    return this.accountList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // Get location list
  getLocationList(index: number) {
    this.locationService.getLocations().subscribe(
      (res) => {
        this.locationList = res.result;
        const arrayControl = this.quotationForm.get('quotationLines') as FormArray;
        this.filteredLocation[index] = arrayControl.at(index).get('locationId').valueChanges
          .pipe(
            startWith<string | ILocation>(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filterLocation(name) : this.locationList.slice())
          );
      },
      (err: any) => {});
  }

  displayLocation(locationId: number): string {
    if (locationId) {
      return this.locationList.find(i => i.id === locationId).name
    }
  }

  private filterLocation(name: string): ILocation[] {
    const filterValue = name.toLowerCase();
    return this.locationList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // to add invoice line
  addQuotationLineClick(): void {
    const controls = this.quotationForm.controls.quotationLines as FormArray;
    controls.push(this.addQuotationLines());
    this.getItemList(controls.length - 1);
    this.getAccountList(controls.length - 1);
    this.getLocationList(controls.length - 1);
    this.table.renderRows();
  }

  addQuotationLines(): FormGroup {
    return this.fb.group({
      itemId: ['', [RequireMatch]],
      description: ['', Validators.required],
      salesPrice: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      salesTax: ['', [Validators.max(100), Validators.min(0)]],
      subTotal: [{ value: '0', disabled: true }],
      accountId: ['', [RequireMatch, Validators.required]],
      locationId: ['', [RequireMatch, Validators.required]],
      projectId: [1]
    });
  }

  // to remove invoice line
  removeQuotationLineClick(quotationLineIndex: number): void {
    const quotationLineArray = this.quotationForm.get('quotationLines') as FormArray;
    quotationLineArray.removeAt(quotationLineIndex);
    quotationLineArray.markAsDirty();
    quotationLineArray.markAsTouched();
    this.table.renderRows();
  }

  // Submit Form Function
  onSubmit(): void {
    if (this.quotationForm.get('quotationLines').invalid) {
      this.quotationForm.get('quotationLines').markAllAsTouched();
    }
    if (this.quotationForm.invalid) {
      this.logValidationErrors(this.quotationForm, 0);
      return;
    }
    this.mapFormValuesToQuotationModel();
    delete this.quotationModel.id;
    delete this.quotationModel.transactionId;
  }

  // Mapping value to model
  mapFormValuesToQuotationModel() {
    this.quotationModel.businessPartnerId = this.quotationForm.value.customerName;
    this.quotationModel.paymentTerms = this.quotationForm.value.paymentTerms;
    // this.quotationModel.billDate = this.transformDate(this.quotationForm.value.invoiceDate, 'yyyy-MM-dd');
    // this.quotationModel.dueDate = this.transformDate(this.quotationForm.value.dueDate, 'yyyy-MM-dd');
    this.quotationModel.currency = this.quotationForm.value.currency;
    this.quotationModel.contactNo = this.quotationForm.value.contactNo;
    this.quotationModel.vehicleNo = this.quotationForm.value.vehicleNo;
    this.quotationModel.from = this.quotationForm.value.from;
    this.quotationModel.to = this.quotationForm.value.to;
  }
}
