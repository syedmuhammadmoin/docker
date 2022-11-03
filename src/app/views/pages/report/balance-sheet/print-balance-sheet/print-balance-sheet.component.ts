import { Component, Injector, OnInit } from '@angular/core';
import { BalanceSheetService } from "../service/balance-sheet.service";
import { IBalanceSheet } from "../model/IBalanceSheet";



import { DomSanitizer } from '@angular/platform-browser';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { BalanceSheetPrintService } from '../service/balance-sheet-print.service';

@Component({
  selector: 'kt-print-balance-sheet',
  templateUrl: './print-balance-sheet.component.html',
  styleUrls: ['./print-balance-sheet.component.scss']
})
export class PrintBalanceSheetComponent extends AppComponentBase implements OnInit {

  isLoading = true;
  balanceSheetReport: any[] = []
  balanceSheetModel: IBalanceSheet = new IBalanceSheet()
  asset: any;
  equityNLiability: any;
  netProfit: any;
  rowData: any = [];
  date: string;

  constructor(
    injector: Injector,
    private balanceSheetService: BalanceSheetService,
    private balanceSheetPrintService: BalanceSheetPrintService,
  ) {
    super(injector);
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.date = param.get('endDate');

    });
  }

  ngOnInit(): void {
    this.balanceSheetPrintService.currentData.subscribe((res) => {
      if (res.length > 0) {
        this.rowData = this.groupBy(res, item => item.nature);
        this.isLoading = false;
        // this.balanceSheetReport = res.result
        // this.calculateNetProfit(this.rowData);
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    });
  }






  calculateNetProfit(res: any[]) {
    // Assets
    this.asset = this.valueFormatter(res.find(x => x.nature === 'ASSETS').totalBalance || 0)
    // Liability
    const liablity = res.find(x => x.nature.toString().toLowerCase().replace(/ /g, '') === 'liabilities').totalBalance || 0;
    // Equity
    const equity = res.find(x => x.nature.toString().toLowerCase().replace(/ /g, '') === 'accumulatedfund').totalBalance || 0;
    /*// Deficit / Surplus
    const netProfit = res.find(x => x.nature.toString().toLowerCase().replace(/ /g, '') === 'deficit/surplus').totalBalance || 0;*/
    // this.netProfit = netProfit
    this.equityNLiability = this.valueFormatter((equity) + (liablity))
  }


  // groupBy(arr, key) {
  //   return (arr || []).reduce((acc, x = {}) => ({
  //     ...acc,
  //     [x[key]]: [...acc[x[key]] || [], x]
  //   }), {})
  // }

  // groupByFunction(arr, ...keys) {
  //   let keysFieldName = keys.join(',');
  //   return arr.map(ele => {
  //     let keysField = {};
  //     keysField[keysFieldName] = keys.reduce((keyValue, key) => {
  //       return keyValue + ':' + ele[key]
  //     }, "");
  //     return Object.assign({}, ele, keysField);
  //   }).reduce((groups, ele) => {
  //     (groups[ele[keysFieldName]] = groups[ele[keysFieldName]] || [])
  //       .push([ele].map(e => {
  //         if (keys.length > 1) {
  //           delete e[keysFieldName];
  //         }
  //         return e;
  //       })[0]);
  //     return groups;
  //   }, {});
  // };

  // getKeys(map){
  //   let keys;
  //   if (map) {
  //     keys = Object.keys(map);
  //   }
  //   return keys || []
  // }
}
