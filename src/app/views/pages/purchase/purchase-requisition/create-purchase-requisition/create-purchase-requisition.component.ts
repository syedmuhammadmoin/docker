import { PURCHASE_ORDER, PURCHASE_REQUISITION } from '../../../../shared/AppRoutes';
import { NgxsCustomService } from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, NgForm, Validators } from '@angular/forms';
import { IPurchaseRequisition } from '../model/IPurchaseRequisition';
import { finalize, take } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { AddModalButtonService } from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import { Observable } from 'rxjs';
import { IProduct } from '../../../profiling/product/model/IProduct';
import { ProductService } from '../../../profiling/product/service/product.service';
import { RequireMatch } from 'src/app/views/shared/requireMatch';

@Component({
  selector: 'kt-create-purchase-order',
  templateUrl: './create-purchase-requisition.component.html',
  styleUrls: ['./create-purchase-requisition.component.scss'],
  providers: [NgxsCustomService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreatePurchaseRequisitionComponent extends AppComponentBase implements OnInit {
  formName = 'Create'
  // For Loading
  isLoading: boolean;
  // for sales Order Data
  salesOrderMaster: any;
  // Declaring form variable
  purchaseOrderForm: FormGroup;
  // For Table Columns
  displayedColumns = ['itemId', 'description', 'quantity', 'action'];
  // Getting Table by id
  @ViewChild('table', { static: true }) table: any;
  // purchaseOrderModel
  purchaseOrderModel: IPurchaseRequisition;
  // For DropDown
  salesItem: IProduct[] = [];
  isPurchaseOrder: any;
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
    vendorName: {
      required: 'Name is required'
    },
    requisitionDate: {
      required: 'Requisition Date is required'
    },
  }
  formErrors = {
    vendorName: '',
    requisitionDate: '',
  }
  @ViewChild('formDirective') private formDirective: NgForm;

  // Injecting Dependencies
  constructor(
    public productService: ProductService,
    public addButtonService: AddModalButtonService,
    public ngxsService: NgxsCustomService,
    public injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.purchaseOrderForm = this.fb.group({
      vendorName: ['', [Validators.required]],
      requisitionDate: ['', [Validators.required]],
      purchaseOrderLines: this.fb.array([
        this.addPurchaseOrderLines()
      ])
    });

    this.purchaseOrderModel = {
      id: null,
      vendorId: null,
      requisitionDate: null,
      requisitionLines: []
    }

    // get Vendor from state
    this.ngxsService.getBusinessPartnerFromState();
    // get Accounts of level 4 from state
    this.ngxsService.getAccountLevel4FromState()
    // get Ware house location from state
    this.ngxsService.getLocationFromState();
    // get item from state
    this.ngxsService.getProductFromState();

    // get id by using route
    this.activatedRoute.queryParams.subscribe((param) => {
      const id = param.q;
      this.isPurchaseOrder = param.isPurchaseOrder;
      if (id && this.isPurchaseOrder) {
        this.formName = 'Edit'
        this.getPurchaseOrder(id);
        // this.getSalesOrder(id);
      }
    })

    this.productService.getProducts().subscribe(res => this.salesItem = res.result)

    // handling dueDate logic
    /*this.purchaseOrderForm.get('PODate').valueChanges.subscribe((value) => {
      this.minDate = new Date(value);
      this.dateCondition = this.purchaseOrderForm.get('dueDate').value < this.purchaseOrderForm.get('PODate').value
    })*/
  }

  // Form Reset
  reset() {
    this.formDirective.resetForm();
    this.totalTax = 0;
    this.totalBeforeTax = 0;
    this.grandTotal = 0;
  }

  // OnItemSelected
  onItemSelected(itemId: number, index: number) {
    const arrayControl = this.purchaseOrderForm.get('purchaseOrderLines') as FormArray;
    if (itemId) {
      const cost = this.salesItem.find(i => i.id === itemId).cost
      const salesTax = this.salesItem.find(i => i.id === itemId).salesTax
      // set values for price & tax
      arrayControl.at(index).get('cost').setValue(cost);
      arrayControl.at(index).get('tax').setValue(salesTax);
      // Calculating subtotal
      const quantity = arrayControl.at(index).get('quantity').value;
      const subTotal = (cost * quantity) + ((cost * quantity) * (salesTax / 100))
      arrayControl.at(index).get('subTotal').setValue(subTotal);
    }
  }

  // For Calculating subtotal and Quantity to Ton and vice versa Conversion
  onChangeEvent(value: any, index: number, element?: HTMLElement) {
    const arrayControl = this.purchaseOrderForm.get('purchaseOrderLines') as FormArray;
    const cost = (arrayControl.at(index).get('cost').value) !== null ? arrayControl.at(index).get('cost').value : null;
    const salesTax = (arrayControl.at(index).get('tax').value) !== null ? arrayControl.at(index).get('tax').value : null;
    const quantity = (arrayControl.at(index).get('quantity').value) !== null ? arrayControl.at(index).get('quantity').value : null;

    // calculating subTotal
    const subTotal = (cost * quantity) + ((cost * quantity) * (salesTax / 100))
    arrayControl.at(index).get('subTotal').setValue(subTotal);
    this.totalCalculation();
  }

  // Calculations
  // Calculate Total Before Tax ,Total Tax , grandTotal
  totalCalculation() {
    this.totalTax = 0;
    this.totalBeforeTax = 0;
    this.grandTotal = 0;
    const arrayControl = this.purchaseOrderForm.get('purchaseOrderLines') as FormArray;
    arrayControl.controls.forEach((element, index) => {
      const cost = arrayControl.at(index).get('cost').value;
      const tax = arrayControl.at(index).get('tax').value;
      const quantity = arrayControl.at(index).get('quantity').value;
      this.totalTax += ((cost * quantity) * tax) / 100
      this.totalBeforeTax += cost * quantity;
      this.grandTotal += Number(arrayControl.at(index).get('subTotal').value);
    });
  }

  // Add purchase Order line
  addPurchaseOrderLineClick(): void {
    const controls = this.purchaseOrderForm.controls.purchaseOrderLines as FormArray;
    controls.push(this.addPurchaseOrderLines());
    this.table.renderRows();
  }

  addPurchaseOrderLines(): FormGroup {
    return this.fb.group({
      itemId: ['', [Validators.required, RequireMatch]],
      description: ['', [this.vs.TEXT()]],
      quantity: ['', [this.vs.AMOUNT({ min: 1 })]],
    });
  }

  // Remove purchase Order line
  removePurchaseOrderLineClick(purchaseOrderLineIndex: number): void {
    const vendorBillArray = this.purchaseOrderForm.get('purchaseOrderLines') as FormArray;
    vendorBillArray.removeAt(purchaseOrderLineIndex);
    vendorBillArray.markAsDirty();
    vendorBillArray.markAsTouched();
    this.table.renderRows();
  }

  // Edit purchase Order
  editPurchaseOrder(purchaseOrder: any) {
    this.purchaseOrderForm.patchValue({
      vendorName: purchaseOrder.vendorId,
      PODate: purchaseOrder.poDate,
      dueDate: purchaseOrder.dueDate,
      contact: purchaseOrder.contact
      // purchaseOrderLines: purchaseOrder.purchaseOrderLines
    });

    this.purchaseOrderForm.setControl('purchaseOrderLines', this.editPurchaseOrderLines(purchaseOrder.requisitionLines));
    this.totalCalculation();
  }

  // Edit purchase Order Lines
  editPurchaseOrderLines(purchaseOrderLines: any): FormArray {
    const formArray = new FormArray([]);
    purchaseOrderLines.forEach((line: any) => {
      formArray.push(this.fb.group({
        id: [line.id],
        itemId: [line.itemId, Validators.required],
        description: [line.description, this.vs.TEXT({ required: 0 })],
        quantity: [line.quantity, this.vs.AMOUNT({ min: 1 })],
      }))
    })
    return formArray
  }

  // Submit Form Function
  onSubmit(): void {
    if (this.purchaseOrderForm.get('purchaseOrderLines').invalid) {
      this.purchaseOrderForm.get('purchaseOrderLines').markAllAsTouched();
    }
    const controls = this.purchaseOrderForm.controls.purchaseOrderLines as FormArray;
    if (controls.length === 0) {
      this.toastService.error('Please add purchase order lines', 'Error')
      return;
    }
    if (this.purchaseOrderForm.invalid) {
      return;
    }

    this.mapFormValuesToPurchaseOrderModel();
    if (this.purchaseOrderModel.id) {
      this.isLoading = true;
      this.purchaseRequisitionService.updateRequisitionOrder(this.purchaseOrderModel)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((res) => {
          this.toastService.success('Created Successfully', 'Requisition')
          this.cdRef.detectChanges();
          this.router.navigate(['/' + PURCHASE_ORDER.ID_BASED_ROUTE('details', this.purchaseOrderModel.id)]);
        },
          (err) => {
            this.toastService.error(`${err.error.message || 'Something went wrong, please try again later.'}`, 'Error Updating');
            this.isLoading = false;
            this.cdRef.detectChanges()
          })
    } else {
      delete this.purchaseOrderModel.id;
      this.isLoading = true;
      this.purchaseRequisitionService.createRequisitionOrder(this.purchaseOrderModel)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(
          (res) => {
            this.toastService.success('Created Successfully', 'Requisition')
            this.router.navigate(['/' + PURCHASE_REQUISITION.LIST])
          },
          (err: any) => {
            this.isLoading = false;
            this.cdRef.detectChanges();
            this.toastService.error(`${err.error.message || 'Something went wrong, please try again later.'}`, 'Error Creating')
          }
        );
    }
  }

  // for save or submit
  isSubmit(val: number) {
    this.purchaseOrderModel.isSubmit = (val !== 0);
  }

  // Mapping value to model
  mapFormValuesToPurchaseOrderModel() {
    this.purchaseOrderModel.vendorId = this.purchaseOrderForm.value.vendorName;
    this.purchaseOrderModel.requisitionDate = this.transformDate(this.purchaseOrderForm.value.requisitionDate, 'yyyy-MM-dd');
    this.purchaseOrderModel.requisitionLines = this.purchaseOrderForm.value.purchaseOrderLines;
  };

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

  canDeactivate(): boolean | Observable<boolean> {
    return !this.purchaseOrderForm.dirty;
  }

  // Get purchase Order Data for Edit
  private getPurchaseOrder(id: any) {
    this.isLoading = true;
    this.purchaseRequisitionService.getRequisitionMasterById(id).subscribe((res) => {
      if (!res) {
        return
      }
      this.purchaseOrderModel = res.result
      this.editPurchaseOrder(this.purchaseOrderModel)
      this.isLoading = false;
    });
  }
}
