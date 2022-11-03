import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { PartialsModule } from 'src/app/views/partials/partials.module';
import { SharedModule } from 'src/app/views/shared/shared.module';
import { PurchaseRequisitionComponent } from './purchase-requisition.component';



@NgModule({
  declarations: [
    PurchaseRequisitionComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    PartialsModule,
    SharedModule
  ]
})
export class PurchaseRequisitionModule { }
