import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const modulez = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  NgxMatSelectSearchModule,
  MatListModule,
  MatSliderModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatMenuModule,
  MatTabsModule,
  MatTooltipModule,
  MatSidenavModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTableModule,
  MatGridListModule,
  MatToolbarModule,
  MatBottomSheetModule,
  MatExpansionModule,
  MatDividerModule,
  MatSortModule,
  MatStepperModule,
  MatChipsModule,
  MatPaginatorModule,
  MatDialogModule,
  MatRadioModule,
  MatTreeModule,
  MatButtonToggleModule,
  // CdkTreeModule,


]

@NgModule({
  imports: [
    CommonModule,
    ...modulez
  ],
  exports: [
    ...modulez
  ]
})
export class MatImportModule { }
