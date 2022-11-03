import { Component, OnInit } from '@angular/core';
import { merge } from 'lodash';
import { IRaGridProperties } from '../interfaces/ra-grid-properties.interface';
import { RaGridComponent } from '../ra-grid/ra-grid.component';

@Component({
  selector: 'kt-ra-grid-select',
  templateUrl: './ra-grid-select.component.html',
  styleUrls: ['./ra-grid-select.component.scss']
})
export class RaGridSelectComponent extends RaGridComponent implements OnInit {
  ngOnInit(): void {
    super.ngOnInit();
    merge(this.raGridProperties, {
      rowSelection: 'multiple',
      overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your data is loading</span>',
      rowMultiSelectWithClick: true,
      rowSelected: this.rowSelected.bind(this),
      ...this.raGridProperties
    }as IRaGridProperties);
  }
  rowSelected($event) {
    this.raGridProperties.rowSelection = this.gridApi.getSelectedRows().length > 1 ? 'single' : 'multiple';
  }

}
