import { NgxsCustomService } from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ISalesOrder } from '../model/ISalesOrder'
import { FormArray, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs/operators';
import { Permissions } from 'src/app/views/shared/AppEnum';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { ProductService } from '../../../profiling/product/service/product.service';
import { AddModalButtonService } from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import { Observable } from 'rxjs';
import { IProduct } from '../../../profiling/product/model/IProduct';
import { SALES_ORDER } from 'src/app/views/shared/AppRoutes';
import { IApiResponse } from 'src/app/views/shared/IApiResponse';
import { ISalesOrderLines } from '../model/ISalesOrderLines';

@Component({
  selector: 'kt-create-sales-order',
  templateUrl: './create-sales-order.component.html',
  styleUrls: ['./create-sales-order.component.scss'],
  providers: [NgxsCustomService]
})

export class CreateSalesOrderComponent extends AppComponentBase implements OnInit {

  titleName = 'Create'

  // For Loading
  isLoading: boolean;

  // Declaring form variable
  salesOrderForm: FormGroup;

  // For Table Columns
  displayedColumns = ['itemId', 'description', 'accountId', 'quantity', 'price', 'tax', 'subTotal', 'locationId', 'action']

  // Getting Table by id
  @ViewChild('table', { static: true }) table: any;

  // sales Order Model
  salesOrderModel: ISalesOrder;

  isSalesOrder: boolean;

  // For Dropdown
  salesItem: IProduct[] = [];

  // For Calculation
  grandTotal = 0;
  totalBeforeTax = 0;
  totalTax = 0;

  // Limit Date
  maxDate: Date = new Date();
  minDate: Date
  dateCondition: boolean

  // Validation Messages
  validationMessages = {
    customerName: {
      required: 'Customer Name is required'
    },
    salesOrderDate: {
      required: 'Order Date is required',
    },
    dueDate: {
      required: 'Due Date is required'
    },
    contactNo: {
      pattern: 'Only numbers are allowed.',
    }
  }

  // error keys
  formErrors = {
    customerName: '',
    salesOrderDate: '',
    dueDate: '',
    contactNo: ''
  }

  // Injecting Dependencies
  constructor(
    public addButtonService: AddModalButtonService,
    public productService: ProductService,
    public ngxsService: NgxsCustomService,
    injector: Injector
  ) {
    super(injector);
  }


  ngOnInit() {
    this.salesOrderForm = this.fb.group({
      customerName: ['', [Validators.required]],
      salesOrderDate: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      contactNo: ['', [this.vs.NUM({ required: 0 })]],
      salesOrderLines: this.fb.array([
        this.addSalesOrderLines()
      ])
    });

    this.salesOrderModel = {
      id: null,
      customerId: null,
      soDate: null,
      dueDate: null,
      contact: null,
      salesOrderLines: []
    }

    this.activatedRoute.queryParams.subscribe((param) => {
      const id = param.q;
      this.isSalesOrder = param.isSalesOrder;
      if (id && this.isSalesOrder) {
        this.titleName = 'Edit';
        this.getSalesOrder(id);
      }
    })

    this.productService.getProducts().subscribe(res => this.salesItem = res.result)

    // handling dueDate logic
    this.salesOrderForm.get('salesOrderDate').valueChanges.subscribe((value) => {
      this.minDate = new Date(value);
      this.dateCondition = this.salesOrderForm.get('dueDate').value < this.salesOrderForm.get('salesOrderDate').value
    });
    // get customer from state
    this.ngxsService.getBusinessPartnerFromState();
    // get Accounts of level 4 from state
    this.ngxsService.getAccountLevel4FromState()
    // get Ware house location from state
    this.ngxsService.getLocationFromState();
    // get item from state
    this.ngxsService.getProductFromState();
  }

  /*// Form Reset
  reset() {
    const salesOrderLineArray = this.salesOrderForm.get('salesOrderLines') as FormArray;
    salesOrderLineArray.clear();
    this.table.renderRows();
  }*/

  // for save or submit
  isSubmit(val: number) {
    this.salesOrderModel.isSubmit = (val !== 0);
  }

  // OnItemSelected
  onItemSelected(itemId: number, index: number) {
    const arrayControl = this.salesOrderForm.get('salesOrderLines') as FormArray;
    if (itemId) {
      const price = this.salesItem.find(i => i.id === itemId).salesPrice
      const tax = this.salesItem.find(i => i.id === itemId).salesTax
      // set values for price & tax
      arrayControl.at(index).get('price').setValue(price);
      arrayControl.at(index).get('tax').setValue(tax);
      // Calculating subtotal
      const quantity = arrayControl.at(index).get('quantity').value;
      const subTotal = (price * quantity) + ((price * quantity) * (tax / 100))
      arrayControl.at(index).get('subTotal').setValue(subTotal);
    }
  }

  // For Calculating subtotal
  onChangeEvent(value: unknown, index: number, element?: HTMLElement) {
    const arrayControl = this.salesOrderForm.get('salesOrderLines') as FormArray;
    const price = (arrayControl.at(index).get('price').value) !== null ? arrayControl.at(index).get('price').value : null;
    const tax = (arrayControl.at(index).get('tax').value) !== null ? arrayControl.at(index).get('tax').value : null;
    arrayControl.at(index).get('tax').value == null ? arrayControl.at(index).get('tax').setValue(0) : console.log('');
    const quantity = (arrayControl.at(index).get('quantity').value) !== null ? arrayControl.at(index).get('quantity').value : null;
    // calculating subTotal
    const subTotal = (price * quantity) + ((price * quantity) * (tax / 100))
    arrayControl.at(index).get('subTotal').setValue(subTotal);
    this.totalCalculation();
  }

  // Calculations
  // Calculate Total Before Tax ,Total Tax , grandTotal
  totalCalculation() {
    this.totalTax = 0;
    this.totalBeforeTax = 0;
    this.grandTotal = 0;
    const arrayControl = this.salesOrderForm.get('salesOrderLines') as FormArray;
    arrayControl.controls.forEach((element, index) => {
      const price = arrayControl.at(index).get('price').value;
      const tax = arrayControl.at(index).get('tax').value;
      const quantity = arrayControl.at(index).get('quantity').value;
      this.totalTax += ((price * quantity) * tax) / 100
      this.totalBeforeTax += price * quantity;
      this.grandTotal += Number(arrayControl.at(index).get('subTotal').value);
    });
  }

  // Add sales Order line
  addSalesOrderLineClick(): void {
    const controls = this.salesOrderForm.controls.salesOrderLines as FormArray;
    controls.push(this.addSalesOrderLines());
    this.table.renderRows();
  }

  addSalesOrderLines(): FormGroup {
    return this.fb.group({
      itemId: ['', [Validators.required]],
      description: ['', [this.vs.TEXT()]],
      price: ['', [this.vs.AMOUNT({ min: 1 })]],
      quantity: ['', [this.vs.AMOUNT({ min: 1 })]],
      tax: [0, [this.vs.AMOUNT({ max: 100 })]],
      subTotal: [{ value: '0', disabled: true }],
      accountId: ['', [Validators.required]],
      locationId: ['', [Validators.required]],
    });
  }


  // Remove sales Order line
  removeSalesOrderLineClick(salesOrderLineIndex: number): void {
    const salesOrderLineArray = this.salesOrderForm.get('salesOrderLines') as FormArray;
    salesOrderLineArray.removeAt(salesOrderLineIndex);
    salesOrderLineArray.markAsDirty();
    salesOrderLineArray.markAsTouched();
    this.table.renderRows();
  }

  // Get sales Order Data for Edit
  private getSalesOrder(id: number) {
    this.isLoading = true;
    this.salesOrderService.getSalesOrderById(id).subscribe((res: IApiResponse<ISalesOrder>) => {
      if (!res) {
        return
      }
      this.salesOrderModel = res.result
      this.editSalesOrder(this.salesOrderModel)
      this.isLoading = false;
    });
  }

  // Edit sales Order
  editSalesOrder(salesOrder: ISalesOrder) {
    this.salesOrderForm.patchValue({
      customerName: salesOrder.customerId,
      salesOrderDate: salesOrder.soDate,
      dueDate: salesOrder.dueDate,
      contactNo: salesOrder.contact
    });

    this.salesOrderForm.setControl('salesOrderLines', this.editSalesOrderLines(salesOrder.salesOrderLines));
    this.totalCalculation();
  }

  // Edit sales Order Lines
  editSalesOrderLines(salesOrderLines: ISalesOrderLines[]): FormArray {
    const formArray = new FormArray([]);
    salesOrderLines.forEach((line: any) => {
      formArray.push(this.fb.group({
        id: line.id,
        itemId: [line.itemId, [Validators.required]],
        description: [line.description, this.vs.TEXT({ required: 0 })],
        price: [line.price, this.vs.AMOUNT({ min: 1 })],
        quantity: [line.quantity, this.vs.AMOUNT({ min: 1 })],
        tax: [line.tax, this.vs.AMOUNT({ max: 100 })],
        subTotal: [{ value: line.subtotal, disabled: true }],
        accountId: [line.accountId, Validators.required],
        locationId: [line.locationId, Validators.required],
      }))
    })
    return formArray
  }

  // Submit Form Function
  onSubmit(): void {
    if (this.salesOrderForm.get('salesOrderLines').invalid) {
      this.salesOrderForm.get('salesOrderLines').markAllAsTouched();
    }
    const controls = this.salesOrderForm.controls.salesOrderLines as FormArray;
    if (controls.length == 0) {
      this.toastService.error('Please add sales order lines', 'Error')
      return;
    }
    if (this.salesOrderForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.mapFormValuesToSalesOrderModel();
    if (this.salesOrderModel.id) {
      this.salesOrderService.updateSalesOrder(this.salesOrderModel)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((res: IApiResponse<ISalesOrder>) => {
          this.toastService.success('' + res.message, 'Sales Order')
          this.cdRef.detectChanges();
          this.router.navigate(['/' + SALES_ORDER.ID_BASED_ROUTE('details', this.salesOrderModel.id)]);
          this.salesOrderForm.reset();
        },
          (err) => {
            this.toastService.error(`${err.error.message || 'Something went wrong, please try again later.'}`, 'Error Updating');
            this.isLoading = false;
            this.cdRef.detectChanges();
          })
    } else {
      delete this.salesOrderModel.id;
      this.salesOrderService.createSalesOrder(this.salesOrderModel)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe((res: IApiResponse<ISalesOrder>) => {
          this.toastService.success('' + res.message, 'Sales Order')
          this.router.navigate(['/' + SALES_ORDER.LIST])
          this.salesOrderForm.reset();
        },
          (err) => {
            this.isLoading = false;
            this.cdRef.detectChanges();
            this.toastService.error(`${err.error.message || 'Something went wrong, please try again later.'}`, 'Error Creating')
          }
        );
    }
  }

  // Mapping value to model
  mapFormValuesToSalesOrderModel() {
    this.salesOrderModel.customerId = this.salesOrderForm.value.customerName;
    this.salesOrderModel.soDate = this.transformDate(this.salesOrderForm.value.salesOrderDate, 'yyyy-MM-dd');
    this.salesOrderModel.dueDate = this.transformDate(this.salesOrderForm.value.dueDate, 'yyyy-MM-dd');
    this.salesOrderModel.contact = this.salesOrderForm.value.contactNo;
    this.salesOrderModel.salesOrderLines = this.salesOrderForm.value.salesOrderLines
  }

  // open business partner dialog
  openBusinessPartnerDialog() {
    if (this.permission.isGranted(this.permissions.BUSINESSPARTNER_CREATE)) {
      this.addButtonService.openBuinessPartnerDialog();
    }
  }

  // open product dialog
  openProductDialog() {
    if (this.permission.isGranted(this.permissions.PRODUCT_CREATE)) {
      this.addButtonService.openProductDialog();
    }
  }

  // open warehouse Location dialog
  openLocationDialog() {
    if (this.permission.isGranted(this.permissions.LOCATION_CREATE)) {
      this.addButtonService.openLocationDialog();
    }
  }

  @ViewChild('formDirective') private formDirective: NgForm;

  // Form Reset
  reset() {
    this.formDirective.resetForm();
    this.totalTax = 0;
    this.totalBeforeTax = 0;
    this.grandTotal = 0;
  }
  canDeactivate(): boolean | Observable<boolean> {
    return !this.salesOrderForm.dirty;
  }
}
