import { INVENTORY_ADJUSTMENT } from './../../../../shared/AppRoutes';
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { InventoryAdjustmentService } from '../service/inventory-adjustment.service';
import { LayoutUtilsService } from '../../../../../core/_base/crud';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { colSimple, colSimpleAmount, colSimpleNumber } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-inventory-adjustment-details',
  templateUrl: './inventory-adjustment-details.component.html',
  styleUrls: ['./inventory-adjustment-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InventoryAdjustmentDetailsComponent extends AppComponentBase implements OnInit {
  // For Loading
  isLoading: boolean;
  //inventory adjustment master
  adjustmentMaster: any;
  // inventory adjustment lines
  constructor(
    injector: Injector,
    private adjustmentService: InventoryAdjustmentService,
    private layoutUtilService: LayoutUtilsService
  ) { super(injector) }

  // columns for inventory adjustment lines
  columnDefs = [
    colSimple({
      headerName: 'Item', field: 'item.productName'
    }),
    colSimple({
      headerName: 'Description', field: 'description',
    }),
    colSimpleNumber.call(this, {
      headerName: 'Quantity', field: 'quantity',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Price', field: 'price'
    }),
    colSimple({
      headerName: 'Location', field: 'location.name'
    })
  ];

  // ng on init method implementation
  ngOnInit(): void {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      style: {"height": "250px", "margin-top": "10px"}
    }
    // get data from route
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.getAdjustmentMasterData(id);
        this.cdRef.markForCheck();
      } else {
        this.layoutUtilService.showActionNotification('Cannot find record with out id parameter', null, 5000, true, false)
        this.router.navigate(['/' + INVENTORY_ADJUSTMENT.LIST])
      }
    });
  }

  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }

  // defination of inventory adjustment method
  private getAdjustmentMasterData(id: number) {
    this.isLoading = true
    this.adjustmentService.getInventoryAdjustmentMaster(id).subscribe((res) => {
      this.adjustmentMaster = res.result;
      this.raGridProperties.rowData = this.adjustmentMaster.inventoryAdjustmentLines
      this.isLoading = false;
      this.cdRef.markForCheck();
    }, (error => {
    }))
  }
}
