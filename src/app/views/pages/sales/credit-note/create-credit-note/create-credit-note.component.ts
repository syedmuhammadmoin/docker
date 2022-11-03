import {NgxsCustomService} from '../../../../shared/services/ngxs-service/ngxs-custom.service';
import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormGroup, NgForm, Validators} from '@angular/forms';

import {IProduct} from '../../../profiling/product/model/IProduct';
import {ICreditNote} from '../model/ICreditNote';
import {finalize, take} from 'rxjs/operators';
import {Params} from '@angular/router';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {ProductService} from '../../../profiling/product/service/product.service';
import {AddModalButtonService} from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import {Observable} from 'rxjs';
import {CREDIT_NOTE} from 'src/app/views/shared/AppRoutes';
import {IInvoice} from '../../invoice/model/IInvoice';
import {ICreditNoteLines} from '../model/ICreditNoteLines';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {IInvoiceLines} from '../../invoice/model/IInvoiceLines';

@Component({
  selector: 'kt-create-credit-note',
  templateUrl: './create-credit-note.component.html',
  styleUrls: ['./create-credit-note.component.scss'],
  providers: [NgxsCustomService]
})

export class CreateCreditNoteComponent extends AppComponentBase implements OnInit {

  titleName = 'Create'
  //for resetting form

  @ViewChild('formDirective') private formDirective: NgForm;
  // kt busy for loading
  isLoading: boolean

  // Declaring form variable
  creditNoteForm: FormGroup;

  // For Table Columns
  displayedColumns = ['itemId', 'description', 'accountId', 'quantity', 'price', 'tax', 'subTotal', 'locationId', 'action']

  // Getting Table by id
  @ViewChild('table', { static: true }) table: any;

  // Credit Note Model
  creditNoteModel: ICreditNote;

  // For DropDown
  salesItem: IProduct[]

  isCreditNote: boolean;

  // sales Order Data
  salesOrderMaster: any;

  // param to get invoice
  isInvoice: boolean;
  invoiceMaster: any;

  // variables for calculation
  grandTotal = 0;
  totalBeforeTax = 0;
  totalTax = 0;

  // Validation messages..
  validationMessages = {
    customerName: {
      required: 'Customer Name is required.',
    },
    salesPerson: {
      required: 'sales Person is required.',
    },
    noteDate: {
      required: 'Note Date is required.',
    }
  };

  // error keys..
  formErrors = {
    customerName: '',
    noteDate: '',
  };

