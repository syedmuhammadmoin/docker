import { Component, Injector, OnInit } from '@angular/core';
import { TrialBalancePrintService } from "../service/trial-balance-print.service";
import { AppComponentBase } from "../../../../shared/app-component-base";

@Component({
  selector: 'kt-print-trial-balance',
  templateUrl: './print-trial-balance.component.html',
  styleUrls: ['./print-trial-balance.component.scss']
})
export class PrintTrialBalanceComponent extends AppComponentBase implements OnInit {
  from: string;
  to: string;
  account: string;
  department: string;
  location: string;
  warehouse: string;
  groupRowData: Map<any, any> = new Map<any, any>();
  rowData: any
  totals: any;


  constructor(
    private injector: Injector,
    private trialBalancePrintService: TrialBalancePrintService,
  ) {
    super(injector);
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.from = param.get('from');
      this.to = param.get('to');
      this.account = param.get('account');
      this.department = param.get('department');
      this.location = param.get('location');
      this.warehouse = param.get('warehouse');
    });
  }

  ngOnInit(): void {
    this.trialBalancePrintService.printTrialBalanceData.subscribe((res) => {
      this.rowData = res;
      this.groupRowData = this.groupBy(res, value => value.nature)
      this.totals = this.calculateTotal(this.rowData, 'credit', 'debit', 'creditOB', 'creditCB', 'debitOB', 'debitCB')
    });
  }
}
