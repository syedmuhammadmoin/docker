import { INVENTORY_ADJUSTMENT } from './../../../../shared/AppRoutes';
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { InventoryAdjustmentService } from '../service/inventory-adjustment.service';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { colSimple, colSimpleDate } from 'src/app/views/shared/components/constants';
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';

@Component({
  selector: 'kt-list-inventory-adjustment',
  templateUrl: './list-inventory-adjustment.component.html',
  styleUrls: ['./list-inventory-adjustment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListInventoryAdjustmentComponent extends AppComponentBase implements OnInit {
  adjustmentList: any;
  constructor(private IAdjustmentService: InventoryAdjustmentService,
    injector: Injector) {
    super(injector)
  }

  columnDefs = [
    colSimple({
      headerName: 'User', field: 'employee'
    }),
    colSimpleDate.call(this, {
      headerName: 'Adjustment Date', field: 'adjustmentDate',
    }),
    colSimple({
      headerName: 'Contact', field: 'contact',
    }),
    colSimple({
      headerName: 'Adjustment Nature', field: 'adjustmentNature',
    }),
    colSimple({
      headerName: 'Status', field: 'status',
    })
  ];

  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.paymentService,
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
    this.loadIAdjustmentList();
  }
  addInventoryAdjustment() {
    this.router.navigate(['/' + INVENTORY_ADJUSTMENT.CREATE]);
  }

  onRowDoubleClicked(event: any) {
    this.router.navigate(['/' + INVENTORY_ADJUSTMENT.ID_BASED_ROUTE('details', event.data.id)]);
  }

  loadIAdjustmentList() {
    this.IAdjustmentService.getInventoryAdjustments().subscribe(
      (res) => {
        this.raGridProperties.rowData = res.result;
        this.cdRef.markForCheck();
      },
      (err: any) => {  })
  }
}
