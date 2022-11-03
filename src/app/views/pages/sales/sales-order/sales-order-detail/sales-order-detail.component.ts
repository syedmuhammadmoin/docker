import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {Params} from '@angular/router';
import {LayoutUtilsService} from '../../../../../core/_base/crud';
import {ActionButton, DocType, DocumentStatus} from 'src/app/views/shared/AppEnum';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {DISPATCH_NOTE, INVOICE, SALES_ORDER} from 'src/app/views/shared/AppRoutes';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {ISalesOrder} from '../model/ISalesOrder';
import {
  colSimple,
  colSimpleAmount,
  colSimpleAmountPercentage,
  colSimpleNumber
} from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-sales-order-detail',
  templateUrl: './sales-order-detail.component.html',
  styleUrls: ['./sales-order-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SalesOrderDetailComponent extends AppComponentBase implements OnInit {
  docType = DocType
  action = ActionButton
  docStatus = DocumentStatus

  // handling register payment button
  isDisabled: boolean;

  //kt busy loading
  isLoading: boolean;

  //need for routing
  salesOrderId: number;

  public SALES_ORDER = SALES_ORDER;
  public INVOICE = INVOICE;
  public DISPATCH_NOTE = DISPATCH_NOTE;

  salesOrderMaster: any;
  totalBeforeTax: number;
  totalTax: number;
  total: number;
  loader: boolean = true;

  columnDefs = [
    colSimple({
      headerName: 'Item', field: 'itemName'
    }),
    colSimple({
      headerName: 'Description', field: 'description'
    }),
    colSimpleNumber.call(this, {
      headerName: 'Quantity', field: 'quantity',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Price', field: 'price',
    }),
    colSimpleAmountPercentage.call(this, {
      headerName: 'Tax%', field: 'tax',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Sub total', field: 'subTotal',
    }),
    colSimple({
      headerName: 'Account', field: 'accountName'
    }),
    colSimple({
      headerName: 'Location', field: 'locationName'
    })
  ];

  constructor(
    private layoutUtilService: LayoutUtilsService,
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      style: {"height": "250px", "margin-top": "10px"},
    }
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      const id = +params.get('id');
      if (id) {
        this.getSalesOrderData(id);
        this.salesOrderId = id;
        this.cdRef.markForCheck();
      } else {
        this.layoutUtilService.showActionNotification('Cannot find record with out id parameter', null, 5000, true, false)
        this.router.navigate(['/sales-order/list'])
      }
    });
  }
  workflow(action: number) {
    this.isLoading = true
    this.salesOrderService.workflow({ action, docId: this.salesOrderMaster.id })
      .subscribe((res) => {
        this.getSalesOrderData(this.salesOrderId);
        this.isLoading = false;
        this.cdRef.detectChanges();
        this.toastService.success('' + res.message, 'sales Order');
      }, (err) => {
        this.isLoading = false;
        this.cdRef.detectChanges();
        this.toastService.error('' + err.error.message, 'sales Order')
      })
  }

  private getSalesOrderData(id: number) {
    this.salesOrderService.getSalesOrderById(id).subscribe((res: IApiResponse<ISalesOrder>) => {
      this.salesOrderMaster = res.result;
      this.raGridProperties.rowData = res.result.salesOrderLines;
      this.totalBeforeTax = this.salesOrderMaster.totalBeforeTax;
      this.totalTax = this.salesOrderMaster.totalTax;
      this.total = this.salesOrderMaster.totalAmount;
      this.cdRef.detectChanges()
    })
  }
}
