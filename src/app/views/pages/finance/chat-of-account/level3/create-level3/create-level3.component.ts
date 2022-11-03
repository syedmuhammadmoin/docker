import {Component, Inject, Injector, OnInit, ViewChild} from '@angular/core';
import {FormGroup, NgForm, Validators} from '@angular/forms';
import {ILevel3} from '../model/ILevel3';
import {Optional} from 'ag-grid-community';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppComponentBase} from '../../../../../shared/app-component-base';
import {ChartOfAccountService} from '../../service/chart-of-account.service';
import {finalize, take} from 'rxjs/operators';

@Component({
  selector: 'kt-create-level3',
  templateUrl: './create-level3.component.html',
  styleUrls: ['./create-level3.component.scss']
})
export class CreateLevel3Component extends AppComponentBase implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  reset() {
    this.formDirective.resetForm();
  }
  // Declaring form variable
  level3Form: FormGroup;
  //For Loading
  isLoading: boolean;
  // Level3 Model
  level3Model: ILevel3;

  // Validation messages..
  validationMessages = {
    'level2': {
      'required': 'Head summary is required',
    }
  };
  // error keys..
  formErrors = {
    'name': '',
    'level2': '',
  };

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<CreateLevel3Component>,
    public chartOfAccountService: ChartOfAccountService,
    injector: Injector) {
    super(injector)
  }

  ngOnInit(): void {
    // Creating Forms
    this.level3Form = this.fb.group({
      name: ['', [this.vs.TEXT()]],
      level2: ['', [Validators.required]],
    });

    this.level3Model = {
      id: null,
      name: '',
      level2_id: null,
    }

    // get data by id
    if (this.data.modelId) {
      this.isLoading = true;
      this.chartOfAccountService.getLevel3AccountById(this.data.modelId).subscribe((res) => {
        this.level3Model = res;
        this.patchLevel3(this.level3Model);
      })
    }
    if (this.data.parentId) {
      this.isLoading = true;
      this.level3Model.level2_id = this.data.parentId;
      this.level3Form.patchValue({ level2: this.data.parentId });
      const level2Control = this.level3Form.get('level2');
      level2Control.disable();
      this.isLoading = false;
    }

  }

  // Submit Form Function
  onSubmit(): void {
    if (this.level3Form.invalid) {
      return;
    }
    this.mapFormValuesToInvoiceModel();
    if (this.level3Model.id) {
      this.isLoading = true;
      this.chartOfAccountService.updateLevel3Account(this.level3Model).pipe(
        take(1),
        finalize(() => this.isLoading = false))
        .subscribe((res) => {
          this.toastService.success('Updated Successfully!', 'Summary Head');
          this.onCloseLevel3Dialog()
        }, (err) => {
          console.error(err);
        })
    } else {
      delete this.level3Model['id'];
      this.isLoading = true;
      // Sending data to Service
      this.chartOfAccountService.createLevel3Account(this.level3Model).pipe(
        take(1),
        finalize(() => this.isLoading = false)).subscribe((res) => {
          this.toastService.success('Created Successfully!', 'Summary Head');
          this.onCloseLevel3Dialog()
        }, (err) => {
        });
    }
  }

  // Mapping value to model
  mapFormValuesToInvoiceModel() {
    this.level3Model.name = this.level3Form.value.name;
    this.level3Model.level2_id = this.level3Model.level2_id || this.level3Form.value.level2;
  }

  // Dialogue close function
  onCloseLevel3Dialog() {
    this.dialogRef.close();
  }

  private patchLevel3(level3Model: ILevel3) {
    this.level3Form.patchValue({
      name: level3Model.name,
      level2: level3Model.level2_id
    })
    this.isLoading = false;
  }
}
