import {DEBIT_NOTE} from '../../../../shared/AppRoutes';
import {NgxsCustomService} from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormGroup, NgForm, Validators} from '@angular/forms';
import {IDebitNote} from '../model/IDebitNote';
import {finalize, take} from 'rxjs/operators';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {AddModalButtonService} from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import {Observable} from 'rxjs';
import {IProduct} from '../../../profiling/product/model/IProduct';

@Component({
  selector: 'kt-create-debit-note',
  templateUrl: './create-debit-note.component.html',
  styleUrls: ['./create-debit-note.component.scss'],
  providers: [NgxsCustomService]
})

export class CreateDebitNoteComponent extends AppComponentBase implements OnInit {

  titleName = 'Create'
  // for resetting form
  @ViewChild('formDirective') private formDirective: NgForm;
  // for busy loading
  isLoading: boolean

  // Declaring form variable
  debitNoteForm: FormGroup;

  // purchase Order Data
  purchaseOrderMaster: any;

  // For Table Columns
  displayedColumns = ['itemId', 'description', 'accountId', 'quantity', 'cost', 'tax', 'subTotal', 'locationId', 'action']

  // Getting Table by id
  @ViewChild('table', { static: true }) table: any;

  // debit Note Model
  debitNoteModel: IDebitNote;

  // For DropDown
  salesItem: IProduct[];

  // Variables for Calculation
  grandTotal = 0;
  totalBeforeTax = 0;
  totalTax = 0;

  isDebitNote: any;

  // param to get bill data
  isBill: any;
  billMaster: any;

  // Validation messages..
  validationMessages = {
    vendorName: {
      required: 'Vendor Name is required.',
    },
    noteDate: {
      required: 'Note Date is required.',
    },

  };

  // error keys..
  formErrors = {
    vendorName: '',
    noteDate: '',
    // department: '',
  };

