import { ChangeDetectionStrategy, Component, Injector, ViewChild } from '@angular/core';
import {
  RowDoubleClickedEvent
} from 'ag-grid-community';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { ICategory } from '../model/ICategory';
import { AppListComponentBase } from '../../../../shared/app-list-component-base';
import { Permissions } from "../../../../shared/AppEnum";
import { colSimple, colSimpleAmount, colText } from 'src/app/views/shared/components/constants';
import { RaGridComponent } from 'src/app/views/shared/components/ra-grid/ra-grid.component';

@Component({
  selector: 'kt-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListCategoryComponent extends AppListComponentBase<ICategory> {
  constructor(injector: Injector) {
    super(injector)
  }

  // defaults columns
  columnDefs = [
    colText({
      headerName: 'Name', field: 'name',
    }),
    colSimple.call(this, {
      headerName: 'Inventory Account', field: 'inventoryAccount',
    }),
    colSimple.call(this, {
      headerName: 'Revenue Account', field: 'revenueAccount',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Cost Account', field: 'costAccount',
    })
  ];

ngOnInit(){
  this.raGridProperties=  {
    columnDefs: this.columnDefs,
    service: this.categoryService,
    pageName: 'CategoryPageNumber',
    rowDoubleClicked: this.onRowDoubleClicked.bind(this),
    componentParent: this
  }
}
  // called when double clicked on record
  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions.CATEGORIES_VIEW) || this.permission.isGranted(this.permissions.CATEGORIES_EDIT)) {
      this.openDialog(event.data.id)
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }

  @ViewChild('raGrid') grid: RaGridComponent;
  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '800px',
      data: id
    });
    // Recalling getCategories function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      this.grid.gridReady()
    });
  }
}



