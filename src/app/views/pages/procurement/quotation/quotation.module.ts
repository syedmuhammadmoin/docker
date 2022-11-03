import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { PartialsModule } from 'src/app/views/partials/partials.module';
import { SharedModule } from 'src/app/views/shared/shared.module';
import { QuotationComponent } from './quotation.component';



@NgModule({
  declarations: [
    QuotationComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    PartialsModule,
    SharedModule
  ]
})
export class QuotationModule { }
