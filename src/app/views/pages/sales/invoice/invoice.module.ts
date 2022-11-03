import { PaymentService } from '../../finance/payment/service/payment.service';
import { NgModule } from '@angular/core';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { AgGridModule } from 'ag-grid-angular';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { RegisterPaymentComponent } from './register-payment/register-payment.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { AgingReportComponent } from './aging-report/aging-report.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { SharedModule } from 'src/app/views/shared/shared.module';
import { PartialsModule } from 'src/app/views/partials/partials.module';
import { CustomTooltipComponent } from 'src/app/views/shared/components/custom-tooltip/custom-tooltip.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CreateInvoiceComponent,
    ListInvoiceComponent,
    InvoiceDetailsComponent,
    RegisterPaymentComponent,
    PrintInvoiceComponent,
    AgingReportComponent
  ],
  imports: [
    SharedModule,
    PartialsModule,
    InvoiceRoutingModule,
  ],
  entryComponents: [
    RegisterPaymentComponent
  ],

})
export class InvoiceModule { }
