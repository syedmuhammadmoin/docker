import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { IDispatchNote } from '../model/IDispatchNote'
import { FormArray, FormGroup, NgForm, Validators } from '@angular/forms';
import { RequireMatch as RequireMatch } from 'src/app/views/shared/requireMatch';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { finalize, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DISPATCH_NOTE } from 'src/app/views/shared/AppRoutes';
import { NgxsCustomService } from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';

@Component({
  selector: 'kt-create-dispatch-note',
  templateUrl: './create-dispatch-note.component.html',
  styleUrls: ['./create-dispatch-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgxsCustomService]
})

export class CreateDispatchNoteComponent extends AppComponentBase implements OnInit {

  // Mapping value to model
  titleName = 'Create';

  // for Loading
  isLoading: boolean;

  // Declaring form variable
  dispatchNoteForm: FormGroup;

  // Dispatch Note Model
  gdnModel: IDispatchNote

  // For Table Columns
  //  displayedColumns = ['itemId', 'description', 'quantity','ton', 'locationId', 'action']
  displayedColumns = ['itemId', 'description', 'quantity', 'locationId', 'action']

  // Getting Table by id
  @ViewChild('table', { static: true }) table: any;

  // param to get GDN Data
  isSalesOrder: any;
  isGDN: any;
  salesOrderMaster: any;

  // validation messages
  validationMessages = {
    customerName: {
      required: 'Customer Name is required'
    },
    docDate: {
      required: 'Date is required'
    },
  }

  // Error Keys
  formErrors = {
    customerName: '',
    docDate: '',
  }
  @ViewChild('formDirective') private formDirective: NgForm;

  // Injecting dependencies
  constructor(
    public ngxService: NgxsCustomService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {

    this.dispatchNoteForm = this.fb.group({
      customerName: [{ value: '', disabled: true }, Validators.required],
      docDate: [null, [Validators.required]],
      dispatchNoteLines: this.fb.array([
        this.addDispatchNoteLines()
      ])
    });

    this.gdnModel = {
      id: null,
      customerId: null,
      docDate: null,
      goodsDispatchNoteLines: []
    }

    this.activatedRoute.queryParams.subscribe((param) => {
      const id = param.q;
      this.isGDN = param.isGDN;
      this.isSalesOrder = param.isSalesOrder;
      if (id && this.isSalesOrder) {
        this.getSalesOrder(id);
      } else if (id && this.isGDN) {
        this.titleName = 'Edit'
        this.getGDN(id);
      }
    })

    this.ngxService.getLocationFromState();
    this.ngxService.getBusinessPartnerFromState();
    this.ngxService.getProductFromState();
  }

  // Add Dispatch Note Line
  addDispatchNoteLineClick(): void {
    const controls = this.dispatchNoteForm.controls.dispatchNoteLines as FormArray;
    controls.push(this.addDispatchNoteLines());
    this.table.renderRows();
  }
  // TODO: NOT IN ROUTING
  addDispatchNoteLines(): FormGroup {
    return this.fb.group({
      itemId: [''],
      description: ['', [this.vs.TEXT({ required: 0 })]],
      quantity: ['', [this.vs.AMOUNT()]],
      locationId: ['', [RequireMatch, Validators.required]],
    });
  }

  // Remove Dispatch Note Lines
  removeDispatchNoteLineClick(dispatchNoteLineIndex: number): void {
    const dispatchNoteLineArray = this.dispatchNoteForm.get('dispatchNoteLines') as FormArray;
    dispatchNoteLineArray.removeAt(dispatchNoteLineIndex);
    dispatchNoteLineArray.markAsDirty();
    dispatchNoteLineArray.markAsTouched();
    this.table.renderRows();
  }

  // Patch GDN Form through GDN Or sales Order Master Data
  patchGDN(data: any) {
    this.dispatchNoteForm.patchValue({
      customerName: data.customerId,
      docDate: (data.docDate) ? data.docDate : data.salesOrderDate,
    });

    this.dispatchNoteForm.setControl('dispatchNoteLines', this.patchGDNLines((this.salesOrderMaster) ? data.salesOrderLines : data.goodsDispatchNoteLines))
  }

  // Get GDN Data for Edit
  private getGDN(id: any) {
    this.isLoading = true;
    this.dispatchNoteService.getDispatchNoteMasterById(id).subscribe((res) => {
      if (!res) {
        return
      }
      this.gdnModel = res.result
      this.patchGDN(this.gdnModel)
      this.isLoading = false;
    });
  }

  // Patch GDN Lines From sales Order Or GDN Master Data
  patchGDNLines(Lines: any): FormArray {
    const formArray = new FormArray([]);
    Lines.forEach((line: any) => {
      formArray.push(this.fb.group({
        id: [line.id],
        itemId: [line.itemId],
        description: [line.description, [this.vs.TEXT({ required: 0 })]],
        quantity: [line.quantity, [Validators.min(1), Validators.max(line.quantity)]],
        locationId: [line.locationId],
      }))
    })
    return formArray
  }

  // Form Reset
  reset() {
    this.formDirective.resetForm();
    const dispatchNoteLineArray = this.dispatchNoteForm.get('dispatchNoteLines') as FormArray;
    dispatchNoteLineArray.clear();
    this.table.renderRows();
  }

  // Submit Dispatch Note Form
  onSubmit(): void {

    if (this.dispatchNoteForm.get('dispatchNoteLines').invalid) {
      this.dispatchNoteForm.get('dispatchNoteLines').markAllAsTouched();
    }
    const controls = this.dispatchNoteForm.controls.dispatchNoteLines as FormArray;
    if (controls.length == 0) {
      this.toastService.error('Please add goods dispatch note lines', 'Error')
      return;
    }
    if (this.dispatchNoteForm.invalid) {
      return;
    }

    this.mapFormValuesToDispatchNoteModel();
    if (this.gdnModel.id && this.isGDN) {
      this.isLoading = true;
      this.dispatchNoteService.updateGDN(this.gdnModel)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((res) => {
          this.toastService.success('Updated Successfully', 'Goods Dispatch Note')
          this.cdRef.detectChanges();
          this.router.navigate(['/' + DISPATCH_NOTE.ID_BASED_ROUTE('details', this.gdnModel.id)]);
        },
          (err) => {
            this.toastService.error(`${err.error.message || 'Something went wrong, please try again later.'}`, 'Error Updating');
            this.isLoading = false;
            this.cdRef.detectChanges()
          })
    } else if (this.salesOrderMaster.id && this.isSalesOrder) {
      delete this.gdnModel.id;
      this.isLoading = true;
      this.dispatchNoteService.createDispatchNote(this.gdnModel)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(
          (res) => {
            this.toastService.success('Created Successfully', 'Goods Dispatch Note')
            this.router.navigate(['/' + DISPATCH_NOTE.ID_BASED_ROUTE('details', res.result.id)]);
          },
          (err: any) => {
            this.isLoading = false;
            this.cdRef.detectChanges();
            this.toastService.error(`${err.error.message || 'Something went wrong, please try again later.'}`, 'Error Creating')
          }
        );
    }
  }

  mapFormValuesToDispatchNoteModel() {
    this.gdnModel.customerId = this.salesOrderMaster?.customerId || this.gdnModel?.customerId;
    this.gdnModel.docDate = this.transformDate(this.dispatchNoteForm.value.docDate, 'yyyy-MM-dd');
    this.gdnModel.goodsDispatchNoteLines = this.dispatchNoteForm.value.dispatchNoteLines.map(x => {
      delete x.id;
      x.price = 1;
      return x
    });
  }

  isSubmit(value: number) {
    this.gdnModel.isSubmit = value !== 0
  }

  canDeactivate(): boolean | Observable<boolean> {
    return !this.dispatchNoteForm.dirty;
  }

  // Get sales Order Master Data
  private getSalesOrder(id: number) {
    this.isLoading = true;
    this.salesOrderService.getSalesOrderById(id).subscribe((res) => {
      this.salesOrderMaster = res.result
      this.patchGDN(this.salesOrderMaster);
      this.isLoading = false;
    }, (err) => {
    });
  }
}
