import {NgxsCustomService} from './../../../../shared/services/ngxs-service/ngxs-custom.service';
import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {FormGroup, NgForm, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {BalanceSheetService} from '../service/balance-sheet.service';
import {isEmpty} from 'lodash';
import {IBalanceSheet} from '../model/IBalanceSheet';
import {BalanceSheetPrintService} from '../service/balance-sheet-print.service';


@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss'],
  providers: [NgxsCustomService]
})
export class BalanceSheetComponent extends AppComponentBase implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  balanceSheetForm: FormGroup;
  equityNLiability = '0';
  asset = '0';

  // Busy Loading
  isLoading: boolean;
  // data for PDF
  recordsData: any = [];
  disability = true;
  // Validation Messages
  validationMessages = {
    docDate: {
      required: 'Date is required'
    },
  };

  // Error keys for validation messages
  formErrors = {
    docDate: '',
  };

  constructor(
    // injecting services
    private injector: Injector,
    private balanceSheetService: BalanceSheetService,
    private balanceSheetPrintService: BalanceSheetPrintService,
    public ngxsService: NgxsCustomService
  ) {
    super(injector);

  }
  columnDefs = [
    {
      headerName: 'Nature',
      field: 'nature',
      rowGroup: true,
      hide: true
    },
    {
      headerName: 'Transactional',
      field: 'transactional',
    },
    {
      headerName: 'Debit (Rs)',
      field: 'debit',
      aggFunc: 'sum',
      valueFormatter: (param) => {
        return this.valueFormatterAmount(param.value, '+ve');
      }
    },
    {
      headerName: 'Credit (Rs)',
      field: 'credit',
      aggFunc: 'sum',
      valueFormatter: (param) => {
        return this.valueFormatterAmount(param.value, '-ve');
      }
    },
    {
      headerName: 'Total',
      field: 'balance',
      aggFunc: 'sum',
      valueFormatter: (param) => {
        return this.valueFormatterAmount(param.value);
      }

    },
  ];
  // ng oninit
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      autoGroupColumnDef: {
        headerName: 'Nature',
        filter: true,
        minWidth: 300,
        menuTabs: ['filterMenuTab'],
        cellRendererParams: {
          suppressCount: true,
        },
        filterValueGetter: (params) => {
          return params.data.nature;
        }
      }
    };
    // creating balance sheet form
    this.balanceSheetForm = this.fb.group({
      docDate: ['', [Validators.required]],
      businessPartner: [null],
      department: [null],
      warehouse: [null],
      location: [null],
      organization: [null],
      transactional: [null],
    });

    // get Ware house location from state
    this.ngxsService.getWarehouseFromState();
    // get Accounts of level 4 from state
    this.ngxsService.getAccountLevel4FromState();
    // get location from state
    this.ngxsService.getLocationFromState();
    // get department from state
    this.ngxsService.getDepatmentFromState();
  }
  // called when form is submit by clicking on submit button
  onSubmit() {
    this.balanceSheetForm.markAllAsTouched();
    if (this.balanceSheetForm.invalid) {
      this.logValidationErrors(this.balanceSheetForm, this.formErrors, this.validationMessages);
      return;
    }
    const balanceSheetModel = { ...this.balanceSheetForm.value } as IBalanceSheet;
    balanceSheetModel.docDate = this.transformDate(this.balanceSheetForm.value.docDate, 'yyyy-MM-dd');
    this.isLoading = true;
    this.balanceSheetService.getBalanceSheetReport(balanceSheetModel)
      .pipe(
        map((x: any) => {
          return x.result.map((item: any) => {
            // item.balance = item.nature === 'EXPENSES' ? item.debit - item.credit : item.credit - item.debit;
            return item;
          });
        })
      )
      .subscribe((res: IBalanceSheet[]) => {
        this.raGridProperties.rowData = res;
        this.recordsData = res;
        // for PDF
        (!isEmpty(res)) ? this.disability = false : this.disability = true;
        if (isEmpty(res)) {
          this.toastService.info('No Records Found !', 'Balance Sheet');
        }
        this.isLoading = false;
        this.cdRef.detectChanges();
        this.calculateNetProfit(res);
      });
  }

  calculateNetProfit(res: any[]) {
    console.table(res);
    this.asset = this.valueFormatter(res
      .filter(x => x.nature
        .toString()
        .toLowerCase()
        .replace(/ /g, '') === 'assets')
      .reduce((a, b) => {
        return Number(a) + Number(b.balance);
      }, 0));

    const liablity = res
      .filter(x => x.nature
        .toString()
        .toLowerCase()
        .replace(/ /g, '') === 'liability')
      .reduce((a, b) => {
        return Number(a) + Number(b.balance);
      }, 0);

    const equity = res
      .filter(x => x.nature
        .toString()
        .toLowerCase()
        .replace(/ /g, '') === 'equity')
      .reduce((a, b) => {
        return Number(a) + Number(b.balance);
      }, 0);

    const netProfit = res
      .filter(x => x.nature
        .toString()
        .toLowerCase()
        .replace(/ /g, '') === 'deficit/surplus')
      .reduce((a, b) => {
        return Number(a) + Number(b.balance);
      }, 0);

    this.equityNLiability = this.valueFormatter((equity) + (liablity) + (netProfit));

    /*this.equityNLiability = Math.sign((equity) + (liablity)) === -1
      ? `(${Math.abs((equity) + (liablity)).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })})`
      : ((equity) + (liablity)).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2});*/
  }

  reset() {
    this.formDirective.resetForm();
    this.recordsData = [];
    this.raGridProperties.rowData = [];
    this.isLoading = false;
    // for PDF
    this.disability = true;
  }
  printBalanceSheet(data: any) {
    this.balanceSheetPrintService.setBalanceSheetDataForPrintComponent(data);
    // setTimeout(() => {
    this.router.navigate(['/report/balance-sheet/print'], {
      queryParams: {
        endDate: this.dateHelperService.transformDate(this.balanceSheetForm.value.docDate, 'MMM d, y'),
        // to: this.dateHelperService.transformDate(this.balanceSheetForm.value.docDate2, 'MMM d, y'),
        // account: (this.balanceSheetForm.value.account || 'All'),
        // businessPartner: (this.balanceSheetForm.value?.businessPartnerName || 'All'),
        // location: (this.balanceSheetForm.value.location || 'All'),
        // department: (this.balanceSheetForm.value.department || 'All'),
        // warehouse: (this.balanceSheetForm.value.warehouse || 'All'),
        // organization: (this.balanceSheetForm.value.organization || 'All'),
      }
    });
    // }, 3000)
  }

  // PDF Content
  contentData() {
    const data = [
      {
        text: 'VIZALYS',
        bold: true,
        fontSize: 10,
        alignment: 'center',
        margin: [0, 35, 0, 10]
      },
      {
        text: 'BALANCE SHEET REPORT',
        bold: true,
        decoration: 'underline',
        fontSize: 20,
        alignment: 'center',
        // color: 'green',
        margin: [0, 5, 0, 10]
      },
      {
        // text: 'Report for : ' + this.transformDate(this.balanceSheetForm.value.docDate, 'MMM d, y') + ' - ' + this.transformDate(this.balanceSheetForm.value.docDate2, 'MMM d, y'),
        text: 'Report for : ' + this.transformDate(this.balanceSheetForm.value.docDate, 'MMM d, y'),
        alignment: 'center',
        fontSize: 12,
        margin: [0, 0, 0, 10]
      },
      {
        text: 'Account : ' + (this.balanceSheetForm.value.transactional || 'N/A'),
        fontSize: 10,
      },
      {
        text: 'Department : ' + (this.balanceSheetForm.value.department || 'N/A'),
        fontSize: 10,
      },
      {
        text: 'Location : ' + (this.balanceSheetForm.value.location || 'N/A'),
        fontSize: 10,
      },
      {
        text: 'Warehouse : ' + (this.balanceSheetForm.value.warehouse || 'N/A'),
        fontSize: 10,
        margin: [0, 0, 0, 30]
      },
      {
        table: {
          body: [
            [{
              text: 'Nature',
              style: 'tableHeader1',
            },
            {
              text: 'Head',
              style: 'tableHeader1',
            },
            {
              text: 'Summery Head',
              style: 'tableHeader1',
              margin: [42, 5, 42, 5]
            },
            {
              text: 'Transactional',
              style: 'tableHeader1'
            },
            {
              text: 'Total',
              style: 'tableHeader1',
              margin: [30, 5, 30, 5]
            },
            ],
            ...this.recordsData.map((val) => {
              return [val.nature, val.head, val.summeryHead, val.transactional, this.valueFormatter(val.balance)];
            })
          ],
        },
        layout: {
          paddingTop() {
            return 10;
          },
          paddingLeft() {
            return 10;
          },
          paddingRight() {
            return 10;
          },
          paddingBottom() {
            return 10;
          }
        }
      },
      {
        columns: [
          {
            width: 540,
            text: 'Total Asset: ' + this.asset,
            margin: [0, 15, 0, 0]
          },
          {
            text: 'Total Equity & Liability: ' + this.equityNLiability,
            margin: [0, 15, 0, 0]
          }
        ]
      }
    ];
    return data;
  }
}
