import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/views/shared/shared.module';
import {PartialsModule} from 'src/app/views/partials/partials.module';
import {ListProductComponent} from './list-product/list-product.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {ProductRoutingModule} from './product-routing.module'


@NgModule({
  declarations: [
    CreateProductComponent,
    ListProductComponent
  ],
  imports: [
    SharedModule,
    PartialsModule,
    ProductRoutingModule,
  ],
  entryComponents: [CreateProductComponent,]
})
export class ProductModule {
}
