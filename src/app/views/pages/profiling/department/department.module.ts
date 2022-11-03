
import { NgModule} from '@angular/core';
import { SharedModule} from 'src/app/views/shared/shared.module';
import { PartialsModule} from 'src/app/views/partials/partials.module';
import { ListDepartmentComponent} from "./list-department/list-department.component";
import { CreateDepartmentComponent } from './create-department/create-department.component';
import { DepartmentRoutingModule } from './department-routing.module';

@NgModule({
  declarations: [
    CreateDepartmentComponent,
    ListDepartmentComponent
  ],
  imports: [
    SharedModule,
    PartialsModule,
    DepartmentRoutingModule,
  ],
  entryComponents: [CreateDepartmentComponent]
})
export class DepartmentModule { }
