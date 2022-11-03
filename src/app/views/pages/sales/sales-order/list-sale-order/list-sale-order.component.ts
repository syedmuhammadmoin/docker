import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { SALES_ORDER } from 'src/app/views/shared/AppRoutes';
import { ISalesOrder } from '../model/ISalesOrder';
import { AppListComponentBase } from "../../../../shared/app-list-component-base";
import { Permissions } from "../../../../shared/AppEnum";
import { colDate, colDropDownStatus, colSimple, colSimpleAmount, colText } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-sale-order',
  templateUrl: './list-sale-order.component.html',
  styleUrls: ['./list-sale-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListSaleOrderComponent extends AppListComponentBase<ISalesOrder> implements OnInit {

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  columnDefs = [
    colText({
      headerName: 'SO #', field: 'docNo',
    }),
    colText({
      headerName: 'Customer', field: 'customerName',
    }),
    colDate.call(this, {
      headerName: 'Order Date', field: 'soDate',
    }),
    colDate.call(this, {
      headerName: 'Due Date', field: 'dueDate',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Total', field: 'totalAmount',
    }),
    colDropDownStatus()
  ];
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.salesOrderService,
      pageName: 'SalesOrderPageNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }
  addSalesOrder() {
    this.router.navigate(['/' + SALES_ORDER.CREATE]);
  }

  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    this.router.navigate(['/' + SALES_ORDER.ID_BASED_ROUTE('details', event.data.id)], { relativeTo: this.activatedRoute })
  }
}
