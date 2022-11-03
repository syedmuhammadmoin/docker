import {Component, OnInit} from '@angular/core';
import {merge} from 'lodash';
import {CustomTooltipComponent} from '../custom-tooltip/custom-tooltip.component';
import {IRaGridProperties} from '../interfaces/ra-grid-properties.interface';
import {RaGridOfflineComponent} from '../ra-grid-offline/ra-grid-offline.component';

@Component({
  selector: 'kt-ra-grid',
  templateUrl: './ra-grid.component.html',
  styleUrls: ['./ra-grid.component.scss'],
  host: {class: 'col-lg-12 col-md-12 my-5 col-sm-12'}
})
export class RaGridComponent extends RaGridOfflineComponent implements OnInit {
  initTable() {
    this.beforeInitTable();
    merge(this.raGridProperties, {
      // class: 'ag-theme-alpine',
      // style: 'width: 100%; height: 500px; margin-top: 10px;',
      tooltipShowDelay: 5,
      firstDataRendered: this.onFirstDataRendered,
      frameworkComponents: {customTooltip: CustomTooltipComponent},
      components: {
        loadingCellRenderer: (params) => {
          return params.value || '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
        }
      },
      ...this.raGridProperties,
      gridOptions: {
        cacheBlockSize: 20,
        rowModelType: 'infinite',
        paginationPageSize: 10,
        pagination: true,
        context: 'double click to view details',
        headerHeight: 35,
        rowHeight: 40,
        ...this.raGridProperties.gridOptions
      }
    });
  }

  gridReady(params?: any, raGridProperties: IRaGridProperties = this.raGridProperties) {
    this.gridApi.setRowData = () => {}
    this.gridApi.setDatasource({
      getRows: (params: any) => {
        raGridProperties.service.getRecords(params, raGridProperties.pageName).subscribe((data) => {
          raGridProperties.rowData = data.result;
          params.successCallback(data.result || 0, data.totalRecords);
          this.paginationHelper.goToPage(this.gridApi, raGridProperties.pageName);
          if (raGridProperties?.serviceCallBack) {
            raGridProperties.serviceCallBack();
          }
        });
      },
    });
  }
}

// @ViewChild('raGrid', { static: true }) grid: RaGridComponent;
// this.grid.gridReady()
// <kt-ra-grid #raGrid [raGridProperties]="raGridProperties"></kt-ra-grid>
// raGridProperties: Partial<IRaGridProperties>;
// ngOnInit() {
//   this.raGridProperties = {
//     columnDefs: this.columnDefs,
//     service: this.paymentService,
//     pageName: this.pageName,
//     rowDoubleClicked: this.onRowDoubleClicked.bind(this),
//     componentParent: this
//   }
// }

