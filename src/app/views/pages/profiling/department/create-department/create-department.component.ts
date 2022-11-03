import {Component, Inject, Injector, OnInit, Optional, ViewChild} from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {IDepartment} from '../model/IDepartment';
import {IState} from 'src/app/views/shared/models/state';
import {ICity} from 'src/app/views/shared/models/city';
import {ICountry} from 'src/app/views/shared/models/country';
import {CscService} from 'src/app/views/shared/csc.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {finalize, take} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AddModalButtonService} from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import {IsReloadRequired} from '../../store/profiling.action';
import {DepartmentState} from '../store/department.state';
import {NgxsCustomService} from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';

@Component({
  selector: 'kt-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss'],
  providers: [NgxsCustomService]
})

export class CreateDepartmentComponent extends AppComponentBase implements OnInit {

  formName = 'Create Department'
  // Hide Submit And Cancel button
  isEditButtonShow = false;
  // disable dropdown
  disableDropdown = false;
  // busy loading
  isLoading: boolean;

  // variable for department
  deptForm: FormGroup;

  // department model
  department: IDepartment;

  // country , state and city list
  countryList: ICountry[] = [];
  stateList: IState[] = [];
  cityList: ICity[] = [];

  // for optionList dropdown
  stateList2: Subject<IState[]> = new Subject<IState[]>();
  cityList2: Subject<ICity[]> = new Subject<ICity[]>();

  // validation messages
  validationMessages = {
    name: {
      required: 'Department Name is required'
    },
    country: {
      required: 'Country is required'
    },
    state: {
      required: 'State is required'
    },
    city: {
      required: 'City is required'
    },
    address: {
      required: 'Address is required'
    },
    /*    organization: {
          required: 'Organization is required'
        },*/
    // 'headOfDept': {
    //   'required': 'HOD is required'
    // }
  }

  // error keys
  formErrors = {
    name: '',
    country: '',
    state: '',
    city: '',
    address: '',
    // organization: '',
    // 'headOfDept': ''
  }

  // injecting dependencies
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number,
    public dialogRef: MatDialogRef<CreateDepartmentComponent>,
    public ngxsService: NgxsCustomService,
    public addButtonService: AddModalButtonService,
    private cscService: CscService, // Country, State, City
    injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.deptForm = this.fb.group({
      name: ['', [this.vs.TEXT({min: 2})]],
      country: [null],
      state: [null],
      city: [null],
      address: ['', this.vs.TEXT({required: 0, special: 0})],
      // organization: ['', [Validators.required]],
      headOfDept: ['', [this.vs.TEXT({required: 0})]],
    });

    this.getCountryList();

    if (this._id) {
      this.isLoading = true;
      // For Edit button
      this.isEditButtonShow = true;
      this.disableDropdown = true;
      this.formName = 'Department Details';
      // disable all fields
      this.deptForm.disable();
      this.getDepartment(this._id);
    } else {
      this.department = {
        id: null,
        name: '',
        country: '',
        state: '',
        city: '',
        address: '',
        headOfDept: '',
        // organizationId: null,
      };
    }
    // get orgnizationList from state
    this.ngxsService.getOrganizationFromState();
    this.ngxsService.getCountryFromState();
    this.ngxsService.getStateFromState();
    this.ngxsService.getCityFromState();
  }

  // Edit Form
  toggleEdit() {
    this.isEditButtonShow = false;
    this.disableDropdown = false;
    this.formName = 'Edit Department'
    this.deptForm.enable()
  }

  // get department by id
  getDepartment(id: number) {
    this.ngxsService.departmentService.getDepartment(id)
      .subscribe(
        (department: IApiResponse<IDepartment>) => {
          this.isLoading = false;
          this.editDepartment(department.result);
          this.department = department.result
        },
        (err) => {

        }
      );
  }

  // get country list
  getCountryList() {
    this.cscService.getCountries().subscribe((data: ICountry[]) => {
      this.countryList = data;
    });
  }

  // get state list
  getStateLists(id: number) {
    this.cscService.getStates(id).subscribe((data: IState[]) => {
      this.stateList = data;
      this.stateList2.next(this.stateList)
    });
  }

  // method called when country is changed
  onChangeCountry(countryId: number) {
    if (countryId) {
      this.getStateLists(parseInt(countryId.toString()));
      this.stateList2.next(this.stateList)
      if (this.deptForm.controls.city.value) {
        this.deptForm.controls.city.reset();
      }
    }
  }

  // method called when state is changed
  onChangeState(stateId: number) {
    if (stateId) {
      this.cscService.getCities(parseInt(stateId.toString())).subscribe(
        (data: ICity[]) => {
          this.cityList = data
          this.cityList2.next(this.cityList)
        });
    }
  }

  // edit department
  editDepartment(department: IDepartment) {
    this.onChangeCountry(this.countryList?.find(c => c.name == department.country)?.id);
    this.onChangeState(this.stateList?.find(c => c.name == department.state)?.id);
    this.onChangeState(this.cityList?.find(c => c.name == department.city)?.id)

    this.deptForm.patchValue({
      id: department.id,
      name: department.name,
      country: this.countryList?.find(c => c.name == department.country)?.id,
      state: this.stateList?.find(c => c.name == department.state)?.id,
      city: this.cityList?.find(c => c.name == department.city)?.id,
      address: department.address,
      headOfDept: department.headOfDept,
      // organization: department.organizationId,
    });
  }

  @ViewChild('formDirective') private formDirective: NgForm;

  reset() {
    this.stateList2.next(null)
    this.cityList2.next(null)
    this.formDirective.resetForm();
    this.cdRef.detectChanges()
  }

  // form submition
  onSubmit() {
    this.deptForm.markAllAsTouched();
    if (this.deptForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.mapFormValueToClientModel();
    if (this.department.id) {
      this.ngxsService.departmentService.updateDepartment(this.department)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
            this.ngxsService.store.dispatch(new IsReloadRequired(DepartmentState, true))
            this.toastService.success('Updated Successfully', 'Department')
            this.onCloseDialog();
          }
        );
    } else {
      delete this.department.id;
      this.ngxsService.departmentService.addDepartment(this.department)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(
          () => {
            this.ngxsService.store.dispatch(new IsReloadRequired(DepartmentState, true))
            this.toastService.success('Created Successfully', 'Department')
            this.onCloseDialog();
          },
        );
    }
  }

  // mapping form values to the model
  mapFormValueToClientModel() {
    const form = this.deptForm.value
    this.department.name = form.name;
    this.department.country = form.country ? this.countryList?.find(c => c.id == form.country)?.name : '';
    this.department.state = form.state ? this.stateList?.find(c => c.id == form.state)?.name : '';
    this.department.city = form.city ? this.cityList?.find(c => c.id == form.city)?.name : '';
    this.department.address = form.address;
    this.department.headOfDept = form.headOfDept;
    // this.department.organizationId = form.organization;
  }

  // add new orgnization
  openOrgnizationDialog() {
    if (this.permission.isGranted(this.permissions.ORGANIZATION_CREATE)) {
      this.addButtonService.openOrgnizationDialog();
    }
  }

  // Dialogue close function
  onCloseDialog() {
    this.dialogRef.close();
  }
}
