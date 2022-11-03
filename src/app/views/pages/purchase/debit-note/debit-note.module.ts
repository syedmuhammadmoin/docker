import {NgModule} from "@angular/core";
import {AgGridModule} from "ag-grid-angular";
import {PartialsModule} from "src/app/views/partials/partials.module";
import {CustomTooltipComponent} from "src/app/views/shared/components/custom-tooltip/custom-tooltip.component";
import {SharedModule} from "src/app/views/shared/shared.module";
import {CreateDebitNoteComponent} from "./create-debit-note/create-debit-note.component";
import {DebitNoteDetailComponent} from "./debit-note-detail/debit-note-detail.component";
import {DebitNoteRoutingModule} from "./debit-note-routing.module";
import {ListDebitNoteComponent} from "./list-debit-note/list-debit-note.component";
import {PrintDebitNoteComponent} from "./print-debit-note/print-debit-note.component";


@NgModule({
  declarations: [
    ListDebitNoteComponent,
    CreateDebitNoteComponent,
    PrintDebitNoteComponent,
    DebitNoteDetailComponent
  ],
  imports: [
    PartialsModule,
    SharedModule,
    DebitNoteRoutingModule,

  ],

})
export class DebitNoteModule { }
