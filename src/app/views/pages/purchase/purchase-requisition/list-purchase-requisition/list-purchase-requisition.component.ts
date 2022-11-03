import { PURCHASE_REQUISITION } from '../../../../shared/AppRoutes';
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppListComponentBase } from "../../../../shared/app-list-component-base";
import { IPurchaseRequisition } from "../model/IPurchaseRequisition";
import { Permissions } from "../../../../shared/AppEnum";
import { colDate, colDropDownStatus, colText } from 'src/app/views/shared/components/constants';


@Component({
  selector: 'kt-list-purchase-order',
  templateUrl: './list-purchase-requisition.component.html',
  styleUrls: ['./list-purchase-requisition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListPurchaseRequisitionComponent extends AppListComponentBase<IPurchaseRequisition> implements OnInit {
  columnDefs = [
    colText({
      headerName: 'Requisition #',
      field: 'docNo',
    }),
    colText({
      headerName: 'Vendor',
      field: 'vendorName',
    }),
    colDate.call(this, {
      headerName: 'Requisition Date',
      field: 'requisitionDate',
    }),
    colDropDownStatus()
  ];

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.purchaseRequisitionService,
      pageName: 'PurchaseRequisitionPageNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }
  addPurchaseOrder() {
    this.router.navigate(['/' + PURCHASE_REQUISITION.CREATE]);
  }

  onRowDoubleClicked(event: any) {
    // TODO: remove true after permission implementation from backend.
    if (true || this.permission.isGranted(this.permissions.PURCHASEORDER_EDIT) || this.permission.isGranted(this.permissions.PURCHASEORDER_VIEW)) {
      this.router.navigate(['/' + PURCHASE_REQUISITION.ID_BASED_ROUTE('details', event.data.id)], { relativeTo: this.activatedRoute })
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }
}
