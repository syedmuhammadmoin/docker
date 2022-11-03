import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { AgGridModule} from 'ag-grid-angular';
import { PartialsModule} from 'src/app/views/partials/partials.module';
import { SharedModule} from 'src/app/views/shared/shared.module';
import { ListSaleOrderComponent} from './list-sale-order/list-sale-order.component';
import { SaleOrderService} from './service/sale-order.service';
import { SalesOrderDetailComponent} from './sales-order-detail/sales-order-detail.component';
import { PrintSalesOrderComponent} from './print-sales-order/print-sales-order/print-sales-order.component';
import { CustomTooltipComponent } from 'src/app/views/shared/components/custom-tooltip/custom-tooltip.component';
import { SalesOrderRoutingModule } from './sales-order-routing.module';
import { CreateSalesOrderComponent } from './create-sales-order/create-sales-order.component';
import { CategoryService } from '../../profiling/category/service/category.service';
import { LocationService } from '../../profiling/location/service/location.service';
import { AddModalButtonService } from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import { DepartmentService } from '../../profiling/department/service/department.service';
import { WarehouseService } from '../../profiling/warehouse/services/warehouse.service';
import { ProductService } from '../../profiling/product/service/product.service';
import { BusinessPartnerService } from '../../profiling/business-partner/service/businessPartner.service';


@NgModule({
  declarations: [
    CreateSalesOrderComponent,
    ListSaleOrderComponent,
    SalesOrderDetailComponent,
    PrintSalesOrderComponent,
    CreateSalesOrderComponent
  ],
  imports: [
    PartialsModule,
    SharedModule,
    SalesOrderRoutingModule,
  ],
})
export class SalesOrderModule { }
