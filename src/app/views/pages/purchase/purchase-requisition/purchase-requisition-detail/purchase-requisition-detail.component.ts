import { BILL, GOODS_RECEIVED_NOTE, PURCHASE_REQUISITION } from '../../../../shared/AppRoutes';
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { LayoutUtilsService } from '../../../../../core/_base/crud';
import { ActionButton, DocType, DocumentStatus, Permissions } from 'src/app/views/shared/AppEnum';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { colSimple, colSimpleNumber } from 'src/app/views/shared/components/constants';


@Component({
  selector: 'kt-purchase-order-detail',
  templateUrl: './purchase-requisition-detail.component.html',
  styleUrls: ['./purchase-requisition-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PurchaseRequisitionDetailComponent extends AppComponentBase implements OnInit {
  public PURCHASE_REQUISITION = PURCHASE_REQUISITION;
  public BILL = BILL;
  public GOODS_RECEIVED_NOTE = GOODS_RECEIVED_NOTE;

  docType = DocType;
  action = ActionButton;
  docStatus = DocumentStatus;

  requisitionMaster: any;

  totalBeforeTax: number;
  totalTax: number;
  total: number;

  loader = true;

  // need for routing
  requisitionId: number;

  // busy loading
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
    })
  ];


  constructor(
    private layoutUtilService: LayoutUtilsService,
    injector: Injector
  ) {
    super(injector);
  }
  raGridProperties: Partial<IRaGridProperties> = {
    columnDefs: this.columnDefs,
    style: {height: '250px', 'margin-top': '10px'}
  };
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.isLoading = true;
        this.getPurchaseMasterData(id);
        this.requisitionId = id;
        this.cdRef.markForCheck();
      } else {
        this.layoutUtilService.showActionNotification('Cannot find record with out id parameter', null, 5000, true, false);
        this.router.navigate(['/' + PURCHASE_REQUISITION.LIST]);
      }
    });
  }

  workflow(action: any) {
    this.isLoading = true;
    this.purchaseOrderService.workflow({ action, docId: this.requisitionMaster.id })
      .subscribe((res) => {
        this.getPurchaseMasterData(this.requisitionId);
        this.isLoading = false;
        this.cdRef.detectChanges();
        this.toastService.success('' + res.message, 'purchase Order');
      }, (err) => {
        this.isLoading = false;
        this.cdRef.detectChanges();
        this.toastService.error('' + err.error.message, 'purchase Order');
      });
  }

  private getPurchaseMasterData(id: number) {
    this.purchaseRequisitionService.getRequisitionMasterById(id).subscribe((res) => {
      this.requisitionMaster = res.result;
      this.raGridProperties.rowData = res.result.requisitionLines;
      this.isLoading = false;
      // this.totalBeforeTax = this.purchaseOrderMaster.totalBeforeTax;
      // this.totalTax = this.purchaseOrderMaster.totalTax;
      // this.total = this.purchaseOrderMaster.totalAmount;
      this.cdRef.detectChanges();
    }, (error => {
      this.isLoading = false;
    }));
  }
}
