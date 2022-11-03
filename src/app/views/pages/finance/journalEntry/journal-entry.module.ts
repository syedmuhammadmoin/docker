import { CreateLocationComponent } from 'src/app/views/pages/profiling/location/create-location/create-location.component';
import { CreateBusinessPartnerComponent } from 'src/app/views/pages/profiling/business-partner/create-business-partner/create-business-partner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/views/shared/shared.module';
import { PartialsModule } from 'src/app/views/partials/partials.module';
import { ListJournalEntryComponent } from './list-journal-entry/list-journal-entry.component';
import { CreateJournalEntryComponent } from './create-journal-entry/create-journal-entry.component';
import { CategoryService } from '../../profiling/category/service/category.service';
import { LocationService } from '../../profiling/location/service/location.service';
import { JournalEntryService } from './services/journal-entry.service';
import { JouralEntryDetailsComponent} from './joural-entry-details/joural-entry-details.component';
import { PrintJournalEntryComponent } from './print-journal-entry/print-journal-entry.component';
import { JournalEntryRoutingModule } from './journal-entry-routing.module';
import { BusinessPartnerService } from '../../profiling/business-partner/service/businessPartner.service';
import { AddModalButtonService } from 'src/app/views/shared/services/add-modal-button/add-modal-button.service';
import { DepartmentService } from '../../profiling/department/service/department.service';
import { WarehouseService } from '../../profiling/warehouse/services/warehouse.service';
import { ProductService } from '../../profiling/product/service/product.service';


@NgModule({
  declarations: [
    ListJournalEntryComponent,
    CreateJournalEntryComponent,
    JouralEntryDetailsComponent,
    PrintJournalEntryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PartialsModule,
    JournalEntryRoutingModule,
  ],
  providers: [
    CategoryService,
    LocationService,
    JournalEntryService,
    AddModalButtonService,
    DepartmentService,
    WarehouseService,
    ProductService,
    BusinessPartnerService
  ],
  entryComponents:[CreateBusinessPartnerComponent, CreateLocationComponent]
})
export class JournalEntryModule { }
