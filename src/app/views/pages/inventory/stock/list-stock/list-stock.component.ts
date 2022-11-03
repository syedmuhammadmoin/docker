import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StockService } from "../service/stock.service";
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { colSimple, colSimpleAmount, colSimpleNumber } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListStockComponent implements OnInit {
  constructor(private stockService: StockService) { }
  columnDefs = [
    colSimple({ headerName: 'Product', field: 'item.productName' }),
    colSimpleNumber.call(this, { headerName: 'Available Quantity', field: 'availableQty' }),
    colSimpleAmount.call(this, { headerName: 'Cost Price', field: 'costPrice' }),
    colSimple({ headerName: 'Location', field: 'location.name' }),
  ];
  raGridProperties: Partial<IRaGridProperties> = {
    columnDefs: this.columnDefs,
  }
  ngOnInit(): void {
    this.loadStockList()
  }
  onRowDoubleClicked(event: any) {
    // this.router.navigate(['/stock-detail', event.data.id], {relativeTo: this.activatedRoute})
  }

  private loadStockList() {
    this.stockService.getAllStocks().subscribe((res) => {
      this.raGridProperties.rowData = res.result
    })
  }
}
