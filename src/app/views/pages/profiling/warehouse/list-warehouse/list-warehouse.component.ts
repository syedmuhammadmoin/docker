import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { CreateWarehouseComponent } from '../create-warehouse/create-warehouse.component';
import { IWarehouse } from '../model/IWarehouse';
import { AppListComponentBase } from '../../../../shared/app-list-component-base';
import { Permissions } from "../../../../shared/AppEnum";
import { RaGridComponent } from 'src/app/views/shared/components/ra-grid/ra-grid.component';
import { colSimple, colText } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-warehouse',
  templateUrl: './list-warehouse.component.html',
  styleUrls: ['./list-warehouse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListWarehouseComponent extends AppListComponentBase<IWarehouse> implements OnInit {
  constructor(
    injector: Injector,
    public dialog: MatDialog
  ) {
    super(injector);
  }

  columnDefs = [
    colText({
      headerName: 'Name',
      field: 'name',
    }),
    colSimple({
      headerName: 'Country',
      field: 'country',
    }),
    colSimple({
      headerName: 'State',
      field: 'state',
    }),
    colSimple({
      headerName: 'City',
      field: 'city',
    }),
    colSimple({
      headerName: 'Manager',
      field: 'manager',
    }),
    colSimple({
      headerName: 'Department',
      field: 'departmentName',
    })
  ];

  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.warehouseService,
      pageName: 'WarehousePageNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }

  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions.WAREHOUSE_VIEW) || this.permission.isGranted(this.permissions.WAREHOUSE_EDIT)) {
      this.openDialog(event.data.id)
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }
  @ViewChild('raGrid', { static: true }) grid: RaGridComponent;
  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(CreateWarehouseComponent, {
      width: '800px',
      data: id
    });
    // Recalling getWarehouses function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      this.grid.gridReady()
    });
  }
}
