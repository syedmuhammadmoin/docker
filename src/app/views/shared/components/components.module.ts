import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { GroupDropdownComponent } from './group-dropdown/group-dropdown.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { DateInputComponent } from './date-input/date-input.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { BusyDirective } from './interfaces/directive/busy.directive';
import { ShortNumberPipe } from '../pipes/short-number.pipe';
import { PdfComponent } from '../pdf/pdf.component';
import { NonNegativeValuePipe } from '../pipes/non-negative/non-negative-value.pipe';
import { RaGridComponent } from './ra-grid/ra-grid.component';
import { RaGridOfflineComponent } from './ra-grid-offline/ra-grid-offline.component';
import { RaGridSelectComponent } from './ra-grid-select/ra-grid-select.component';
import { MatImportModule } from '../modules/mat-import.module';
import { OtherImportModule } from '../modules/other-import.module';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { BtnFormActionsComponent } from './btn-form-actions/btn-form-actions.component';
import { BtnActionComponent } from './btn-action/btn-action.component';
import { BtnGridComponent } from './btn-grid/btn-grid.component';
import { BtnFormDraftComponent } from './btn-form-draft/btn-form-draft.component';


const componentz = [
  CustomTooltipComponent,
  DropdownComponent,
  GroupDropdownComponent,
  InputFieldComponent,
  DateInputComponent,
  ConfirmationDialogComponent,
  BusyDirective,
  ShortNumberPipe,
  PdfComponent,
  NonNegativeValuePipe,
  RaGridComponent,
  RaGridOfflineComponent,
  RaGridSelectComponent,
  RadioButtonComponent,
  BtnFormActionsComponent,
  BtnActionComponent,
  BtnGridComponent,
  BtnFormDraftComponent,
]
@NgModule({
  declarations: componentz,
  imports: [
    CommonModule,
    OtherImportModule,
    MatImportModule
  ],
  exports:componentz,
  entryComponents: [ConfirmationDialogComponent],
})
export class ComponentsModule { }
