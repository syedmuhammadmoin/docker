import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, NgForm, Validators } from '@angular/forms';
import { IProduct } from '../../../profiling/product/model/IProduct';
import { IGRN } from '../model/IGRN';
import { finalize, take } from 'rxjs/operators';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { Observable } from 'rxjs';
import { GOODS_RECEIVED_NOTE } from 'src/app/views/shared/AppRoutes';
import { AddModalButtonService } from '../../../../shared/services/add-modal-button/add-modal-button.service';
import { NgxsCustomService } from '../../../../shared/services/ngxs-service/ngxs-custom.service';

@Component({
  selector: 'kt-create-grn',
  templateUrl: './create-grn.component.html',
  styleUrls: ['./create-grn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgxsCustomService]
})

export class CreateGrnComponent extends AppComponentBase implements OnInit {
  // validation messages
  validationMessages = {
    vendorName: {
      required: 'Vendor Name is required'
    },
    grnDate: {
      required: 'Date is required'
    },
  }
  // Mapping value to model
  titleName = 'Create';

  // For Loading
  isLoading: boolean;

  vendorBillModel: any;
  isBill = false;

  // Declaring form variable
  grnForm: FormGroup;

  // For Table Columns
  displayedColumns = ['itemId', 'description', 'quantity', 'locationId', 'action']

  // Getting Table by id
  @ViewChild('table', { static: true }) table: any;

  // Goods Received NoteModel
  grnModel: IGRN;

  // param to get purchase order master
  isPurchaseOrder: any;
  purchaseOrderMaster: any;

  // for Edit
  isGRN: any;


  // For DropDown
  salesItem: IProduct[] = [];
  // Error Keys
  formErrors = {
    vendorName: '',
    grnDate: '',
    contact: '',
  }
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(
    public addButtonService: AddModalButtonService,
    public ngxsService: NgxsCustomService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {

    this.grnForm = this.fb.group({
      // vendorName: [{ value: '', disabled: true }, [Validators.required]],
      vendorName: ['', [Validators.required]],
      grnDate: ['', [Validators.required]],
      contact: ['', [this.vs.NUM()]],
      GRNLines: this.fb.array([
        this.addGRNLines()
      ])
    });

    this.grnModel = {
      id: null,
      vendorId: null,
      docDate: null,
      contact: null,
      goodsReceivingNoteLines: []
    }

    this.activatedRoute.queryParams.subscribe((param) => {
      const id = param.q;
      this.isGRN = param.isGRN;
      this.isPurchaseOrder = param.isPurchaseOrder;
      if (id && this.isPurchaseOrder) {
        this.getPurchaseOrder(id);
      } else if (id && this.isGRN) {
        this.titleName = 'Edit'
        this.getGRN(id);
      }
    })

    this.productService.getProducts().subscribe(res => this.salesItem = res.result)
    this.ngxsService.getLocationFromState();
    this.ngxsService.getBusinessPartnerFromState();
    this.ngxsService.getProductFromState();
  }

  // Form Reset
  reset() {
    this.formDirective.resetForm();
  }

  // open warehouse Location dialog
  openLocationDialog() {
    if (this.permission.isGranted(this.permissions.LOCATION_CREATE)) {
      this.addButtonService.openLocationDialog();
    }
  }

  // Add Grn Line
  addGRNLineClick(): void {
    const controls = this.grnForm.controls.GRNLines as FormArray;
    controls.push(this.addGRNLines());
    this.table.renderRows();
  }

  addGRNLines(): FormGroup {
    return this.fb.group({
      itemId: [''],
      // acccountId: ['', Validators.required],
      description: ['', [this.vs.TEXT()]],
      quantity: ['', [this.vs.AMOUNT({ min: 1 })]],
      locationId: ['', Validators.required],
    });
  }

  // Remove Grn Line
  removeGRNLineClick(grnLineIndex: number): void {
    const grnLineArray = this.grnForm.get('GRNLines') as FormArray;
    grnLineArray.removeAt(grnLineIndex);
    grnLineArray.markAsDirty();
    grnLineArray.markAsTouched();
    this.table.renderRows();
  }

  // Patch GRN Form through GRN Or purchase Order Master Data
  patchGRN(data: any) {
    this.grnForm.patchValue({
      vendorName: data.vendorId,
      grnDate: (data.grnDate) ? data.grnDate : data.poDate,
      contact: data.contact
    });

    this.grnForm.setControl('GRNLines', this.patchGRNLines((this.purchaseOrderMaster) ? data.purchaseOrderLines : data.goodsReceivingNoteLines))
  }

  // Get GRN Data for Edit
  private getGRN(id: any) {
    this.isLoading = true;
    this.grnService.getGRNMasterById(id).subscribe((res) => {
      if (!res) return
      this.grnModel = res.result
      this.patchGRN(this.grnModel)
      this.isLoading = false;
    });
  }

  // Patch GRN Lines From purchase Order Or GRN Master Data
  patchGRNLines(Lines: any): FormArray {

    const formArray = new FormArray([]);
    Lines.forEach((line: any) => {
      formArray.push(this.fb.group({
        id: line.id,
        itemId: line.itemId,
        description: [line.description, this.vs.TEXT({ required: 0 })],
        quantity: [line.quantity, [this.vs.AMOUNT({ min: 1 })]],
        locationId: [line.locationId, Validators.required],
      }))
    })
    return formArray
  }

  mapFormValuesToGRNModel() {
    this.grnModel.vendorId = this.purchaseOrderMaster?.vendorId || this.grnForm.value.vendorName;
    this.grnModel.docDate = this.transformDate(this.grnForm.value.grnDate, 'yyyy-MM-dd');
    this.grnModel.contact = this.grnForm.value.contact;
    this.grnModel.goodsReceivingNoteLines = this.grnForm.value.GRNLines.map((x) => {
      delete x.id;
      return x;
    });
  }

  // Submit GRN Form
  onSubmit(): void {
    this.grnForm.get('GRNLines').markAllAsTouched();
    if (this.grnForm.get('GRNLines').invalid) {
    }
    const controls = this.grnForm.controls.GRNLines as FormArray;
    if (controls.length == 0) {
        this.toastService.error('Please add goods received note lines', 'Error')
      return;
    }
    if (this.grnForm.invalid) {
      return
    }

    this.mapFormValuesToGRNModel();
    if (this.grnModel.id && this.isGRN) {
      this.isLoading = true;
      this.grnService.updateGRN(this.grnModel)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((res) => {
          this.toastService.success('' + res.message, 'GRN')
          this.cdRef.detectChanges();
          this.router.navigate(['/' + GOODS_RECEIVED_NOTE.ID_BASED_ROUTE('details', this.grnModel.id)]);
        },
          (err) => {
            this.toastService.error(`${err.error.message || 'Something went wrong, please try again later.'}`, 'Error Updating');
            this.isLoading = false;
            this.cdRef.detectChanges()
          })
    } else if (this.purchaseOrderMaster.id && this.isPurchaseOrder) {
      delete this.grnModel.id;
      this.isLoading = true;
      this.grnService.createGRN(this.grnModel)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(
          (res) => {
            this.toastService.success('' + res.message, 'GRN')
            this.router.navigate(['/' + GOODS_RECEIVED_NOTE.LIST])
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
    this.grnModel.isSubmit = (val !== 0);
  }

  canDeactivate(): boolean | Observable<boolean> {
    return !this.grnForm.dirty;
  }

  // Get purchase Order Master Data
  private getPurchaseOrder(id: number) {
    this.isLoading = true;
    this.purchaseOrderService.getPurchaseMasterById(id).subscribe((res) => {
      if (!res) return
      this.purchaseOrderMaster = res.result
      this.patchGRN(this.purchaseOrderMaster);
      this.isLoading = false;
    }, (err) => {
    });
  }
}
