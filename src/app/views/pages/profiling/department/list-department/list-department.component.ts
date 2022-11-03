import { ChangeDetectionStrategy, ViewChild, Component, Injector, OnInit } from '@angular/core';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { CreateDepartmentComponent } from '../create-department/create-department.component';
import { AppListComponentBase } from '../../../../shared/app-list-component-base';
import { IDepartment } from '../model/IDepartment';
import { RaGridComponent } from 'src/app/views/shared/components/ra-grid/ra-grid.component';
import { colSimple, colText } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListDepartmentComponent extends AppListComponentBase<IDepartment> implements OnInit {
  constructor(
    injector: Injector,
    public dialog: MatDialog,
  ) {
    super(injector);
  }

  columnDefs = [
    colText({
      headerName: 'Name',
      field: 'name',
    }),
    colSimple({
      headerName: 'H.O.D',
      field: 'headOfDept',
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
      headerName: 'Address',
      field: 'address',
    }),
  ];

  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.departmentService,
      pageName: 'DepartmentPageNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this,
    };
  }

  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions.DEPARTMENTS_VIEW) || this.permission.isGranted(this.permissions.DEPARTMENTS_EDIT)) {
      this.openDialog(event.data.id)
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }

  @ViewChild('raGrid') grid: RaGridComponent;
  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(CreateDepartmentComponent, {
      width: '800px',
      data: id
    });
    dialogRef.afterClosed().subscribe(() => {
      this.grid.gridReady()
    });
  }

}
