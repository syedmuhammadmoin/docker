import {Component, Inject, Injector, OnInit, Optional, ViewChild} from '@angular/core';
import {FormGroup, NgForm, Validators} from '@angular/forms';
import {CategoryService} from '../service/category.service';
import {ICategory} from '../model/ICategory';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {finalize, take} from "rxjs/operators";
import {IsReloadRequired} from '../../store/profiling.action';
import {CategoryState} from '../store/category.state';
import {NgxsCustomService} from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';


@Component({
  selector: 'kt-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  providers: [NgxsCustomService]
})

export class CreateCategoryComponent extends AppComponentBase implements OnInit {
  isEditButtonShow = false;
  // disable dropdown
  disableDropdown = false;
  formName = 'Create Category'

  //busy loading
  isLoading: boolean

  // category form declaration
  categoryForm: FormGroup;

  // category model declaration
  category: ICategory;

  // validation messages
  validationMessages = {
    inventoryAccount: {
      required: 'Inventory Account is required.',
    },
    revenueAccount: {
      required: 'Revenue Account is required.',
      //incorrect: 'Please select valid Revenue Account'
    },
    costAccount: {
      required: 'Cost Account is required.',
      //incorrect: 'Please select valid Cost Account'
    },
  };

  //error keys
  formErrors = {
    name: '',
    inventoryAccount: '',
    revenueAccount: '',
    costAccount: '',
  };

  constructor(
    public categoryService: CategoryService,
    public ngxsService: NgxsCustomService,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number,
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: ['',[this.vs.TEXT()]],
      inventoryAccount: ['', [Validators.required]],
      revenueAccount: ['', [Validators.required]],
      costAccount: ['', [Validators.required]]
    });

    if (this._id) {
      this.formName = 'Edit'
      this.isLoading = true
      // For Edit button
      this.isEditButtonShow = true;
      this.disableDropdown = true;
      this.formName = 'Category Details';
      // disable all fields
      this.categoryForm.disable();
      this.getCategory(this._id);
    } else {
      this.category = {
        id: null,
        name: '',
        inventoryAccountId: null,
        revenueAccountId: null,
        costAccountId: null,
      }
    }

    this.ngxsService.getAccountLevel4OthersFromState()
  }
  // Edit Form
  toggleEdit() {
    this.isEditButtonShow = false;
    this.disableDropdown = false;
    this.formName = 'Edit Category'
    this.categoryForm.enable()
  }

  // Getting category values for update
  getCategory(id: number) {
    this.ngxsService.categoryService.getCategory(id)
      .subscribe(
        (category: IApiResponse<ICategory>) => {
          this.isLoading = false;
          this.editCategory(category.result);
          this.category = category.result;
        },
        (err) => {}
      );
  }

  // Patching values to category form
  editCategory(category: ICategory) {
    this.categoryForm.patchValue({
      id: category.id,
      name: category.name,
      inventoryAccount: category.inventoryAccountId,
      revenueAccount: category.revenueAccountId,
      costAccount: category.costAccountId,
    });
  }

  onSubmit() {
    this.categoryForm.markAllAsTouched();
    if (this.categoryForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.mapFormValueToCategoryModel();
    if (this.category.id) {
      this.ngxsService.categoryService.updateCategory(this.category)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
          this.ngxsService.store.dispatch(new IsReloadRequired(CategoryState, true))
          this.toastService.success('Updated Successfully', 'Category')
          this.onCloseDialog();
        }
        );
    } else {
      delete this.category.id;
      this.ngxsService.categoryService.addCategory(this.category)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
          this.ngxsService.store.dispatch(new IsReloadRequired(CategoryState, true))
          this.toastService.success('Created Successfully', 'Category')
          this.onCloseDialog();
        }
        );
    }
  }

  // Mapping values from category form to category model
  mapFormValueToCategoryModel() {
    this.category.name = this.categoryForm.value.name;
    this.category.inventoryAccountId = this.categoryForm.value.inventoryAccount
    this.category.revenueAccountId = this.categoryForm.value.revenueAccount;
    this.category.costAccountId = this.categoryForm.value.costAccount;
  }

  @ViewChild('formDirective') private formDirective: NgForm;
  reset() {
    this.formDirective.resetForm();
  }

  // Dialogue close function
  onCloseDialog() {
    this.dialogRef.close();
  }
}

