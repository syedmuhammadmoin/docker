import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/views/shared/shared.module';
import { PartialsModule } from 'src/app/views/partials/partials.module';
import { AgGridModule } from 'ag-grid-angular';
import { CustomTooltipComponent } from 'src/app/views/shared/components/custom-tooltip/custom-tooltip.component';
import { CreateStatusComponent } from './create-status/create-status.component';
import { ListStatusComponent } from './list-status/list-status.component';
import { StatusRoutingModule } from './status-routing.module';

@NgModule({
  declarations: [
    CreateStatusComponent,
    ListStatusComponent
  ],
  imports: [
    SharedModule,
    PartialsModule,
    StatusRoutingModule,
  ],
  entryComponents: [CreateStatusComponent]
})


export class StatusModule { }
