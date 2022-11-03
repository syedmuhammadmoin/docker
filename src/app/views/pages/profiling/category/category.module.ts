import {NgModule} from '@angular/core';
import {SharedModule} from 'src/app/views/shared/shared.module';
import {PartialsModule} from 'src/app/views/partials/partials.module';
import {AccountResolverService} from "src/app/views/shared/resolver/account/account-resolver.service";
import {ListCategoryComponent} from './list-category/list-category.component';
import {CreateCategoryComponent} from './create-category/create-category.component';
import {CategoryRoutingModule} from './category-routing.module';


@NgModule({
  declarations: [
    CreateCategoryComponent,
    ListCategoryComponent,
  ],
  imports: [
    SharedModule,
    PartialsModule,
    CategoryRoutingModule,
  ],
  providers: [AccountResolverService],
  entryComponents: [CreateCategoryComponent],
})

export class CategoryModule {
}
