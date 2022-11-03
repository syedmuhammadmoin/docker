import {Component, Inject, Injector, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {ILevel4} from '../model/ILevel4';
import {Optional} from 'ag-grid-community';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppComponentBase} from '../../../../../shared/app-component-base';
import {ChartOfAccountService} from '../../service/chart-of-account.service';
import {finalize, take} from 'rxjs/operators';
import {IsReloadRequired} from '../../../../profiling/store/profiling.action';
import {NgxsCustomService} from '../../../../../shared/services/ngxs-service/ngxs-custom.service';
import {AccountLevel4State} from '../../../../../../core/shared-state/account-state/store/account-level4.state';
import {AccountReceivablesState} from '../../store/account-receivables.state';
import {PayableAccountState} from '../../store/payable-account.state';
import {OtherAccountState} from '../../store/other-account.state';

@Component({
  selector: 'kt-create-level4',
  templateUrl: './create-level4.component.html',
  styleUrls: ['./create-level4.component.scss']
})

export class CreateLevel4Component extends AppComponentBase implements OnInit {

  isLoading: boolean;
  // Declaring form variable
  level4Form: FormGroup;

  // Level4 Model
  level4Model: ILevel4;

  // Validation messages..
  validationMessages = {
    level3: {
      required: 'Head Account is required',
    }
  };
  // error keys..
  formErrors = {
    transactionalAccount: '',
    level3: '',
  };
  titleName = 'Create';

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<CreateLevel4Component>,
    public chartOfAccountService: ChartOfAccountService,
    public ngxsService:NgxsCustomService,
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit() {
    // Creating Forms
    this.level4Form = this.fb.group({
      transactionalAccount: ['', this.vs.TEXT()],
      level3: ['', [Validators.required]],
    });

    this.level4Model = {
      id: null,
      name: '',
      level3_id: null,
    }

    // getting data
    if (this.data.modelId) {
      this.titleName = 'Edit';
      this.isLoading = true;
      this.chartOfAccountService.getLevel4AccountById(this.data.modelId).subscribe((res) => {
        this.level4Model = res.result;
        this.patchLevel4Form(this.level4Model);
      })
    }
    if (this.data.parentId) {
      this.isLoading = true;
      this.level4Model.level3_id = this.data.parentId;
      this.level4Form.patchValue({
        level3: this.data.parentId
      });
      const level3Control = this.level4Form.get('level3');
      level3Control.disable();
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (this.level4Form.invalid) {
      return;
    }
    this.isLoading = true;
    this.mapFormValuesToInvoiceModel();
    if (this.level4Model.id) {
      this.chartOfAccountService.updateLevel4Account(this.level4Model).pipe(
        take(1),
        finalize(() => this.isLoading = false))
        .subscribe(() => {
          this.ngxsService.store.dispatch(new IsReloadRequired(AccountLevel4State, true));
          this.ngxsService.store.dispatch(new IsReloadRequired(AccountReceivablesState, true));
          this.ngxsService.store.dispatch(new IsReloadRequired(PayableAccountState, true));
          this.ngxsService.store.dispatch(new IsReloadRequired(OtherAccountState, true));
          this.toastService.success('Updated Successfully', 'Transactional Account');
          this.onCloseLevel4Dialog();
        },
          (err) => {
          }
        );
    } else {
      delete this.level4Model.id;
      // Sending data to Service
      this.chartOfAccountService.createLevel4Account(this.level4Model).pipe(
        take(1),
        finalize(() => this.isLoading = false))
        .subscribe(() => {
          this.ngxsService.store.dispatch(new IsReloadRequired(AccountLevel4State, true));
          this.ngxsService.store.dispatch(new IsReloadRequired(AccountReceivablesState, true));
          this.ngxsService.store.dispatch(new IsReloadRequired(PayableAccountState, true));
          this.ngxsService.store.dispatch(new IsReloadRequired(OtherAccountState, true));
          this.toastService.success('Created Successfully', 'Transactional Account');
          this.onCloseLevel4Dialog();
        },
          (err) => {

          }
        );
    }
  }

  // Mapping value to model
  mapFormValuesToInvoiceModel() {
    this.level4Model.name = this.level4Form.value.transactionalAccount;
    this.level4Model.level3_id = this.level4Model.level3_id || this.level4Form.value.level3;
  }

  // Dialogue close function
  onCloseLevel4Dialog() {
    this.dialogRef.close();
  }

  private patchLevel4Form(level4Model: ILevel4) {
    this.level4Form.patchValue({
      transactionalAccount: level4Model.name,
      level3: level4Model.level3_id
    });
    this.level4Form.get('level3').disable();
    this.isLoading = false;
  }
}
