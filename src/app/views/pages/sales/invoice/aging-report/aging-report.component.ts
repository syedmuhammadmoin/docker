import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { ICellRendererParams, RowDoubleClickedEvent } from 'ag-grid-community';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { INVOICE } from 'src/app/views/shared/AppRoutes';
import { IApiResponse } from 'src/app/views/shared/IApiResponse';
import { IInvoice } from '../model/IInvoice';

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
      field: 'customerName',
      rowGroup: true,
      hide: true,
    },
    {
      headerName: 'Invoice #',
      field: 'docNo',
    },
    {
      field: 'invoiceDate',
      valueGetter: (params: ICellRendererParams) => {
        if (params.data) {
          const date = params.data.invoiceDate != null ? params.data.invoiceDate : null;
          return date == null || this.transformDate(date, 'MMM d, y');
        }
      }
    },
    {
      headerName: '1 - 30 Days',
      field: 'invoiceDate',
      aggFunc: 'sum',
      valueGetter: (params: ICellRendererParams) => {
        if (params.data) {
          const days = this.getDays(params.data.invoiceDate);
          if (days <= 30) { return this.valueFormatter(params.data.pendingAmount); };

        }
      },
    },
    {
      headerName: '31 - 60 Days',
      field: 'invoiceDate',
      aggFunc: 'sum',
      valueGetter: (params: ICellRendererParams) => {
        if (params.data) {
          const days = this.getDays(params.data.invoiceDate);
          if (days > 30 && days <= 60) { return this.valueFormatter(params.data.pendingAmount); };
        }
      }
    },
    {
      headerName: '61 - 90 Days',
      field: 'invoiceDate',
      aggFunc: 'sum',
      valueGetter: (params: ICellRendererParams) => {
        if (params.data) {
          const days = this.getDays(params.data.invoiceDate);
          if (days > 60 && days <= 90) { return this.valueFormatter(params.data.pendingAmount); };
        }
      }
    },
    {
      headerName: 'Above 90 Days',
      field: 'invoiceDate',
      aggFunc: 'sum',
      valueGetter: (params: ICellRendererParams) => {
        if (params.data) {
          const days = this.getDays(params.data.invoiceDate);
          if (days > 90) { return this.valueFormatterAmount(params.data.pendingAmount) };
        }
      }
    },
    {
      headerName: 'Outstanding Amount',
      field: 'pendingAmount',
      valueFormatter: (params) => this.valueFormatterAmount(params.value),
      aggFunc: 'sum',
    },
  ];
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this,
      autoGroupColumnDef: {
        headerName: 'Customer',
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
    if (event.data) this.router.navigate(['/' + INVOICE.ID_BASED_ROUTE('details', event.data.id)]);
  }

  getDays(date: Date) {
    const invoiceDate = new Date(this.transformDate(date, 'MMM d, y'));
    const currentDate = new Date(new Date().toJSON().slice(0, 10).replace(/-/g, '/'));
    const Time = currentDate.getTime() - invoiceDate.getTime();
    const Days = Time / (1000 * 3600 * 24);
    return Days;
  }

  onGridReady() {
    this.invoiceService.getAgingReport().subscribe((data: IApiResponse<IInvoice[]>) => {
      this.raGridProperties.rowData = data.result;
      this.cdRef.detectChanges();
    });
  }
}