  // Injecting in dependencies in constructor
  constructor(
    public productService: ProductService,
    public addButtonService: AddModalButtonService,
    public ngxsService: NgxsCustomService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {

    // Creating Forms
    this.creditNoteForm = this.fb.group({
      customerName: ['', [Validators.required]],
      noteDate: ['', [Validators.required]],
      creditNoteLines: this.fb.array([
        this.addCreditNoteLines()
      ])
    });

    this.creditNoteModel = {
      id: null,
      customerId: null,
      noteDate: null,
      documentLedgerId: null,
      creditNoteLines: []
    };


    this.ngxsService.getBusinessPartnerFromState();
    this.ngxsService.getAccountLevel4FromState()
    this.ngxsService.getWarehouseFromState();
    this.ngxsService.getProductFromState();
    this.ngxsService.getLocationFromState();

    this.activatedRoute.queryParams.subscribe((param: Params) => {
      const id = param.q;
      this.isCreditNote = param.isCreditNote;
      this.isInvoice = param.isInvoice;
      if (id && this.isCreditNote) {
        this.titleName = 'Edit'
        this.isLoading = true;
        this.getCreditNote(id);
      } else if (id && this.isInvoice) {
        this.getInvoice(id);
      }
    })

    this.ngxsService.products$.subscribe((res: any) => this.salesItem = res)
  }

  // Form Reset
  reset() {
    this.formDirective.resetForm()
    this.totalTax = 0;
    this.totalBeforeTax = 0;
    this.grandTotal = 0;
    // const creditNoteLineArray = this.creditNoteForm.get('creditNoteLines') as FormArray;
    // creditNoteLineArray.clear();
    // this.table.renderRows();
  }

  // OnItemSelected
  onItemSelected(itemId: number, index: number) {
    let arrayControl = this.creditNoteForm.get('creditNoteLines') as FormArray;
    if (itemId) {
      let price = this.salesItem.find(i => i.id === itemId).salesPrice
      let tax = this.salesItem.find(i => i.id === itemId).salesTax
      // set values for price & tax
      arrayControl.at(index).get('price').setValue(price);
      arrayControl.at(index).get('tax').setValue(tax);
      // Calculating subtotal
      let quantity = arrayControl.at(index).get('quantity').value;
      let subTotal = (price * quantity) + ((price * quantity) * (tax / 100))
      arrayControl.at(index).get('subTotal').setValue(subTotal);
    }
  }

  // For Calculating subtotal
  onChangeEvent(value: unknown, index: number, element?: HTMLElement) {

    const arrayControl = this.creditNoteForm.get('creditNoteLines') as FormArray;
    const price = (arrayControl.at(index).get('price').value) !== null ? arrayControl.at(index).get('price').value : null;
    const tax = (arrayControl.at(index).get('tax').value) !== null ? arrayControl.at(index).get('tax').value : null;
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
    let arrayControl = this.creditNoteForm.get('creditNoteLines') as FormArray;
    arrayControl.controls.forEach((element, index) => {
      let price = arrayControl.at(index).get('price').value;
      let tax = arrayControl.at(index).get('tax').value;
      let quantity = arrayControl.at(index).get('quantity').value;
      this.totalTax += ((price * quantity) * tax) / 100
      this.totalBeforeTax += price * quantity;
      this.grandTotal += Number(arrayControl.at(index).get('subTotal').value);
    });
  }

  // Add Credit Note Line
  addCreditNoteLineClick(): void {
    const controls = this.creditNoteForm.controls.creditNoteLines as FormArray;
    controls.push(this.addCreditNoteLines());
    this.table.renderRows();
  }

  // Add Credit Note Lines
  addCreditNoteLines(): FormGroup {
    return this.fb.group({
      itemId: [null],
      description: ['', [this.vs.TEXT()]],
      price: [0, [this.vs.AMOUNT({min: 1})]],
      quantity: [0,  [this.vs.AMOUNT({min: 1})]],
      tax: [0,  [this.vs.AMOUNT({max: 100})]],
      subTotal: [{ value: '0', disabled: true }],
      accountId: ['', [Validators.required]],
      locationId: [null],
    });
  }

  // Remove Credit Note Line
  removeCreditNoteLineClick(creditNoteLineIndex: number): void {
    const creditNoteLineArray = this.creditNoteForm.get('creditNoteLines') as FormArray;
    creditNoteLineArray.removeAt(creditNoteLineIndex);
    creditNoteLineArray.markAsDirty();
    creditNoteLineArray.markAsTouched();
    this.table.renderRows();
  }

  // Get Invoice Master Data
  private getInvoice(id: number) {
    this.isLoading = true;
    this.invoiceService.getInvoiceById(id).subscribe((res: IApiResponse<IInvoice>) => {
      this.invoiceMaster = res.result
      this.creditNoteModel.documentLedgerId = this.invoiceMaster.ledgerId;
      this.patchCreditNote(this.invoiceMaster);
      this.isLoading = false;
    })
  }

  // Get Credit Note Master Data
  private getCreditNote(id: number) {
    this.isLoading = true;
    this.creditNoteService.getCreditNoteById(id).subscribe((res) => {
      if (!res) return
      this.creditNoteModel = res.result
      this.patchCreditNote(this.creditNoteModel)
      this.isLoading = false;
    });
  }

  // Patch Credit Note Form through Credit Note Or Invoice Master Data
  patchCreditNote(data: any) {
    this.creditNoteForm.patchValue({
      customerName: data.customerId,
      noteDate: (data.noteDate) ? data.noteDate : data.invoiceDate,
    });

    this.creditNoteForm.setControl('creditNoteLines', this.patchCreditNoteLines((this.invoiceMaster) ? data.invoiceLines : data.creditNoteLines))
    this.totalCalculation();
  }

  // Patch Credit Note Lines From Invoice Or Credit Note Master Data
  patchCreditNoteLines(Lines: ICreditNoteLines[] | IInvoiceLines[]): FormArray {
    const formArray = new FormArray([]);
    Lines.forEach((line: any) => {
      formArray.push(this.fb.group({
        id: line.id,
        itemId: line.itemId || null,
        description: [line.description, [Validators.required]],
        price: [line.price, [Validators.required, Validators.min(1)]],
        quantity: [line.quantity, [Validators.required, Validators.min(1)]],
        tax: [line.tax, [Validators.max(100), Validators.min(0)]],
        subTotal: [{ value: line.subTotal, disabled: true }],
        accountId: [line.accountId, [Validators.required]],
        locationId: line.locationId || null,
      }))
    })
    return formArray
  }

  // Submit Form Function
  onSubmit(): void {

    if (this.creditNoteForm.get('creditNoteLines').invalid) {
      this.creditNoteForm.get('creditNoteLines').markAllAsTouched();
    }
    const controls = this.creditNoteForm.controls.creditNoteLines as FormArray;
    if (controls.length == 0) {
      this.toastService.error('Please add credit note lines', 'Error')
      return;
    }
    if (this.isInvoice && (this.grandTotal > this.invoiceMaster.pendingAmount)) {
      this.toastService.error('Total Amount can\'t be Greater than Invoice Amount', 'Error')
      return;
    }
    if (this.creditNoteForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.mapFormValuesToCreditNoteModel();
    if (this.creditNoteModel.id) {
      this.creditNoteService.updateCreditNote(this.creditNoteModel)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((res: IApiResponse<ICreditNote>) => {
          this.toastService.success('Updated Successfully', 'Credit Note')
          this.cdRef.detectChanges();
          this.creditNoteForm.reset();
          this.router.navigate(['/' + CREDIT_NOTE.ID_BASED_ROUTE('details', this.creditNoteModel.id)]);
        },
          (err) => {
            this.isLoading = false;
            this.cdRef.detectChanges();
          })
    } else {
      delete this.creditNoteModel.id;
      this.creditNoteModel.creditNoteLines.map((x) => {
        delete x.id;
        return x
      })
      this.creditNoteService.createCreditNote(this.creditNoteModel)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe((res: IApiResponse<ICreditNote>) => {
          this.toastService.success('Created Successfully', 'Credit Note')
          this.creditNoteForm.reset();
          this.router.navigate(['/' + CREDIT_NOTE.LIST])
        },
          (err) => {
            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        );
    }

  }

  // Mapping value to model
  mapFormValuesToCreditNoteModel() {
    this.creditNoteModel.customerId = this.creditNoteForm.value.customerName;
    this.creditNoteModel.noteDate = this.transformDate(this.creditNoteForm.value.noteDate, 'yyyy-MM-dd');
    this.creditNoteModel.creditNoteLines = this.creditNoteForm.value.creditNoteLines
      .map((x) => {
        x.price = Number(x.price);
        return x
      });
    // if (this.isInvoice) { this.creditNoteModel.invoiceTransactionId = this.invoiceMaster.transactionId; }
  }

  // for save or submit
  isSubmit(val: number) {
    this.creditNoteModel.isSubmit = (val === 0) ? false : true;
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
    return !this.creditNoteForm.dirty;
  }
}

