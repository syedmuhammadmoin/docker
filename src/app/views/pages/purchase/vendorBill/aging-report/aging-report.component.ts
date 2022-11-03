import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {ICellRendererParams, RowDoubleClickedEvent} from 'ag-grid-community';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {IPaginationResponse} from 'src/app/views/shared/IPaginationResponse';
import {IVendorBill} from '../model/IVendorBill';


@Component({
  selector: 'kt-aging-report',
  templateUrl: './aging-report.component.html',
  styleUrls: ['./aging-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AgingReportComponent extends AppComponentBase implements OnInit {
  constructor(injector: Injector) {
    super(injector)
  }
  columnDefs = [
    {
      field: 'vendorName',
      rowGroup: true,
      hide: true,
    },
    {
      headerName: 'Bill #',
      field: 'docNo',
    },
    {
      field: 'billDate',
      valueGetter: (params: ICellRendererParams) => {
        if (params.data) {
          const date = params.data.billDate != null ? params.data.billDate : null;
          return date == null || this.transformDate(date, 'MMM d, y');
        }
      }
    },
    {
      headerName: '1 - 30 Days',
      field: 'billDate',
      aggFunc: 'sum',
      valueGetter: (params: ICellRendererParams) => {
        if (params.data) {
          const days = this.getDays(params.data.billDate);
          if (days <= 30) return this.valueFormatterAmount(params.data.pendingAmount);

        }
      },
    },
    {
      headerName: '31 - 60 Days',
      field: 'billDate',
      aggFunc: 'sum',
      valueGetter: (params: ICellRendererParams) => {
        if (params.data) {
          const days = this.getDays(params.data.billDate);
          if (days > 30 && days <= 60) return this.valueFormatterAmount(params.data.pendingAmount);
        }
      }
    },
    {
      headerName: '61 - 90 Days',
      field: 'billDate',
      aggFunc: 'sum',
      valueGetter: (params: ICellRendererParams) => {
        if (params.data) {
          const days = this.getDays(params.data.billDate);
          if (days > 60 && days <= 90) return this.valueFormatterAmount(params.data.pendingAmount);
        }
      }
    },
    {
      headerName: 'Above 90 Days',
      field: 'billDate',
      aggFunc: 'sum',
      valueGetter: (params: ICellRendererParams) => {
        if (params.data) {
          const days = this.getDays(params.data.billDate);
          if (days > 90) return this.valueFormatterAmount(params.data.pendingAmount);
        }
      }
    },
    {
      headerName: 'Outstanding Amount',
      field: 'pendingAmount',
      valueFormatter: (params: ICellRendererParams) => { return this.valueFormatter(params.value) },
      aggFunc: 'sum',
    },
  ];
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this,
      autoGroupColumnDef: {
        headerName: 'Vendor',
        minWidth: 200,
        cellRendererParams: {
          suppressCount: true,
          checkbox: false,
        },
      }
    }
    this.onGridReady()
  }
  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (event.data) this.router.navigate(['/vendor-bill/detail/', event.data.id]);
  }

  getDays(date: Date) {
    const billDate = new Date(this.transformDate(date, 'MMM d, y'));
    const currentDate = new Date(new Date().toJSON().slice(0, 10).replace(/-/g, '/'));
    const Time = currentDate.getTime() - billDate.getTime();
    const Days = Time / (1000 * 3600 * 24);
    return Days;
  }

  onGridReady() {

    this.billService.getBillAgingReport().subscribe((data: IPaginationResponse<IVendorBill[]>) => {
      this.raGridProperties.rowData = data.result
      this.cdRef.detectChanges();
    });
  }
}

