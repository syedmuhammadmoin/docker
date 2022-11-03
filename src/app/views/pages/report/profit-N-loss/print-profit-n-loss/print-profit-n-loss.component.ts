import { Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfitLossService } from "../service/profit-loss.service";
import { ProfitLossPrintService } from "../service/profit-loss-print.service";
import { AppComponentBase } from "../../../../shared/app-component-base";
import { IProfitLoss } from '../model/IProfitLoss';



@Component({
  selector: 'kt-print-profit-n-loss',
  templateUrl: './print-profit-n-loss.component.html',
  styleUrls: ['./print-profit-n-loss.component.scss']
})
export class PrintProfitNLossComponent extends AppComponentBase implements OnInit {

  netProfit = 0;
  isLoading = true;
  profitNlossModel: IProfitLoss = {} as IProfitLoss;
  profitnlossReport: any[] = [];
  rowData: any = [];


  constructor(
    injector: Injector,
    private profitLossService: ProfitLossService,
    public sanitizer: DomSanitizer,
    private printProfitNlossService: ProfitLossPrintService,
  ) {
    super(injector)
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const transactional = params.get('account') ?? '';
      const docDate = params.get('from') ?? '';
      const docDate2 = params.get('to') ?? '';
      const department = params.get('department') ?? '';
      const location = params.get('location') ?? '';
      const warehouse = params.get('warehouse') ?? '';

      this.profitNlossModel.docDate = docDate;
      this.profitNlossModel.docDate2 = docDate2;
      this.profitNlossModel.transactional = transactional != null ? transactional : 'All';
      this.profitNlossModel.department = department != null ? department : 'All';
      this.profitNlossModel.location = location != null ? location : 'All';
      this.profitNlossModel.warehouse = warehouse != null ? warehouse : 'All';
    })
  }

  ngOnInit(): void {
    this.printProfitNlossService.printprofitLossData
      .subscribe((res) => {
        if (res.length > 0) {
          this.rowData = this.groupBy(res, item => item.nature);
          this.isLoading = false;
          // this.balanceSheetReport = res.result
          this.calculateNetProfit(this.rowData);
          this.isLoading = false;
        }

      })
  }

  calculateNetProfit(res) {

    const income = this.calculateTotal(res.get('Income'), 'balance').balance;
    const expense = this.calculateTotal(res.get('Expenses'), 'balance').balance;

    this.netProfit = ((income) - (expense));
  }
}
