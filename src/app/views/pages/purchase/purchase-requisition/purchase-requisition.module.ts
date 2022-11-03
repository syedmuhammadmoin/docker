import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AgGridModule} from 'ag-grid-angular';
import {PartialsModule} from 'src/app/views/partials/partials.module';
import {SharedModule} from 'src/app/views/shared/shared.module';
import {ListPurchaseRequisitionComponent} from './list-purchase-requisition/list-purchase-requisition.component';
import {PurchaseRequisitionDetailComponent} from './purchase-requisition-detail/purchase-requisition-detail.component';
import {PrintPurchaseRequisitionComponent} from './print-purchase-requisition/print-purchase-requisition.component';
import {CustomTooltipComponent} from 'src/app/views/shared/components/custom-tooltip/custom-tooltip.component';
import {PurchaseRequisitionRoutingModule} from './purchase-requisition-routing.module';
import {CreatePurchaseRequisitionComponent} from './create-purchase-requisition/create-purchase-requisition.component';

@NgModule({
  declarations: [
    ListPurchaseRequisitionComponent,
    PurchaseRequisitionDetailComponent,
    PrintPurchaseRequisitionComponent,
    CreatePurchaseRequisitionComponent
  ],
  imports: [
    PartialsModule,
    SharedModule,
    PurchaseRequisitionRoutingModule,
  ],
})
export class PurchaseRequisitionModule {
}
