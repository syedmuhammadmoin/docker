import { NgModule} from '@angular/core';
import { PartialsModule} from 'src/app/views/partials/partials.module';
import { SharedModule} from 'src/app/views/shared/shared.module';
import { CreateInventoryAdjustmentComponent } from './create-inventory-adjustment/create-inventory-adjustment.component';
import { ListInventoryAdjustmentComponent } from './list-inventory-adjustment/list-inventory-adjustment.component';
import { InventoryAdjustmentDetailsComponent } from './inventory-adjustment-details/inventory-adjustment-details.component';
import { InventoryAdjustmentRoutingModule } from './inventory-adjustment-routing.module';
import { InventoryAdjustmentService } from './service/inventory-adjustment.service';
import { BusinessPartnerService } from '../../profiling/business-partner/service/businessPartner.service';
import { AddModalButtonService } from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import { DepartmentService } from '../../profiling/department/service/department.service';
import { LocationService } from '../../profiling/location/service/location.service';
import { CategoryService } from '../../profiling/category/service/category.service';
import { ProductService } from '../../profiling/product/service/product.service';


@NgModule({
  declarations: [
    CreateInventoryAdjustmentComponent,
    ListInventoryAdjustmentComponent,
    InventoryAdjustmentDetailsComponent
  ],
  imports: [
    SharedModule,
    PartialsModule,
    InventoryAdjustmentRoutingModule,
  ],
  providers:[
    InventoryAdjustmentService,
    AddModalButtonService,
    ProductService,
    BusinessPartnerService,
    DepartmentService,
    LocationService,
    CategoryService
  ]
})
export class InventoryAdjustmentModule { }
