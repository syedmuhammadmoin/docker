import { PagesModule } from '../../pages.module';
import { CreateLocationComponent } from 'src/app/views/pages/profiling/location/create-location/create-location.component';
import { CreateProductComponent } from 'src/app/views/pages/profiling/product/create-product/create-product.component';
import { CreateBusinessPartnerComponent } from 'src/app/views/pages/profiling/business-partner/create-business-partner/create-business-partner.component';
import { NgModule } from '@angular/core';
import { CreateCreditNoteComponent } from './create-credit-note/create-credit-note.component';
import { ListCreditNoteComponent } from './list-credit-note/list-credit-note.component';
import { CreditNoteDetailComponent } from './credit-note-detail/credit-note-detail.component';
import { PrintCreditNoteComponent } from './print-credit-note/print-credit-note.component';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from 'src/app/views/shared/shared.module';
import { PartialsModule } from 'src/app/views/partials/partials.module';
import { CreditNoteRoutingModule } from './credit-note-routing.module';
import { CustomTooltipComponent } from 'src/app/views/shared/components/custom-tooltip/custom-tooltip.component';


@NgModule({
  declarations: [
    CreateCreditNoteComponent,
    ListCreditNoteComponent,
    CreditNoteDetailComponent,
    PrintCreditNoteComponent
  ],

  imports: [
    SharedModule,
    PartialsModule,
    CreditNoteRoutingModule,

  ],
  entryComponents: []
})
export class CreditNoteModule { }

