import {CreateDepartmentComponent} from 'src/app/views/pages/profiling/department/create-department/create-department.component';
import {CreateWarehouseComponent} from 'src/app/views/pages/profiling/warehouse/create-warehouse/create-warehouse.component';
import {CreateOrganizationComponent} from 'src/app/views/pages/profiling/organization/create-organization/create-organization.component';
import {CreateCategoryComponent} from 'src/app/views/pages/profiling/category/create-category/create-category.component';
// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// Partials
import {PartialsModule} from '../partials/partials.module';
// Pages
import {CoreModule} from '../../core/core.module';

import {AgGridModule} from "ag-grid-angular";
import {MatButtonModule} from '@angular/material/button';
import {CreateBusinessPartnerComponent} from './profiling/business-partner/create-business-partner/create-business-partner.component';
import {CreateLocationComponent} from './profiling/location/create-location/create-location.component';
import {CreateProductComponent} from './profiling/product/create-product/create-product.component';


@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    AgGridModule,
    MatButtonModule,
    PartialsModule
  ],

  providers: [],
  entryComponents: [
    CreateCategoryComponent,
    CreateOrganizationComponent,
    CreateWarehouseComponent,
    CreateDepartmentComponent,
    CreateBusinessPartnerComponent,
    CreateLocationComponent,
    CreateProductComponent
  ]
})

export class PagesModule {
}
