import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';

import { IPurchaseRequisition } from './IPurchaseRequisition';
import { Observable } from 'rxjs';
import { startWith,map } from 'rxjs/operators';
import { ILocation } from '../../profiling/location/model/ILocation';
import { IAccount } from '../../profiling/category/model/IAccount';
import { IBusinessPartner } from '../../profiling/business-partner/model/IBusinessPartner';
import { IProduct } from '../../profiling/product/model/IProduct';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';


@Component({
  selector: 'kt-purchase-requisition',
  templateUrl: './purchase-requisition.component.html',
  styleUrls: ['./purchase-requisition.component.scss']
})

export class PurchaseRequisitionComponent  extends AppComponentBase  implements OnInit {
  constructor(injector: Injector) {
      super(injector)
  }

  // Declaring form variable
  purchaseRequisitionForm: FormGroup;

   // For Table Columns
   displayedColumns = ['itemId', 'description', 'quantity', 'locationId', 'action']
   // Getting Table by id
   @ViewChild('table', { static: true }) table: any ;
  // @ViewChild('myGrid', { static: false }) agGrid:AgGridAngular;

  // purchaseOrderModel
  purchaseRequisitionModel : IPurchaseRequisition;
  // For DropDown
  locationList: ILocation[];
  // projectList: IProject[];
  accountList: IAccount[];
  purchaseRequisitionList: IBusinessPartner[];
  itemList: IProduct[]=[];
  // wareHouseList: IWarehouse[];

   // For filter out values from dropDown
   filteredPuchaseRequisition: Observable<IBusinessPartner[]>;
   // filteredWarehouse: Observable<IWarehouse[]>;
   filteredItem: Observable<IProduct[]>[] = [];
   filteredAccount: Observable<IAccount[]>[] = [];
   filteredLocation: Observable<ILocation[]>[] = [];

   // for calculating grandtotal , totalBefore Tax, total Tax
  //  grandTotal : number = 0;
  //  totalBeforeTax : number = 0;
  //  totalTax : number = 0;


  validationMessages = {
    product : {
      required: 'Product is required'
    },
    billDate : {
      required: 'Requisition Date is required'
    },
    dueDate : {
      required: 'Due Date is required'
    },
    requester : {
      required: 'Requester is required'
    },
    priority : {
      required: 'Priority is required'
    },
    contactNo : {
      required: 'Contact Nubmer is required'
    },
  }


  formErrors = {
    product : '',
    billDate : '',
    dueDate : '',
    requester: '',
    priority : '',
    contactNo : ''
  }


   // Checking validation messages
   private formSubmitAttempt = true;

  ngOnInit() {
    this.purchaseRequisitionForm = this.fb.group({
      product: ['', [Validators.required]],
      billDate:['', [Validators.required]],
      dueDate:['', [Validators.required]],
      requester:['', [Validators.required]],
      priority:['', [Validators.required]],
      contactNo:['', [Validators.required]],
      invoiceLines: this.fb.array([
        this.addInvoiceLines()
      ])
    });

    // this.getPurchaseRequisitionNames();
    this.getItemList(0);
    // this.getAccountList(0);
    this.getLocationList(0);

    this.purchaseRequisitionModel = {
      id: null,
      businessPartnerId: null,
      product : '',
      billDate : null,
      dueDate : null,
      requester : '',
      priority : null,
      contactNo : null,
      transactionId: null,
      invoiceDetails: []
    }
  }
  logValidationErrors(group: FormGroup = this.purchaseRequisitionForm, a: number = 1): void {
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
    const purchaseRequisitionLineArray = this.purchaseRequisitionForm.get('invoiceLines') as FormArray;
    purchaseRequisitionLineArray.clear();
    this.table.renderRows();
  }


   // Get Customer Names
  //  getPurchaseRequisitionNames() {
  //   this.purchaseRequisitionService.getBusinessPartners().subscribe(
  //     (res) => {
  //       this.purchaseRequisitionList = res;
  //       this.filteredPuchaseRequisition = this.purchaseRequisitionForm.get('vendorName').valueChanges
  //         .pipe(
  //           startWith(''),
  //           map(value => typeof value === 'string' ? value : value.name),
  //           map(name => name ? this.filterPurchaseRequisition(name) : this.purchaseRequisitionList.slice())
  //         );
  //     },
  //     (err: any) => );
  // }

  // displayPurchaseRequisition(purchaseRequisitionId: number): string {
  //   if (purchaseRequisitionId) {
  //     return this.purchaseRequisitionList.find(purchaserRequisition => purchaserRequisition.id == purchaseRequisitionId).name
  //   }
  // }

  // private filterPurchaseRequisition(name: string): IBusinessPartner[] {
  //   const filterValue = name.toLowerCase();
  //   return this.purchaseRequisitionList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  // }

  // Get Item List
  getItemList(index: number) {
    this.productService.getProducts().subscribe(
      (res) => {
        this.itemList = res.result;
        const arrayControl = this.purchaseRequisitionForm.get('invoiceLines') as FormArray;
        this.filteredItem[index] = arrayControl.at(index).get('itemId').valueChanges
          .pipe(
            startWith<string | IProduct>(''),
            map(value => typeof value === 'string' ? value : value.productName),
            map(name => name ? this.filterItem(name) : this.itemList.slice())
          );
      },
      (err: any) => {

      });
  }

  displayItems(itemId: number): string {
    if (itemId) {
      return this.itemList.find(i => i.id === itemId).productName
    }
  }

  private filterItem(name: string): IProduct[] {
    const filterValue = name.toLowerCase();
    return this.itemList.filter(option => option.productName.toLowerCase().indexOf(filterValue) === 0);
  }

