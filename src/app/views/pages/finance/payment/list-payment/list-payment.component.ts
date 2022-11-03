import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { DocType, Permissions } from 'src/app/views/shared/AppEnum';
import { CreatePaymentComponent } from '../create-payment/create-payment.component';
import { PAYMENT } from 'src/app/views/shared/AppRoutes';
import { IPayment } from '../model/IPayment';
import { AppListComponentBase } from '../../../../shared/app-list-component-base';
import { AppConst } from "../../../../shared/AppConst";
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { colTextAmount, colDate, colDropDownStatus, colText } from 'src/app/views/shared/components/constants';
import { RaGridComponent } from 'src/app/views/shared/components/ra-grid/ra-grid.component';

@Component({
  selector: 'kt-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListPaymentComponent extends AppListComponentBase<IPayment> implements OnInit, OnDestroy {
  docType = DocType
  selectedDocType
  formName
  route
  documents = AppConst.Documents
  // subscription
  subscription$: Subscription
  pageName
  gridApi

  constructor(
    injector: Injector
  ) {
    super(injector);
    this.selectedDocType = this.activatedRoute.snapshot.data.docType;
    this.formName = this.pageName = this.documents.find(x => x.id === this.selectedDocType).value;
    this.route = this.documents.find(x => x.id === this.selectedDocType).route;
  }
  columnDefs = [
    colText({
      headerName: 'Doc #',
      field: 'docNo',
    }),
    colText({
      headerName: 'Business Partner',
      field: 'businessPartnerName',
    }),
    colDate.call(this, {
      headerName: 'Payment Date',
      field: 'paymentDate',
    }),
    colTextAmount.call(this,{
      headerName: 'Discount',
      field: 'discount',
    }),
    colTextAmount.call(this,{
      headerName: 'Sales Tax',
      field: 'salesTax',
    }),
    colTextAmount.call(this,{
      headerName: 'Income Tax',
      field: 'incomeTax',
    }),
    colTextAmount.call(this, {
      headerName: 'Net Payment',
      field: 'netPayment',
    }),
    colDropDownStatus({
      headerName: 'Status',
      field: 'status',
    })
  ];
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.paymentService,
      pageName: this.pageName,
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }

  ngOnDestroy() {
    if (this.subscription$) this.subscription$.unsubscribe()
  }

  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions[this.formName.toUpperCase() + '_EDIT']) || this.permission.isGranted(this.permissions[this.formName.toUpperCase() + '_VIEW'])) {
      this.router.navigate([PAYMENT.CONDITIONAL_ROUTE(this.route) + PAYMENT.ID_BASED_ROUTE('details', event.data.id)]);
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }
  @ViewChild('raGrid') grid: RaGridComponent;
  addPaymentDialog(id?: number): void {
    const dialogRef = this.dialog.open(CreatePaymentComponent, {
      width: '800px',
      data: { id, docType: this.selectedDocType }
    });
    // Recalling getPaymets function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      this.grid.gridReady()
    });
  }
}
