import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPrintModule } from 'ngx-print';
import { NgxSkltnModule, SkltnConfig } from 'ngx-skltn';
import { ToastrModule } from 'ngx-toastr';
import { NgbDropdownModule, NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CdkTreeModule } from '@angular/cdk/tree';
const skltnConfig: SkltnConfig = {
  rectRadius: 10,
  flareWidth: '150px',
  bgFill: '#e4edf3',
  flareFill: '#fff',
};
const modulez = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  CdkTreeModule,
  NgbModule,
  RouterModule,
  NgxSkltnModule,
  ToastrModule,
  AgGridModule,
  NgxPrintModule,
  NgxMatSelectSearchModule,
  NgbProgressbarModule,
  NgbDropdownModule,
  LoadingBarModule,
  InlineSVGModule,
  NgApexchartsModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...modulez,
    NgxSkltnModule.forRoot(skltnConfig),
    ToastrModule.forRoot({
      closeButton: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AgGridModule,
  ],
  exports: [
    ...modulez
  ]
})
export class OtherImportModule { }
