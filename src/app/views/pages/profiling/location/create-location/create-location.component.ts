import {Component, Inject, Injector, OnInit, Optional, ViewChild} from '@angular/core';
import {FormGroup, NgForm, Validators} from '@angular/forms';
import {ILocation} from '../model/ILocation';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {finalize, take} from "rxjs/operators";
import {AddModalButtonService} from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import {IsReloadRequired} from '../../store/profiling.action';
import {LocationState} from '../store/location.state';
import {NgxsCustomService} from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';

@Component({
  selector: 'kt-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss'],
  providers: [NgxsCustomService]
})

export class CreateLocationComponent extends AppComponentBase implements OnInit {

  // Hide Submit And Cancel button
  isEditButtonShow = false;
  // disable dropdown
  disableDropdown = false;

  formName = 'Create Location'
  // busy loading
  isLoading: boolean;

  // location form variable
  locationForm: FormGroup;

  // location model
  location: ILocation;

  // validation messages
  validationMessages = {
    name: {
      required: 'Location Name is required'
    },
    // dimensions: {
    //   required: 'Dimension is required'
    // },
    // supervisor: {
    //   required: 'Supervisor is required'
    // },
    warehouse: {
      required: 'Warehouse is required'
    }
  }

  // error keys
  formErrors = {
    name: '',
    // dimensions: '',
    // supervisor: '',
    warehouse: ''
  }

  constructor(
    public ngxsService: NgxsCustomService,
    public addButtonService: AddModalButtonService,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number,
    public dialogRef: MatDialogRef<CreateLocationComponent>,
    injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.locationForm = this.fb.group({
      name: ['', [this.vs.TEXT()]],
      dimensions: ['', this.vs.AMOUNT({required: 0})],
      supervisor: ['', this.vs.TEXT({required: 0})],
      warehouse: ['', [Validators.required]],
    });

    if (this._id) {
      this.formName = 'Edit'
      this.isLoading = true
      // For Edit button
      this.isEditButtonShow = true;
      this.disableDropdown = true;
      this.formName = 'Location Details';
      // disable all fields
      this.locationForm.disable();
      this.getLocation(this._id);
    } else {
      this.location = {
        id: null,
        name: '',
        dimensions: '',
        supervisor: '',
        warehouseId: null,
      };
    }
    // get warehouse list from state
    this.ngxsService.getWarehouseFromState()
  }

  // Edit Form
  toggleEdit() {
    this.isEditButtonShow = false;
    this.disableDropdown = false;
    this.formName = 'Edit Location'
    this.locationForm.enable()
  }

  getLocation(id: number) {
    this.ngxsService.locationService.getLocation(id)
      .subscribe(
        (location: IApiResponse<ILocation>) => {
          this.isLoading = false;
          this.editLocation(location.result);
          this.location = location.result
        },
        (err) => {

        }
      );
  }

  //edit location
  editLocation(location: ILocation) {
    this.locationForm.patchValue({
      id: location.id,
      name: location.name,
      dimensions: location.dimensions,
      supervisor: location.supervisor,
      warehouse: location.warehouseId,
    });
  }

  @ViewChild('formDirective') private formDirective: NgForm;

  reset() {
    this.formDirective.resetForm();
  }

  onSubmit() {
    this.locationForm.markAllAsTouched();
    if (this.locationForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.mapFormValueToClientModel();
    if (this.location.id) {
      this.ngxsService.locationService.updateLocation(this.location)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(
          () => {
            this.ngxsService.store.dispatch(new IsReloadRequired(LocationState, true))
            this.toastService.success('Updated Successfully', 'Location')
            this.onCloseDialog();
          }
        );
    } else {
      delete this.location['id'];
      this.ngxsService.locationService.addLocation(this.location)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(
          () => {
            this.ngxsService.store.dispatch(new IsReloadRequired(LocationState, true))
            this.toastService.success('Created Successfully', 'Location')
            this.onCloseDialog();
          }
        );
    }
  }


  mapFormValueToClientModel() {
    this.location.name = this.locationForm.value.name;
    this.location.dimensions = this.locationForm.value.dimensions;
    this.location.supervisor = this.locationForm.value.supervisor;
    this.location.warehouseId = this.locationForm.value.warehouse;
  }

  openWarehouseDialog() {
    if (this.permission.isGranted(this.permissions.WAREHOUSE_CREATE)) {
      this.addButtonService.openWarehouseDialog();
    }
  }

  // Dialogue close function
  onCloseDialog() {
    this.dialogRef.close();
  }
}








