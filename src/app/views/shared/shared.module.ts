import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OtherImportModule } from './modules/other-import.module';
import { MatImportModule } from './modules/mat-import.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    OtherImportModule,
    MatImportModule,
    ComponentsModule
  ],
  exports: [
    OtherImportModule,
    MatImportModule,
    ComponentsModule
  ],
  providers: [
    // FormConfirmationGuard,
    DatePipe
  ],

})
export class SharedModule {

}
