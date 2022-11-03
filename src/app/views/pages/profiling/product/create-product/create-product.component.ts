import {Component, Inject, Injector, OnInit, Optional, ViewChild} from '@angular/core';
import {FormGroup, NgForm, Validators} from '@angular/forms';
import {IProduct} from '../model/IProduct';
import {RequireMatch as RequireMatch} from 'src/app/views/shared/requireMatch';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {finalize, take} from 'rxjs/operators';
import {AddModalButtonService} from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import {IsReloadRequired} from '../../store/profiling.action';
import {ProductState} from '../store/product.state.state';
import {NgxsCustomService} from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';

@Component({
  selector: 'kt-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  providers: [NgxsCustomService]
})

export class CreateProductComponent extends AppComponentBase implements OnInit {

  // Hide Submit And Cancel button
  isEditButtonShow = false;
  // disable dropdown
  disableDropdown = false;
  formName = 'Create Product'
  // Busy loading
  isLoading: boolean;

  // Product form declaration
  productForm: FormGroup;

  // product model declaration
  product: IProduct;

  // validation messages
  validationMessages = {
    name: {
      required: 'Product Name is required'
    },
    purchasedOrSold: {
      required: 'Purchase or Sold is required'
    },
    productType: {
      required: 'Product Type is required'
    },
    category: {
      required: 'Category is required',
      incorrect: 'Please select valid category'
    },
    salesPrice: {
      required: 'Sales Price is required',
      min: 'Sales Price can not be Zero',
    },
    cost: {
      required: 'Cost is required',
      min: 'Cost can not be Zero',
    },
    salesTax: {
      required: 'Sales Tax is required',
      min: 'Tax % should be between 0 & 100',
      max: 'Tax % should be between 0 & 100'
    },
  }
  // error keys
  formErrors = {
    name: '',
    purchasedOrSold: '',
    productType: '',
    category: '',
    salesPrice: '',
    cost: '',
    salesTax: '',
  }

  constructor(
    public ngxsService: NgxsCustomService,
    public addButtonService: AddModalButtonService,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number,
    public dialogRef: MatDialogRef<CreateProductComponent>, injector: Injector
  ) {
    super(injector);
  }

  @ViewChild('formDirective') private formDirective: NgForm;

  reset() {
    this.formDirective.resetForm();
    this.formErrors = {} as any
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [this.vs.TEXT()]],
      purchasedOrSold: ['', [Validators.required]],
      productType: ['', [Validators.required]],
      category: ['', [RequireMatch, Validators.required]],
      salesPrice: ['', [this.vs.AMOUNT()]],
      cost: ['', [this.vs.AMOUNT({min: 1})]],
      salesTax: ['', [this.vs.AMOUNT({max: 100})]],
      barcode: ['']
    });

    // checking router params for edit product
    if (this._id) {
      this.isLoading = true;
      this.formName = 'Product Details'
      // For Edit button
      this.isEditButtonShow = true;
      this.disableDropdown = true;
      // disable all fields
      this.productForm.disable();
      this.getProduct(this._id);
    } else {
      this.product = {
        id: null,
        productName: '',
        purchasedOrSold: '',
        productType: '',
        categoryId: null,
        salesPrice: null,
        cost: null,
        salesTax: null,
        barcode: '',
      }
    }
    // get categoryList from state
    this.ngxsService.getCategoryFromState()
  }

  // Edit Form
  toggleEdit() {
    this.isEditButtonShow = false;
    this.disableDropdown = false;
    this.formName = 'Edit Product'
    this.productForm.enable()
  }

  // Getting product values for update
  getProduct(id: number) {
    this.ngxsService.productService.getProduct(id)
      .subscribe(
        (product: IApiResponse<IProduct>) => {
          this.isLoading = false;
          this.editProduct(product.result);
          this.product = product.result;
        },
        (err) => {

        }
      );
  }

  // Patching values to product form
  editProduct(product: IProduct) {
    this.productForm.patchValue({
      id: product.id,
      name: product.productName,
      purchasedOrSold: product.purchasedOrSold,
      productType: product.productType,
      category: product.categoryId,
      salesPrice: product.salesPrice,
      cost: product.cost,
      salesTax: product.salesTax,
      barcode: product.barcode
    });

  }

  onSubmit() {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.mapFormValueToProductModel();
    if (this.product.id) {
      this.ngxsService.productService.updateProduct(this.product)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false)
        ).subscribe(() => {
          this.ngxsService.store.dispatch(new IsReloadRequired(ProductState, true))
          this.toastService.success('Updated Successfully', 'Product')
          this.onCloseDialog();
        }
        );
    } else {
      delete this.product.id;
      this.ngxsService.productService.addProduct(this.product)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
          this.ngxsService.store.dispatch(new IsReloadRequired(ProductState, true))
          this.toastService.success('Created Successfully', 'Product')
          this.onCloseDialog();
        }
        );
    }
  }

  // Mapping value from product form to product model
  mapFormValueToProductModel() {
    this.product.productName = this.productForm.value.name;
    this.product.purchasedOrSold = this.productForm.value.purchasedOrSold;
    this.product.productType = this.productForm.value.productType;
    this.product.categoryId = this.productForm.value.category;
    this.product.salesPrice = this.productForm.value.salesPrice;
    this.product.cost = this.productForm.value.cost;
    this.product.salesTax = this.productForm.value.salesTax;
    this.product.barcode = this.productForm.value.barcode;
  }

  // create new category
  openCategoryDialog() {
    if (this.permission.isGranted(this.permissions.CATEGORIES_CREATE)) {
      this.addButtonService.openCategoryDialog();
    }
  }

  // Dialogue close function
  onCloseDialog() {
    this.dialogRef.close();
  }
}
