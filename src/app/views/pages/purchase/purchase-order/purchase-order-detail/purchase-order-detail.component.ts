import { Component, Injector, OnInit } from '@angular/core';
import { ActionButton, DocType, DocumentStatus } from 'src/app/views/shared/AppEnum';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import {
  colSimple,
  colSimpleAmount,
  colSimpleAmountPercentage,
  colSimpleNumber
} from 'src/app/views/shared/components/constants';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { PURCHASE_ORDER, BILL, GOODS_RECEIVED_NOTE } from 'src/app/views/shared/AppRoutes';


@Component({
  selector: 'kt-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.scss'],
})

export class PurchaseOrderDetailComponent extends AppComponentBase implements OnInit {
  //routing
  public PURCHASE_ORDER = PURCHASE_ORDER;
  public BILL = BILL;
  public GOODS_RECEIVED_NOTE = GOODS_RECEIVED_NOTE

  docType = DocType
  action = ActionButton
  docStatus = DocumentStatus

  purchaseOrderMaster: any;
  totalBeforeTax: number;
  totalTax: number;
  total: number;

  //need for routing
  purchaseOrderId: number;

  //busy loading
  isLoading: boolean;

  columnDefs = [
    colSimple({
      headerName: 'Item', field: 'itemName',
    }),
    colSimple({
      headerName: 'Description', field: 'description',
    }),
    colSimpleNumber.call(this, {
      headerName: 'Quantity', field: 'quantity',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Cost', field: 'cost',
    }),
    colSimpleAmountPercentage.call(this, {
      headerName: 'Tax%', field: 'tax',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Sub total', field: 'subTotal',
    }),
    colSimple({
      headerName: 'Account', field: 'accountName',
    }),
    colSimple({
      headerName: 'Location', field: 'locationName',
    }),
  ];

  constructor(
    private layoutUtilService: LayoutUtilsService,
    injector: Injector
  ) {
    super(injector)
  }

  raGridProperties: Partial<IRaGridProperties> = {
    columnDefs: this.columnDefs,
    style: {"height": "250px", "margin-top": "10px"},
      gridOptions: {
      suppressHorizontalScroll: true
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.isLoading = true;
        this.getPurchaseMasterData(id);
        this.purchaseOrderId = id;
        this.cdRef.markForCheck();
      } else {
        this.layoutUtilService.showActionNotification('Cannot find record with out id parameter', null, 5000, true, false)
        this.router.navigate(['/' + PURCHASE_ORDER.LIST])
      }
    });
  }

  workflow(action: any) {
    this.isLoading = true
    this.purchaseOrderService.workflow({ action, docId: this.purchaseOrderMaster.id })
      .subscribe(
        (res) => {
          this.getPurchaseMasterData(this.purchaseOrderId);
          this.toastService.success(res.message, 'purchase Order');
        },
        (err) => {
          this.toastService.error(err.error.message, 'purchase Order')
        },
        () => {
          this.isLoading = false;
        }
      )
  }

  private getPurchaseMasterData(id: number) {
    this.purchaseOrderService.getPurchaseMasterById(id).subscribe((res) => {
      this.purchaseOrderMaster = res.result;
      this.totalBeforeTax = this.purchaseOrderMaster.totalBeforeTax;
      this.raGridProperties.rowData = res.result.purchaseOrderLines
      this.totalTax = this.purchaseOrderMaster.totalTax;
      this.total = this.purchaseOrderMaster.totalAmount;
      this.cdRef.detectChanges();
    },
      (err) => this.toastService.error('' + err.error.message, 'purchase Order'),
      () => {
        this.isLoading = false;
      })
  }
}
