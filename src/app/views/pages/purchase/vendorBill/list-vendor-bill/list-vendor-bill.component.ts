import { BILL } from '../../../../shared/AppRoutes';
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppListComponentBase } from '../../../../shared/app-list-component-base';
import { IVendorBill } from '../model/IVendorBill';
import { Permissions } from "../../../../shared/AppEnum";
import { colTextAmount, colDate, colDropDownStatus, colText } from 'src/app/views/shared/components/constants';


@Component({
  selector: 'kt-list-vendor-bill',
  templateUrl: './list-vendor-bill.component.html',
  styleUrls: ['./list-vendor-bill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListVendorBillComponent extends AppListComponentBase<IVendorBill> implements OnInit {
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  columnDefs = [
    colText({
      headerName: 'Bill #',
      field: 'docNo',
    }),
    colText({
      headerName: 'Vendor Name',
      field: 'vendorName',
    }),
    colDate.call(this, {
      headerName: 'Bill Date',
      field: 'billDate',
    }),
    colDate.call(this, {
      headerName: 'Due Date',
      field: 'dueDate',
    }),
    colTextAmount.call(this, {
      headerName: 'Total', field: 'totalAmount',
    }),
    colDropDownStatus()
  ];
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.billService,
      pageName: 'vendorBill',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }
  addVendorBill() {
    this.router.navigate(['/' + BILL.CREATE]);
  }

  onRowDoubleClicked(event: any) {
    if (this.permission.isGranted(this.permissions.BILL_EDIT) || this.permission.isGranted(this.permissions.BILL_VIEW)) {
      this.router.navigate(['/' + BILL.ID_BASED_ROUTE('details', event.data.id)]);
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }

  agingReport() {
    this.router.navigate(['/' + BILL.AGING_REPORT]);
  }
}