  // Injecting in dependencies in constructor
  constructor(
    public addButtonService: AddModalButtonService,
    public ngxsService: NgxsCustomService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {

    // Creating Forms
    this.debitNoteForm = this.fb.group({
      vendorName: ['', [Validators.required]],
      noteDate: ['', [Validators.required]],
      // department: ['', [Validators.required]],
      debitNoteLines: this.fb.array([
        this.addDebitNoteLines()
      ])
    });

    this.debitNoteModel = {
      id: null,
      vendorId: null,
      noteDate: null,
      // billTransactionId: null,
      debitNoteLines: []
    };

    // get vendor from state
    this.ngxsService.getBusinessPartnerFromState();
    // get Accounts of level 4 from state
    this.ngxsService.getAccountLevel4FromState()
    // get Ware house location from state
    this.ngxsService.getWarehouseFromState();
    // get item from state
    this.ngxsService.getProductFromState();
    this.ngxsService.getLocationFromState();


    // get id by using route
    this.activatedRoute.queryParams.subscribe((param) => {
      const id = param.q;
      this.isDebitNote = param.isDebitNote;
      this.isBill = param.isBill;
      if (id && this.isDebitNote) {
        this.isLoading = true
        this.titleName = 'Edit'
        this.getDebitNote(id);
      } else if (id && this.isBill) {
        this.getBill(id)
      }
    })

    this.ngxsService.products$.subscribe(res => this.salesItem = res)
  }


  // Form Reset
  reset() {
    this.formDirective.resetForm();
    this.totalTax = 0;
    this.totalBeforeTax = 0;
    this.grandTotal = 0;
    /*const debitNoteLineArray = this.debitNoteForm.get('debitNoteLines') as FormArray;
    debitNoteLineArray.clear();
    this.table.renderRows();*/
  }

  // OnItemSelected
  onItemSelected(itemId: number, index: number) {
    let arrayControl = this.debitNoteForm.get('debitNoteLines') as FormArray;
    if (itemId) {
      let cost = this.salesItem.find(i => i.id === itemId).cost
      let tax = this.salesItem.find(i => i.id === itemId).salesTax
      // set values for price & tax
      arrayControl.at(index).get('cost').setValue(cost);
      arrayControl.at(index).get('tax').setValue(tax);
      // Calculating subtotal
      let quantity = arrayControl.at(index).get('quantity').value;
      let subTotal = (cost * quantity) + ((cost * quantity) * (tax / 100))
      arrayControl.at(index).get('subTotal').setValue(subTotal);
    }
  }

  // For Calculating subtotal and Quantity to Ton and vice versa Conversion
  onChangeEvent(value: any, index: number, element?: HTMLElement) {

    const arrayControl = this.debitNoteForm.get('debitNoteLines') as FormArray;
    const cost = (arrayControl.at(index).get('cost').value) !== null ? arrayControl.at(index).get('cost').value : null;
    const tax = (arrayControl.at(index).get('tax').value) !== null ? arrayControl.at(index).get('tax').value : null;
    const quantity = (arrayControl.at(index).get('quantity').value) !== null ? arrayControl.at(index).get('quantity').value : null;

    // calculating subTotal
    const subTotal = (cost * quantity) + ((cost * quantity) * (tax / 100))
    arrayControl.at(index).get('subTotal').setValue(subTotal);
    this.totalCalculation();
  }

  // Calculations
  // Calculate Total Before Tax ,Total Tax , grandTotal
  totalCalculation() {
    this.totalTax = 0;
    this.totalBeforeTax = 0;
    this.grandTotal = 0;
    let arrayControl = this.debitNoteForm.get('debitNoteLines') as FormArray;
    arrayControl.controls.forEach((element, index) => {
      let cost = arrayControl.at(index).get('cost').value;
      let tax = arrayControl.at(index).get('tax').value;
      let quantity = arrayControl.at(index).get('quantity').value;
      this.totalTax += ((cost * quantity) * tax) / 100
      this.totalBeforeTax += cost * quantity;
      this.grandTotal += Number(arrayControl.at(index).get('subTotal').value);
    });
  }

  // Add Debit Note Line
  addDebitNoteLineClick(): void {
    const controls = this.debitNoteForm.controls.debitNoteLines as FormArray;
    controls.push(this.addDebitNoteLines());
    this.table.renderRows();
  }

  addDebitNoteLines(): FormGroup {
    return this.fb.group({
      itemId: [null],
      description: ['', [this.vs.TEXT()]],
      cost: ['', [this.vs.AMOUNT({min: 1})]],
      quantity: ['', [this.vs.AMOUNT({min: 1})]],
      tax: [0, [this.vs.AMOUNT({max:100})]],
      subTotal: [{ value: '0', disabled: true }],
      accountId: ['', [Validators.required]],
      locationId: [null],
    });
  }

  // Remove Debit Note Line
  removeDebitNoteLineClick(debitNoteLineIndex: number): void {
    const debitNoteArray = this.debitNoteForm.get('debitNoteLines') as FormArray;
    debitNoteArray.removeAt(debitNoteLineIndex);
    debitNoteArray.markAsDirty();
    debitNoteArray.markAsTouched();
    this.table.renderRows();
  }

  // Get Bill Master Data
  private getBill(id: number) {
    this.isLoading = true;
    this.billService.getVendorBillMaster(id).subscribe((res) => {
      if (!res) return
      this.billMaster = res.result
      this.debitNoteModel.documentLedgerId = this.billMaster.ledgerId;
      this.patchDebitNote(this.billMaster);
      this.isLoading = false;
    }, (err) => {
    });
  }


  // Get Debit Note Data for Edit
  private getDebitNote(id: any) {
    this.isLoading = true;
    this.debitNoteService.getDebitNoteMaster(id).subscribe((res) => {
      if (!res) return
      this.debitNoteModel = res.result
      this.patchDebitNote(this.debitNoteModel)
      this.isLoading = false;
    });
  }

  // Patch Debit Note Form through Debit Note Or Bill Master Data
  patchDebitNote(data: any) {
    this.debitNoteForm.patchValue({
      vendorName: data.vendorId,
      vendorBillRef: data.vendorBillRef,
      noteDate: (data.noteDate) ? data.noteDate : data.billDate,
    });

    this.debitNoteForm.setControl('debitNoteLines', this.patchDebitNoteLines((this.billMaster) ? data.billLines : data.debitNoteLines))
    this.totalCalculation();
  }

  // Patch Debit Note Lines From Bill Or Debit Note Master Data
  patchDebitNoteLines(Lines: any): FormArray {
    const formArray = new FormArray([]);
    Lines.forEach((line: any) => {
      formArray.push(this.fb.group({
        id: line.id,
        itemId: line.itemId || null,
        description: [line.description, [this.vs.TEXT()]],
        cost: [line.cost, [this.vs.AMOUNT({min: 1})]],
        quantity: [line.quantity, [this.vs.AMOUNT({min: 1})]],
        tax: [line.tax, [this.vs.AMOUNT({max: 100})]],
        subTotal: [{ value: line.subTotal, disabled: true }],
        accountId: [line.accountId, [this.vs.TEXT()]],
        locationId: line.locationId || null,
      }))
    })
    return formArray
  }

  // Submit Form Function
  onSubmit(): void {
    if (this.debitNoteForm.get('debitNoteLines').invalid) {
      this.debitNoteForm.get('debitNoteLines').markAllAsTouched();
    }
    const controls = this.debitNoteForm.controls.debitNoteLines as FormArray;
    if (controls.length == 0) {
      this.toastService.error('Please add debit note lines', 'Error')
      return;
    }
    if (this.isBill && (this.grandTotal > this.billMaster.pendingAmount)) {
      this.toastService.error('Total Amount can\'t be Greater than Bill Amount', 'Error')
      return;
    }
    if (this.debitNoteForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.mapFormValuesToDebitNoteModel();
    if (this.debitNoteModel.id) {
      this.debitNoteService.updateDebitNote(this.debitNoteModel)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((res) => {
          this.toastService.success('Updated Successfully', 'Debit Note')
          this.debitNoteForm.reset();
          this.cdRef.detectChanges();
          this.router.navigate(['/' + DEBIT_NOTE.ID_BASED_ROUTE('details', this.debitNoteModel.id)]);
        },
          (err) => {
            this.isLoading = false;
            this.cdRef.detectChanges()
          })
    } else {
      delete this.debitNoteModel.id;
      this.debitNoteModel.debitNoteLines.map(x => {
        delete x.id;
        return x
      })
      this.debitNoteService.createDebitNote(this.debitNoteModel)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(
          (res) => {
            this.toastService.success('Created Successfully', 'Debit Note')
            this.debitNoteForm.reset();
            this.router.navigate(['/' + DEBIT_NOTE.LIST])
          },
          (err: any) => {
            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        );
    }
  }

  // Mapping value to model
  mapFormValuesToDebitNoteModel() {
    this.debitNoteModel.vendorId = this.debitNoteForm.value.vendorName;
    this.debitNoteModel.noteDate = this.transformDate(this.debitNoteForm.value.noteDate, 'yyyy-MM-dd');
    // this.debitNoteModel.billTransactionId = null;
    this.debitNoteModel.debitNoteLines = this.debitNoteForm.value.debitNoteLines;
    // if (this.isBill) {
    //   this.debitNoteModel.billTransactionId = this.billMaster.transactionId;
    // }
  }

  // for save or submit
  isSubmit(val: number) {
    this.debitNoteModel.isSubmit = (val === 0) ? false : true;
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

  canDeactivate(): boolean | Observable<boolean> {
    return !this.debitNoteForm.dirty;
  }
}
