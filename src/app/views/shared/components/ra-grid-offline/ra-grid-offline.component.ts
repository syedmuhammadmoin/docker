import { Component, OnInit, Input, Injector } from '@angular/core';
import { merge }  from 'lodash';
import { PaginationHelperService } from 'src/app/views/store/pagination/pagination-helper.service';
import { BtnGridComponent } from '../btn-grid/btn-grid.component';
import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component';
import { IRaGridProperties } from '../interfaces/ra-grid-properties.interface';

@Component({
  selector: 'kt-ra-grid-offline',
  templateUrl: './ra-grid-offline.component.html',
  styleUrls: ['./ra-grid-offline.component.scss'],
  host: {class: 'col-lg-12 col-md-12 my-5 col-sm-12'}
})
export class RaGridOfflineComponent implements OnInit {
  @Input() public raGridProperties: IRaGridProperties;
  gridApi: any
  columnApi: any
  paginationHelper: PaginationHelperService
  constructor(public injector: Injector) {
    this.paginationHelper = this.injector.get(PaginationHelperService)
  }
  ngOnInit(): void {
    this.initTable();
  }
  initTable() {
    this.beforeInitTable()
    merge(this.raGridProperties, {
      rowData: [],
      firstDataRendered: this.onFirstDataRendered,
      ...this.raGridProperties,
      gridOptions: {
        rowStyle: { color: 'black' },
        rowHeight: 40,
        headerHeight: 35,
        tooltipMouseTrack: true,
        tooltipShowDelay: 0.2,
        context: 'double click to view details',

        ...this.raGridProperties.gridOptions
      }
    })
  }
  beforeInitTable(){
    // this.raGridProperties.gridOptions = {
    // }
    this.raGridProperties.columnDefs[0] = {
      ...this.raGridProperties.columnDefs[0],
      cellRenderer: 'loadingCellRenderer',
    }
    if(!this.raGridProperties.rowDoubleClicked) {
      this.raGridProperties.rowDoubleClicked = () => {}
    }
    this.raGridProperties.frameworkComponents = {
      customTooltip: CustomTooltipComponent,
      gridAction: BtnGridComponent
    }

  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  setApi(params?: any): void {
    this.gridApi = params?.api
    this.columnApi = params?.columnApi
  }
}
