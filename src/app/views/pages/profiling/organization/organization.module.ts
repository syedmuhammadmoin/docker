import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateOrganizationComponent} from './create-organization/create-organization.component';
import {ListOrganizationComponent} from './list-organization/list-organization.component';
import {PartialsModule} from 'src/app/views/partials/partials.module';
import {SharedModule} from 'src/app/views/shared/shared.module'
import {OrganizationRoutingModule} from './organization-routing.module';

@NgModule({
  declarations: [
    CreateOrganizationComponent,
    ListOrganizationComponent
  ],
  imports: [
    CommonModule,
    PartialsModule,
    SharedModule,
    OrganizationRoutingModule,
  ],

  entryComponents: [CreateOrganizationComponent]
})

export class OrganizationModule {
  static forRoot(): ModuleWithProviders<OrganizationModule> {
    return {
      ngModule: OrganizationModule,
      providers: []
    };
  }
}
