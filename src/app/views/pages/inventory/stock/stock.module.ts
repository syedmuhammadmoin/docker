import { NgModule} from '@angular/core';
import { PartialsModule} from 'src/app/views/partials/partials.module';
import { SharedModule} from 'src/app/views/shared/shared.module';
import { ListStockComponent } from './list-stock/list-stock.component';
import { StockRoutingModule } from './stock-routing.module';
import { StockService } from './service/stock.service';


@NgModule({
  declarations: [
   ListStockComponent
  ],
  imports: [
    SharedModule,
    PartialsModule,
    StockRoutingModule,
  ],
  providers:[StockService]
})
export class StockModule { }
