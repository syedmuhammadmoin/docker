import { CreateDepartmentComponent } from 'src/app/views/pages/profiling/department/create-department/create-department.component';
import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { SharedModule} from 'src/app/views/shared/shared.module';
import { PartialsModule} from 'src/app/views/partials/partials.module';
import { AgGridModule} from 'ag-grid-angular';
import { ListWarehouseComponent} from './list-warehouse/list-warehouse.component';
import { CreateWarehouseComponent} from './create-warehouse/create-warehouse.component';
import { CustomTooltipComponent } from 'src/app/views/shared/components/custom-tooltip/custom-tooltip.component';
import { WarehouseRoutingModule } from './warehouse-routing.module';
import { DepartmentService } from '../department/service/department.service';
import { AddModalButtonService } from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import { CategoryService } from '../category/service/category.service';
import { BusinessPartnerService } from '../business-partner/service/businessPartner.service';
import { LocationService } from '../location/service/location.service';
import { ProductService } from '../product/service/product.service';

@NgModule({
  declarations: [
    ListWarehouseComponent,
    CreateWarehouseComponent
  ],
  imports: [
    SharedModule,
    PartialsModule,
    WarehouseRoutingModule,
  ],

  entryComponents: [
    CreateWarehouseComponent,

  ],

})
export class WarehouseModule { }
