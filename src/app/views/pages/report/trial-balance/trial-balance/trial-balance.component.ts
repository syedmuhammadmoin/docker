import { NgxsCustomService } from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { ITrialBalance } from '../model/ITrialBalance';
import { RowNode } from 'ag-grid-community';
import { Permissions } from 'src/app/views/shared/AppEnum';
import { TrialBalanceService } from '../service/trial-balance.service';
import { TrialBalancePrintService } from '../service/trial-balance-print.service';
import { isEmpty } from 'lodash';
import { map } from 'rxjs/operators';
import { RaGridComponent } from 'src/app/views/shared/components/ra-grid/ra-grid.component';

@Component({
  selector: 'kt-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.scss'],
  providers: [NgxsCustomService]
})
export class TrialBalanceComponent extends AppComponentBase implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  trialBalanceForm: FormGroup;
  trialBalanceModel = {} as ITrialBalance

  // data for PDF
  recordsData: any = []
  disability = true
  credit = 0;
  debit = 0;
  creditOB = 0;
  debitOB = 0;
  creditCB = 0;
  debitCB = 0;

  // Busy Loading
  isLoading: boolean;

  // Limit Date
  maxDate: Date = new Date()

  // Validation Messages
  validationMessages = {
    docDate: {
      required: 'Start Date is required'
    },
    docDate2: {
      required: 'End Date is required'
    }
  }

  // Error keys for validation messages
  formErrors = {
    docDate: '',
    docDate2: ''
  }
  minDate: Date;
  dateCondition: boolean;

  constructor(
    private injector: Injector,
    private trialBalanceService: TrialBalanceService,
    public ngxsService: NgxsCustomService,
    private printTrialBalanceService: TrialBalancePrintService,
  ) {
    super(injector);
  }
  columnDefs = [
    {
      headerName: 'Account',
      field: 'accountName',
      cellStyle: { textAlign: 'left' },
      width: 300
    },
    {
      headerName: 'Opening Balance',
      children: [
        {
          headerName: 'Debit (Rs)',
          field: 'debitOB',
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum',
          valueFormatter: (params) => {
            return this.valueFormatterAmount(params.value, '+ve')
          },
          cellClass: 'my__margin'
        },
        {
          headerName: 'Credit (Rs)',
          field: 'creditOB',
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum',
          valueFormatter: (params) => {
            return this.valueFormatterAmount(params.value, '-ve')
          }
        },
      ],
    },
    {
      headerName: 'Active Period',
      headerClass: 'align-center',
      children: [
        {
          headerName: 'Debit (Rs)',
          field: 'debit',
          aggFunc: 'sum',
          valueFormatter: (params) => {
            return this.valueFormatterAmount(params.value, '+ve')
          }
        },
        {
          headerName: 'Credit (Rs)',
          field: 'credit',
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum',
          valueFormatter: (params) => {
            return this.valueFormatterAmount(params.value, '-ve')
          }
        },
      ],
    },
    {
      headerName: 'Closing Balance',
      children: [
        {
          headerName: 'Debit (Rs)',
          field: 'debitCB',
          aggFunc: 'sum',
          valueFormatter: (params) => {
            return this.valueFormatterAmount(params.value, '+ve')
          }
        },
        {
          headerName: 'Credit (Rs)',
          field: 'creditCB',
          aggFunc: 'sum',
          filter: 'agNumberColumnFilter',
          valueFormatter: (params) => {
            return this.valueFormatterAmount(params.value, '-ve')
          }
        },
      ],
    },
  ];
  ngOnInit(): void {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      gridOptions: {
        suppressAggFuncInHeader: true
      },
      autoGroupColumnDef: {
        headerName: 'This Group',
        minWidth: 300,
        cellRendererParams: {
          suppressCount: true,
        },
      }
    }
    this.trialBalanceForm = this.fb.group({
      docDate: ['', [Validators.required]],
      docDate2: ['', [Validators.required]],
      accountName: [null],
      organization: [null],
      warehouse: [null],
      department: [null],
      location: [null]
    });
    // get Ware house location from state
    this.ngxsService.getWarehouseFromState();
    // get Accounts of level 4 from state
    this.ngxsService.getAccountLevel4FromState()
    // get location from state
    this.ngxsService.getLocationFromState();
    // get department from state
    this.ngxsService.getDepatmentFromState();

    // handling dueDate logic
    this.trialBalanceForm.get('docDate').valueChanges.subscribe((value) => {
      this.minDate = new Date(value);
      this.dateCondition = this.trialBalanceForm.get('docDate2').value < this.trialBalanceForm.get('docDate').value
    })
  }
  onSubmit() {
    this.trialBalanceForm.markAllAsTouched();
    if (this.trialBalanceForm.invalid) {
      this.logValidationErrors(this.trialBalanceForm, this.formErrors, this.validationMessages);
      return;
    }

    const body = { ...this.trialBalanceForm.value } as ITrialBalance
    body.docDate = this.transformDate(new Date(body.docDate), 'yyyy-MM-dd')
    body.docDate2 = this.transformDate(new Date(body.docDate2), 'yyyy-MM-dd')
    this.isLoading = true;
    this.trialBalanceService.getTrialBalance(body).pipe(map((res: any) => {
      return res.result.map((response: ITrialBalance) => {
        return response
      });
    })).subscribe((result: ITrialBalance[]) => {
      this.raGridProperties.rowData = result;
      this.recordsData = result;
      // for PDF
      (!isEmpty(result)) ? this.disability = false : this.disability = true;
      if (isEmpty(result)) {
        this.toastService.info('No Records Found !', 'Trial Balance')
      }
      this.isLoading = false;

      this.cdRef.detectChanges();
      setTimeout(() => {
        const pinnedBottomData = this.generatePinnedBottomData();
        this.grid?.gridApi.setPinnedBottomRowData([pinnedBottomData]);
      }, 500)
    });
  }

  @ViewChild('raGrid') grid: RaGridComponent;
  generatePinnedBottomData() {
    // generate a row-data with null values
    const result = {};
    this.grid.columnApi.getAllGridColumns().forEach(item => {
      result[item.colId] = null;
    });
    return this.calculatePinnedBottomData(result);
  }

  calculatePinnedBottomData(target: any) {
    // list of columns fo aggregation
    const columnsWithAggregation = ['debitOB', 'creditOB', 'debit', 'credit', 'debitCB', 'creditCB']
    columnsWithAggregation.forEach(element => {
      this.grid.gridApi.forEachNodeAfterFilter((rowNode: RowNode) => {
        if (rowNode.data[element])
        target[element] += Number(rowNode.data[element].toFixed(2));

        // for PDF
        switch (element) {
          case 'debitOB':
            this.debitOB = target[element];
            break;
          case 'creditOB':
            this.creditOB = target[element];
            break;
          case 'debit':
            this.debit = target[element];
            break;
          case 'credit':
            this.credit = target[element];
            break;
          case 'debitCB':
            this.debitCB = target[element];
            break;
          case 'creditCB':
            this.creditCB = target[element];
            break;
        }
      });
      if (target[element]) {
        target[element] = target[element]
        // .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
    })
    target.accountName = 'Total'
    return target;
  }

  reset() {
    this.formDirective.resetForm();
    this.recordsData = [];
    this.raGridProperties.rowData = [];
    this.isLoading = false;
    // for PDF
    this.disability = true;
  }

  // PDF Content
  contentData() {
    const form = this.trialBalanceForm.value
    const data = [
      {
        text: 'VIZALYS',
        bold: true,
        fontSize: 10,
        alignment: 'center',
        margin: [0, 35, 0, 10]
      },
      {
        text: 'TRIAL BALANCE REPORT',
        bold: true,
        decoration: 'underline',
        fontSize: 20,
        alignment: 'center',
        margin: [0, 5, 0, 10]
      },
      {
        text: 'Report for : ' + this.transformDate(form.docDate, 'MMM d, y') + ' - ' + this.transformDate(form.docDate2, 'MMM d, y'),
        alignment: 'center',
        fontSize: 12,
        margin: [0, 0, 0, 10]
      },
      {
        text: 'Account : ' + (form.accountName || 'N/A'),
        fontSize: 10,
      },
      {
        text: 'Department : ' + (form.department || 'N/A'),
        fontSize: 10,
      },
      {
        text: 'Location : ' + (form.location || 'N/A'),
        fontSize: 10,
      },
      {
        text: 'Warehouse : ' + (form.warehouse || 'N/A'),
        fontSize: 10,
        margin: [0, 0, 0, 30]
      },
      {
        margin: [0, 0, 0, 8],
        table: {
          widths: [200, 75, 75, 75, 75, 75, 75],
          body: [
            [
              {
                text: 'Account',
                alignment: 'center',
                style: 'tableHeader2',
                margin: [0, 20, 20, 0],
                rowSpan: 2,
              },
              {
                text: 'Opening Balance',
                style: 'tableHeader2',
                colSpan: 2,
                alignment: 'center'
              },
              {},
              {
                text: 'Active Period',
                style: 'tableHeader2',
                colSpan: 2,
                alignment: 'center'
              },
              {},
              {
                text: 'Closing Balance',
                style: 'tableHeader2',
                colSpan: 2,
                alignment: 'center'
              },
              {}
            ],
            [
              {},
              {
                text: 'Debit',
                alignment: 'right'
              },
              {
                text: 'Credit',
                alignment: 'right'
              },
              {
                text: 'Debit',
                alignment: 'right'
              },
              {
                text: 'Credit',
                alignment: 'right'
              },
              {
                text: 'Debit',
                alignment: 'right'
              },
              {
                text: 'Credit',
                alignment: 'right'
              }
            ],
            ...this.recordsData.map((val) => {
              return [
                val.accountName,
                { text: this.valueFormatter(val.debitOB, '+ve'), alignment: 'right' },
                { text: this.valueFormatter(val.creditOB, '-ve'), alignment: 'right' },
                { text: this.valueFormatter(val.debit, '+ve'), alignment: 'right' },
                { text: this.valueFormatter(val.credit, '-ve'), alignment: 'right' },
                { text: this.valueFormatter(val.debitCB, '+ve'), alignment: 'right' },
                { text: this.valueFormatter(val.creditCB, '-ve'), alignment: 'right' }]
            })
          ],
        },
        layout: {
          paddingTop() {
            return 10
          },
          paddingLeft() {
            return 10
          },
          paddingRight() {
            return 5
          },
          paddingBottom() {
            return 10
          }
        }
      },
      {
        table: {
          headerRows: 1,
          widths: [200, 75, 75, 75, 75, 75, 75],
          body: [
            [
              {
                text: 'Total',
                alignment: 'center',
                // style: 'underLine',
              },
              {
                text: this.valueFormatter(this.debitOB, '+ve'),
                // style: 'underLine',
                alignment: 'right'
              },
              {
                text: this.valueFormatter(this.creditOB, '-ve'),
                // style: 'underLine',
                alignment: 'right'
              },
              {
                text: this.valueFormatter(this.debit, '+ve'),
                // style: 'underLine',
                alignment: 'right'
              },
              {
                text: this.valueFormatter(this.credit, '-ve'),
                // style: 'underLine',
                alignment: 'right'
              },
              {
                text: this.valueFormatter(this.debitCB, '+ve'),
                // style: 'underLine',
                alignment: 'right'
              },
              {
                text: this.valueFormatter(this.creditCB, '-ve'),
                // style: 'underLine',
                alignment: 'right'
              }
            ],
          ],
        },
        layout: {
          // hLineWidth: function () { return 0; },
          hLineWidth(i) {
            return (i === 1) ? 1 : 0;
          },
          vLineWidth() {
            return 0;
          },
          paddingTop() {
            return 10
          },
          paddingLeft() {
            return 10
          },
          paddingRight() {
            return 7
          },
          paddingBottom() {
            return 10
          },
        }
      }
    ]
    return data
  }

  print(data) {
    this.printTrialBalanceService.setPrintData(data)
    const form = this.trialBalanceForm.value
    this.router.navigate(['/report/trial-balance/print'], {
      queryParams: {
        from: this.dateHelperService.transformDate(form.docDate, 'MMM d, y'),
        to: this.dateHelperService.transformDate(form.docDate2, 'MMM d, y'),
        account: (form.accountName || 'All'),
        department: (form.department || 'All'),
        location: (form.location || 'All'),
        warehouse: (form.warehouse || 'All'),
      }
    })
  }
}
