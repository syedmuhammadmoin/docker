import { Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralLedgerPrintService } from '../service/general-ledger-print.service';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { AppConst } from "../../../../shared/AppConst";

@Component({
  selector: 'kt-print-general-ledger',
  templateUrl: './print-general-ledger.component.html',
  styleUrls: ['./print-general-ledger.component.scss']
})
export class PrintGeneralLedgerComponent extends AppComponentBase implements OnInit {

  docType = AppConst.DocTypeValue
  isLoading = true;
  rowData: Map<any, any> = new Map<any, any>()
  location: any;
  account: any;
  businessPartner: any;
  from: any;
  to: any;
  department: any;
  warehouse: any;
  organization: any;


  constructor(
    private injector: Injector,
    public sanitizer: DomSanitizer,
    private printLedgerService: GeneralLedgerPrintService,
  ) {
    super(injector);
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.businessPartner = param.get('businessPartner');
      this.location = param.get('location');
      this.account = param.get('account');
      this.from = param.get('from');
      this.to = param.get('to');
      this.department = param.get('department');
      this.warehouse = param.get('warehouse');
      this.organization = param.get('organization');


    });
    // this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.printLedgerService.currentData.subscribe((res) => {
      if (res.length > 0) {
        this.rowData = this.groupBy(res, item => item.accountName);
        this.isLoading = false;
      }
    });
  }
}