  // OnItemSelected
  onItemSelected(itemId: number, index: number) {
    // var arrayControl = this.purchaseRequisitionForm.get('invoiceLines') as FormArray;
    // if (itemId) {
    //   var salesPrice = this.itemList.find(i => i.id === itemId).salesPrice
    //   var salesTax = this.itemList.find(i => i.id === itemId).salesTax
    //   //set values for price & tax
    //   arrayControl.at(index).get('salesPrice').setValue(salesPrice);
    //   arrayControl.at(index).get('salesTax').setValue(salesTax);
    //   //Calculating subtotal
    //   var quantity = arrayControl.at(index).get('quantity').value;
    //   var subTotal = (salesPrice * quantity) + ((salesPrice * quantity) * (salesTax / 100))
    //   arrayControl.at(index).get('subTotal').setValue(subTotal);
    // }
  }

  // onChangeEvent for calculating subtotal
  onChangeEvent(value: any , index: number) {
    // var arrayControl = this.purchaseRequisitionForm.get('invoiceLines') as FormArray;
    // if (value.target.value) {
    //   var salesPrice = arrayControl.at(index).get('salesPrice').value;
    //   var salesTax = arrayControl.at(index).get('salesTax').value;
    //   var quantity = arrayControl.at(index).get('quantity').value;
    //   // var sumWithoutTax = salesPrice * quantity;
    //   // var taxVal = salesTax/100;
    //   // var calTax = sumWithoutTax * taxVal;
    //   // var result = sumWithoutTax + calTax;
    //   var subTotal = (salesPrice * quantity) + ((salesPrice * quantity) * (salesTax / 100))
    //   arrayControl.at(index).get('subTotal').setValue(subTotal);
    //   this.totalCalculation();
    // }
  }

  // Calculations
  // Calculate Total Before Tax ,Total Tax , grandTotal
  totalCalculation(){
    // this.totalTax = 0;
    // this.totalBeforeTax = 0;
    // this.grandTotal = 0;
    // var arrayControl = this.purchaseOrderForm.get('purchaseOrderLines') as FormArray;
    // arrayControl.controls.forEach((element , index) => {
    //   var price = arrayControl.at(index).get('salesPrice').value;
    //   var tax = arrayControl.at(index).get('salesTax').value;
    //   var quantity = arrayControl.at(index).get('quantity').value;
    //   this.totalTax += ((price * quantity) * tax) / 100
    //   this.totalBeforeTax += price * quantity;
    //   this.grandTotal += Number(arrayControl.at(index).get('subTotal').value);
    // });
  }


  // Get account list
  // getAccountList(index: number) {
  //   this.accountService.getAccounts().subscribe(
  //     (res) => {
  //       this.accountList = res;
  //       var arrayControl = this.purchaseRequisitionForm.get('invoiceLines') as FormArray;
  //       this.filteredAccount[index] = arrayControl.at(index).get('accountId').valueChanges
  //         .pipe(
  //           startWith<string | IAccount>(''),
  //           map(value => typeof value === 'string' ? value : value.name),
  //           map(name => name ? this.filterAccount(name) : this.accountList.slice())
  //         );
  //     },
  // }

  // displayAccount(accountId: number): string {
  //   if (accountId) {
  //     return this.accountList.find(i => i.id === accountId).name
  //   }
  // }

  // private filterAccount(name: string): IAccount[] {
  //   const filterValue = name.toLowerCase();
  //   return this.accountList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  // }

  // Get location list
  getLocationList(index: number) {
    this.locationService.getLocations().subscribe(
      (res) => {
        this.locationList = res.result;
        const arrayControl = this.purchaseRequisitionForm.get('invoiceLines') as FormArray;
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
  addInvoiceLineClick(): void {
    const controls = this.purchaseRequisitionForm.controls.invoiceLines as FormArray;
    controls.push(this.addInvoiceLines());
    this.getItemList(controls.length - 1);
    // this.getAccountList(controls.length - 1);
    this.getLocationList(controls.length - 1);
    this.table.renderRows();
  }

  addInvoiceLines(): FormGroup {
    return this.fb.group({
      itemId: ['', ],
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      locationId: ['', [ Validators.required]],
      projectId: [1]
    });
  }

  // to remove invoice line
  removeInvoiceLineClick(invoiceLineIndex: number): void {
    const invoiceLineArray = this.purchaseRequisitionForm.get('invoiceLines') as FormArray;
    invoiceLineArray.removeAt(invoiceLineIndex);
    invoiceLineArray.markAsDirty();
    invoiceLineArray.markAsTouched();
    this.table.renderRows();
  }

  // Submit Form Function
  onSubmit(): void {
    if(this.purchaseRequisitionForm.get('invoiceLines').invalid){
      this.purchaseRequisitionForm.get('invoiceLines').markAllAsTouched();
    }
    if (this.purchaseRequisitionForm.invalid) {
      this.logValidationErrors(this.purchaseRequisitionForm, 0);
      return;
    }
    this.mapFormValuesToPurchaseRequisitionModel();
    delete this.purchaseRequisitionModel.id;
    delete this.purchaseRequisitionModel.transactionId;
  }
  // Mapping value to model
  mapFormValuesToPurchaseRequisitionModel() {
    this.purchaseRequisitionModel.businessPartnerId = this.purchaseRequisitionForm.value.product;
    this.purchaseRequisitionModel.billDate = this.purchaseRequisitionForm.value.invoiceDate;
    this.purchaseRequisitionModel.dueDate = this.purchaseRequisitionForm.value.dueDate;
    this.purchaseRequisitionModel.requester = this.purchaseRequisitionForm.value.requester;
    this.purchaseRequisitionModel.priority = this.purchaseRequisitionForm.value.priority;
    this.purchaseRequisitionModel.contactNo = this.purchaseRequisitionForm.value.contactNo;
  }
}






