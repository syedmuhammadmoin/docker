import { NgModule} from '@angular/core';
import { SharedModule} from 'src/app/views/shared/shared.module';
import { PartialsModule} from '../../../partials/partials.module';
import { ListBusinessPartnerComponent} from './list-business-partner/list-business-partner.component';
import { BusinessPartnerRoutingModule } from './business-partner-routing.module';
import { CreateBusinessPartnerComponent } from './create-business-partner/create-business-partner.component';

@NgModule({
  declarations: [
    ListBusinessPartnerComponent,
    CreateBusinessPartnerComponent
  ],
  imports: [
    SharedModule,
    PartialsModule,
    BusinessPartnerRoutingModule,
  ],
  entryComponents: [CreateBusinessPartnerComponent]
})

export class BusinessPartnerModule { }
