import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PartialsModule} from 'src/app/views/partials/partials.module';
import {SharedModule} from 'src/app/views/shared/shared.module';
import {ListDispatchNoteComponent} from './list-dispatch-note/list-dispatch-note.component';

import {DispatchNoteDetailComponent} from './dispatch-note-detail/dispatch-note-detail.component';
import {PrintDispatchNoteComponent} from './print-dispatch-note/print-dispatch-note.component';
import {DispatchNoteRoutingModule} from './dispatch-note-routing.module';
import {DispatchNoteService} from './service/dispatch-note.service';
import {CreateDispatchNoteComponent} from './create-dispatch-note/create-dispatch-note.component';


@NgModule({
  declarations: [

    ListDispatchNoteComponent,
    DispatchNoteDetailComponent,
    PrintDispatchNoteComponent,
    CreateDispatchNoteComponent
  ],
  imports: [
    CommonModule,
    PartialsModule,
    SharedModule,
    DispatchNoteRoutingModule,
  ],
  providers: [DispatchNoteService]
})
export class DispatchNoteModule {
}
