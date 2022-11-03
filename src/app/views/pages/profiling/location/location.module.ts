import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListLocationComponent } from './list-location/list-location.component';
import { CreateLocationComponent } from './create-location/create-location.component';
import { PartialsModule } from 'src/app/views/partials/partials.module';
import { SharedModule } from 'src/app/views/shared/shared.module';
import { LocationRoutingModule } from './location-routing.module';

@NgModule({
  declarations: [
    ListLocationComponent,
    CreateLocationComponent
  ],
  imports: [
    CommonModule,
    PartialsModule,
    SharedModule,
    LocationRoutingModule,
  ],

  entryComponents : [
    CreateLocationComponent,

  ]
})

export class LocationModule { }
