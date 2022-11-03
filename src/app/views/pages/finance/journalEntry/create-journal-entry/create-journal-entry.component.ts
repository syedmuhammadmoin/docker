import {NgxsCustomService} from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import {ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormGroup, NgForm, Validators} from '@angular/forms';
import {CategoryService} from '../../../profiling/category/service/category.service';
import {IJournalEntry} from '../model/IJournalEntry';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {finalize, take} from 'rxjs/operators';
import {Params} from '@angular/router';
import {BusinessPartnerService} from '../../../profiling/business-partner/service/businessPartner.service';
import {WarehouseService} from '../../../profiling/warehouse/services/warehouse.service';
import {AddModalButtonService} from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import {Observable} from 'rxjs';
import {JOURNAL_ENTRY} from 'src/app/views/shared/AppRoutes';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {IJournalEntryLines} from '../model/IJournalEntryLines';

@Component({
  selector: 'kt-create-journal-entry',
  templateUrl: './create-journal-entry.component.html',
  styleUrls: ['./create-journal-entry.component.scss'],
  providers: [NgxsCustomService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateJournalEntryComponent extends AppComponentBase implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  formName = 'Create'
  // For busy loading
  isLoading: boolean;

  // Declaring form variable
  journalEntryForm: FormGroup;

  // For Table Columns
  displayedColumns = ['accountId', 'businessPartnerId', 'description', 'debit', 'credit', 'locationId', 'action']

  // Getting Table by id
  @ViewChild('table', { static: true }) table: any;

  // JournaL Entry Model
  journalEntryModel: IJournalEntry;

  isJournalEntry: boolean;
  // variable for debit and credit sum
  debitTotal = 0;
  creditTotal = 0;

  // Validation messages
  validationMessages = {
    date: {
      required: 'Date is required.',
    },
    // description: {
    //   required: 'Description is required.',
    // },
  }

  // Error keys..
  formErrors = {
    date: '',
    // description: ''
  }

  // Injecting Dependencies
  constructor(
    public addButtonService: AddModalButtonService,
    public categoryService: CategoryService,
    public businessPartnerService: BusinessPartnerService,
    public warehouseService: WarehouseService,
    public ngxsService: NgxsCustomService,
    injector: Injector
  ) {
    super(injector)
  }


  ngOnInit() {
    this.journalEntryForm = this.fb.group({
      date: ['', [Validators.required]],
      description: ['',[this.vs.TEXT({required: 0})]],
      journalEntryLines: this.fb.array([
        this.addJournalEntryLines()
      ])
    });

    this.journalEntryModel = {
      id: null,
      date: null,
      description: '',
      journalEntryLines: [],
    }

    this.activatedRoute.queryParams.subscribe((param: Params) => {
      const id = param.q;
      this.isJournalEntry = param.isJournalEntry;
      if (id && this.isJournalEntry) {
        this.formName = 'Edit'
        this.isLoading = true
        this.getJournalEntry(id);
      }
    })
    this.ngxsService.getBusinessPartnerFromState();
    this.ngxsService.getAccountLevel4FromState();
    this.ngxsService.getWarehouseFromState();
    this.ngxsService.getLocationFromState()

    // get warehouse location list from service
    this.addButtonService.getLocationTypes();
    // this.journalEntryForm.get('description').valueChanges.subscribe(x => {
    // })
    // this.journalEntryForm.get('description').valueChanges.subscribe(x => {
    // })
  }
  doSomething(val){
  }
  // onChangeEvent to set debit or credit zero '0'
  onChangeEvent(_: unknown, index: number) {
    const arrayControl = this.journalEntryForm.get('journalEntryLines') as FormArray;
    const debitControl = arrayControl.at(index).get('debit');
    const creditControl = arrayControl.at(index).get('credit');
    const debit = (debitControl.value) !== null ? debitControl.value : null;
    const credit = (creditControl.value) !== null ? creditControl.value : null;

    if (debit > 0) {
      creditControl.setValue(0);
      creditControl.disable();
    }
    else if (credit > 0) {
      debitControl.setValue(0);
      debitControl.disable();
    }
    else if (!debit || !credit) {
      creditControl.enable();
      debitControl.enable();
    }
    this.totalCalculation();
  }

  totalCalculation() {
    this.debitTotal = 0;
    this.creditTotal = 0;
    const arrayControl = this.journalEntryForm.get('journalEntryLines') as FormArray;
    arrayControl.controls.forEach((_: unknown, index: number) => {
      const debit = arrayControl.at(index).get('debit').value;
      const credit = arrayControl.at(index).get('credit').value;
      this.debitTotal += Number(debit);
      this.creditTotal += Number(credit);
    });
  }


  // Form Reset
  reset() {
    this.formDirective.resetForm()
    this.creditTotal = this.debitTotal = 0
    const journalEntryArray = this.journalEntryForm.get('journalEntryLines') as FormArray;
    journalEntryArray.clear();
    this.addJournalEntryLineClick()
  }

  // Add journal Entry Line
  addJournalEntryLineClick(): void {
    const controls = this.journalEntryForm.controls.journalEntryLines as FormArray;
    controls.push(this.addJournalEntryLines());
    this.table.renderRows();
  }

  addJournalEntryLines(): FormGroup {
    return this.fb.group({
      accountId: ['', Validators.required],
      businessPartnerId: ['', Validators.required],
      description: ['', [this.vs.TEXT()]],
      debit: [0, [this.vs.AMOUNT()]],
      credit: [0, [this.vs.AMOUNT()]],
      locationId: [null]
    });
  }

  // Remove Journal Entry Line
  removeJournalEntryLineClick(journalEntryLineIndex: number): void {
    const journalEntryLineArray = this.journalEntryForm.get('journalEntryLines') as FormArray;
    journalEntryLineArray.removeAt(journalEntryLineIndex);
    journalEntryLineArray.markAsDirty();
    journalEntryLineArray.markAsTouched();
    this.table.renderRows();
    this.totalCalculation();
  }

  // Get Journal Entry Data for Edit
  private getJournalEntry(id: number) {
    this.isLoading = true;
    this.journalEntryService.getJournalEntryById(id).subscribe((res: IApiResponse<IJournalEntry>) => {
      if (!res) {
        return
      }
      this.journalEntryModel = res.result
      this.editJournalEntry(this.journalEntryModel)
      this.isLoading = false;
    });
  }

  // Edit Journal Entry
  editJournalEntry(journalEntry: IJournalEntry) {
    this.journalEntryForm.patchValue({
      date: journalEntry.date,
      description: journalEntry.description,
    });

    this.journalEntryForm.setControl('journalEntryLines', this.editJournalEntryLines(journalEntry.journalEntryLines));
    this.totalCalculation();
  }

  // Edit Journal Entry Lines
  editJournalEntryLines(journalEntryLines: IJournalEntryLines[]): FormArray {
    const formArray = new FormArray([]);
    journalEntryLines.forEach((line: IJournalEntryLines) => {
      formArray.push(this.fb.group({
        id: line.id,
        description: [line.description, [this.vs.TEXT()]],
        businessPartnerId: [line.businessPartnerId, [Validators.required]],
        debit: [line.debit, [this.vs.AMOUNT()]],
        credit: [line.credit, [this.vs.AMOUNT()]],
        accountId: [line.accountId, [Validators.required]],
        locationId: line.locationId,
      }))
    })
    return formArray
  }

  // Submit Form Function
  onSubmit(): void {
    if (this.journalEntryForm.get('journalEntryLines').invalid) {
      this.journalEntryForm.get('journalEntryLines').markAllAsTouched();
    }

    const controls = this.journalEntryForm.controls.journalEntryLines as FormArray;
    if (controls.length === 0) {
      this.toastService.error('Please add journal entry lines', 'Error')
      return
    }

    if (this.debitTotal !== this.creditTotal) {
      this.toastService.error('Sum of Debit and Credit are not Equal', 'Error')
      return
    }
    if (this.journalEntryForm.invalid) {
      return
    }

    this.isLoading = true;
    this.mapFormValuesToJournalEntryModel();
    if (this.journalEntryModel.id) {
      this.journalEntryService.updateJournalEntry(this.journalEntryModel)
        .pipe(
          take(1),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          (res: IApiResponse<IJournalEntry>) => {
            this.toastService.success('Updated Successfully', 'Journal Voucher')
            this.journalEntryForm.reset()
            this.cdRef.detectChanges();
            this.router.navigate(['/' + JOURNAL_ENTRY.ID_BASED_ROUTE('details', this.journalEntryModel.id)]);
          },
          (err) => {
            this.isLoading = false;
            this.cdRef.detectChanges()
          })
    } else {
      delete this.journalEntryModel.id;
      this.journalEntryService.addJournalEntry(this.journalEntryModel)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(
          (res: IApiResponse<IJournalEntry>) => {
            this.toastService.success('Created Successfully', 'Journal Voucher')
            this.journalEntryForm.reset()
            this.router.navigate(['/' + JOURNAL_ENTRY.LIST])
          },
          (err) => {
            this.isLoading = false;
            this.cdRef.detectChanges();
          }
        );
    }
  }

  // Mapping Form Values To Model
  mapFormValuesToJournalEntryModel() {
    this.journalEntryModel.date = this.transformDate(this.journalEntryForm.value.date, 'yyyy-MM-dd');
    this.journalEntryModel.description = this.journalEntryForm.value.description;
    this.journalEntryModel.journalEntryLines = this.journalEntryForm.value.journalEntryLines;
  }

  // for save or submit
  isSubmit(val: number) {
    this.journalEntryModel.isSubmit = (val === 0) ? false : true;
  }
  // open business partner dialog
  openBusinessPartnerDialog() {
    if (this.permission.isGranted(this.permissions.BUSINESSPARTNER_CREATE)) {
      this.addButtonService.openBuinessPartnerDialog();
    }
  }
  // open warehouse location dialog
  openLocationDialog() {
    if (this.permission.isGranted(this.permissions.LOCATION_CREATE)) {
      this.addButtonService.openLocationDialog();
    }
  }

  canDeactivate(): boolean | Observable<boolean> {
    return !this.journalEntryForm.dirty;
  }
}
