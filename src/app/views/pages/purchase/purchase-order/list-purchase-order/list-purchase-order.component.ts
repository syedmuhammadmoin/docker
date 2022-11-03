import {PURCHASE_ORDER} from '../../../../shared/AppRoutes';
import {Component, Injector, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {colDate, colDropDownStatus, colText, colTextAmount} from 'src/app/views/shared/components/constants';
import {IRaGridProperties} from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';


@Component({
  selector: 'kt-list-purchase-order',
  templateUrl: './list-purchase-order.component.html',
  styleUrls: ['./list-purchase-order.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListPurchaseOrderComponent extends AppComponentBase implements OnInit {
  constructor(
    injector: Injector,
  ) {
    super(injector)
  }

  columnDefs: ColDef[] = [
    colText({
      headerName: 'PO #',
      field: 'docNo',
    }),
    colText({
      headerName: 'Vendor',
      field: 'vendorName',
    }),
    colDate.call(this, {
      headerName: 'Order Date',
      field: 'poDate',
    }),
    colDate.call(this, {
      headerName: 'Due Date',
      field: 'dueDate',
    }),
    colTextAmount.call(this, {
      headerName: 'Total',
      field: 'totalAmount',
    }),
    colDropDownStatus()
  ];
  raGridProperties: Partial<IRaGridProperties>

  ngOnInit(): void {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      pageName: 'PurchaseOrderPageNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      service: this.purchaseOrderService,
      componentParent: this
    }
  }

  addPurchaseOrder() {
    this.router.navigate(['/' + PURCHASE_ORDER.CREATE]);
  }

  onRowDoubleClicked(event: any) {
    // TODO: remove true after permission implementation from backend.
    if (
      this.permission.isGranted(this.permissions.PURCHASEORDER_EDIT) ||
      this.permission.isGranted(this.permissions.PURCHASEORDER_VIEW)) {
      this.router.navigate(
        ['/' + PURCHASE_ORDER.ID_BASED_ROUTE('details', event.data.id)],
        {relativeTo: this.activatedRoute}
      )
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }
}



