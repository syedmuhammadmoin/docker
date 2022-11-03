import { ChangeDetectionStrategy, ViewChild, Component, Injector, OnInit } from '@angular/core';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { CreateLocationComponent } from '../create-location/create-location.component';
import { AppListComponentBase } from '../../../../shared/app-list-component-base';
import { ILocation } from '../model/ILocation';
import { Permissions } from "../../../../shared/AppEnum";
import { RaGridComponent } from 'src/app/views/shared/components/ra-grid/ra-grid.component';
import { colSimple, colText } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListLocationComponent extends AppListComponentBase<ILocation> implements OnInit {
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
      headerName: 'Dimensions',
      field: 'dimensions',
    }),
    colSimple({
      headerName: 'Supervisor',
      field: 'supervisor',
    }),
    colText({
      headerName: 'Warehouse',
      field: 'warehouseName',
    })
  ];
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.locationService,
      pageName: 'LocationPageNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }
  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions.LOCATION_VIEW) || this.permission.isGranted(this.permissions.LOCATION_EDIT)) {
      this.openDialog(event.data.id)
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }
  @ViewChild('raGrid', { static: true }) grid: RaGridComponent;
  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(CreateLocationComponent, {
      width: '800px',
      data: id
    });
    // Recalling getLocations function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      this.grid.gridReady()
    });
  }
}
