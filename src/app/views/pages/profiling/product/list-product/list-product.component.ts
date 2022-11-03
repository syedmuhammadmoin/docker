import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { AppConst } from 'src/app/views/shared/AppConst';
import { CreateProductComponent } from '../create-product/create-product.component';
import { IProduct } from '../model/IProduct';
import { AppListComponentBase } from '../../../../shared/app-list-component-base';
import { Permissions } from "../../../../shared/AppEnum";
import { colSimple, colSimpleAmount, colSimpleAmountPercentage, colText } from 'src/app/views/shared/components/constants';
import { RaGridComponent } from 'src/app/views/shared/components/ra-grid/ra-grid.component';

@Component({
  selector: 'kt-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListProductComponent extends AppListComponentBase<IProduct> implements OnInit {
  constructor(
    inject: Injector,
  ) {
    super(inject)
  }

  columnDefs = [
    colText({
      headerName: 'Name',
      field: 'productName',
    }),
    colSimple.call(this, {
      headerName: 'Purchase / Sold', field: 'purchasedOrSold',
      valueFormatter: (params) => AppConst.PurchasedOrSold[params.value]
    }),
    colSimple.call(this, {
      headerName: 'Type', field: 'productType',
      valueFormatter: (params) => AppConst.ConsumableOrService[params.value]
    }),
    colSimple({
      headerName: 'Category',
      field: 'categoryName',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Sale Price',
      field: 'salesPrice',
    }),
    colSimpleAmount.call(this, {
      headerName: 'Cost',
      field: 'cost',
    }),
    colSimpleAmountPercentage.call(this, {
      headerName: 'Sales Tax',
      field: 'salesTax',
    })
  ];
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.productService,
      pageName: 'ProductPageNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }

  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions.PRODUCT_EDIT) || this.permission.isGranted(this.permissions.PRODUCT_VIEW)) {
      this.openDialog(event.data.id)
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }
  @ViewChild('raGrid', { static: true }) grid: RaGridComponent;
  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '800px',
      data: id
    });
    // Recalling getProducts function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      this.grid.gridReady()
    });
  }
}
