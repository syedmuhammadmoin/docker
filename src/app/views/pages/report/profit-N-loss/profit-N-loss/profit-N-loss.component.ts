import { NgxsCustomService } from './../../../../shared/services/ngxs-service/ngxs-custom.service';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { ProfitLossService } from '../service/profit-loss.service';
import { ProfitLossPrintService } from '../service/profit-loss-print.service';
import { IProfitLoss } from '../model/IProfitLoss';
import { isEmpty } from 'lodash';
import { Permissions } from 'src/app/views/shared/AppEnum';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profit-N-loss',
  templateUrl: './profit-N-loss.component.html',
  styleUrls: ['./profit-N-loss.component.scss'],
  providers: [NgxsCustomService]
})
export class ProfitNLossComponent extends AppComponentBase implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  profitNLossForm: FormGroup;
  netProfit = '0';

  //data for PDF
  recordsData: any = []
  disability: boolean = true

  //Busy Loading
  isLoading: boolean;

  //Limit Date
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
  dateCondition: boolean;
  minDate: Date;

  constructor(
    private injector: Injector,
    private profitLossService: ProfitLossService,
    private printProfitNlossService: ProfitLossPrintService,
    public ngxsService: NgxsCustomService,
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
      cellStyle: { textAlign: 'left' }
    },
    /*{
      headerName: 'Business Partner',
      field: 'businessPartnerName',
    },*/
    /*{
      headerName: 'Debit (Rs)',
      field: 'debit',
      aggFunc: 'sum',
      valueFormatter: (param) => {
        return this.valueFormatter(param.value, '+ve')
        // Math.sign(param.value) === -1 ? `(${Math.abs(param.value).toLocaleString()})` : param.value.toString().toLocaleString()
      }
    },*/
    /*{
      headerName: 'Credit (Rs)',
      field: 'credit',
      aggFunc: 'sum',
      valueFormatter: (param) => {
        return this.valueFormatter(param.value, '-ve')
        // Math.sign(param.value) === -1 ? `(${Math.abs(param.value).toLocaleString()})` : param.value.toString().toLocaleString()
      }
    },*/
    {
      headerName: 'Total',
      field: 'balance',
      aggFunc: 'sum',
      valueFormatter: (param) => {
        return this.valueFormatterAmount(param.value)
        // Math.sign(param.value) === -1 ? `(${Math.abs(param.value).toLocaleString()})` : param.value.toString().toLocaleString()
      }

    },
  ];
  ngOnInit(): void {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      gridOptions: {
        suppressAggFuncInHeader: true
      },
      autoGroupColumnDef: {
        headerName: 'Nature',
        filter: true,
        minWidth: 300,
        menuTabs: ['filterMenuTab'],
        cellRendererParams: {
          suppressCount: true,
        },
        filterValueGetter: (params) => {
          return params.data.nature
        }
      }
    }

    this.profitNLossForm = this.fb.group({
      docDate: ['', [Validators.required]],
      docDate2: ['', [Validators.required]],
      transactional: [null],
      businessPartner: [null],
      warehouse: [null],
      department: [null],
      location: [null],
      organization: [null]
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
    this.profitNLossForm.get('docDate').valueChanges.subscribe((value) => {
      this.minDate = new Date(value);
      this.dateCondition = this.profitNLossForm.get('docDate2').value < this.profitNLossForm.get('docDate').value
    })
  }

  onSubmit() {
    this.profitNLossForm.markAllAsTouched();
    const form = this.profitNLossForm.value
    if (this.profitNLossForm.invalid) {
      this.logValidationErrors(this.profitNLossForm, this.formErrors, this.validationMessages);
      return;
    }
    const profitNLoss = { ...form } as IProfitLoss
    profitNLoss.docDate = this.transformDate(form.docDate, 'yyyy-MM-dd') || '';
    profitNLoss.docDate2 = this.transformDate(form.docDate2, 'yyyy-MM-dd') || '';
    this.isLoading = true;
    this.profitLossService.getProfitNLoss(profitNLoss)
      .pipe(
        map((x: any) => {
          return x.result.map((item: any) => {
            // item.balance = item.nature === 'EXPENSES' ? item.debit - item.credit : item.credit - item.debit;
            return item;
          })
        })
      )
      .subscribe((res: any) => {
        this.raGridProperties.rowData = res;
        this.recordsData = res;
        // for PDF
        (!isEmpty(res)) ? this.disability = false : this.disability = true;
        if (isEmpty(res)) {
          this.toastService.info('No Records Found !', 'Profit & Loss')
        }
        this.isLoading = false;
        this.cdRef.detectChanges();
        this.calculateNetProfit(res);
      });
  }

  calculateNetProfit(res: any[]) {
    const revenue = res.filter(x => x.nature.toString().toLowerCase().replace(/ /g, '') === 'income').reduce((a, b) => {
      return Number(a) + Number(b.balance)
    }, 0);
    const expense = res.filter(x => x.nature.toString().toLowerCase().replace(/ /g, '') === 'expenses').reduce((a, b) => {
      return Number(a) + Number(b.balance)
    }, 0);
    this.netProfit = this.valueFormatter((revenue) - (expense))
    // `${Math.abs((revenue) - (expense)).toLocaleString(undefined, {maximumFractionDigits: 2, minimumFractionDigits: 2})}`
  }

  reset() {
    this.formDirective.resetForm()
    this.recordsData = [];
    this.raGridProperties.rowData = [];
    this.isLoading = false;
    //for PDF
    this.disability = true;
  }

  print(data) {
    const form = this.profitNLossForm.value
    this.printProfitNlossService.setPrintData(data)
    this.router.navigate(['/report/profit-n-loss/print'], {
      queryParams: {
        from: this.dateHelperService.transformDate(form.docDate, 'MMM d, y'),
        to: this.dateHelperService.transformDate(form.docDate2, 'MMM d, y'),
        account: (form.transactional || 'All'),
        // campus: (form.campus || 'All'),
        department: (form.department || 'All'),
        location: (form.location || 'All'),
        warehouse: (form.warehouse || 'All')
      }
    })
  }

  //PDF Content
  contentData() {
    const form = this.profitNLossForm.value
    const data = [
      {
        text: 'VIZALYS',
        bold: true,
        fontSize: 10,
        alignment: 'center',
        //color: 'lightblue',
        margin: [0, 35, 0, 10]
      },
      {
        text: 'PROFIT & LOSS REPORT',
        bold: true,
        decoration: "underline",
        fontSize: 20,
        alignment: 'center',
        //color: 'green',
        margin: [0, 5, 0, 10]
      },
      {
        text: 'Report for : ' + this.transformDate(form.docDate, 'MMM d, y') + ' - ' + this.transformDate(form.docDate2, 'MMM d, y'),
        alignment: 'center',
        fontSize: 12,
      },
      {
        text: 'Account : ' + (form.transactional || 'N/A'),
        fontSize: 10,
      },
      {
        text: 'Location : ' + (form.location || 'N/A'),
        fontSize: 10,
      },
      {
        text: 'Warehouse : ' + (form.warehouse || 'N/A'),
        fontSize: 10,
      },
      {
        text: 'Department : ' + (form.department || 'N/A'),
        fontSize: 10,
        margin: [0, 0, 0, 30]
      },
      {
        table: {
          widths: [132, 132, 132, 132, 132],
          body: [
            [
              {
                text: 'Nature',
                style: 'tableHeader3'
              },
              {
                text: 'Head',
                style: 'tableHeader3'
              },
              {
                text: 'Summery Head',
                style: 'tableHeader3'
              },
              {
                text: 'Transactional',
                style: 'tableHeader3'
              },
              {
                text: 'Balance',
                style: 'tableHeader3',
                alignment: 'right'
              }
            ],
            ...this.recordsData.map((val) => {

              return [val.nature, val.head, val.summeryHead, val.transactional, { text: this.valueFormatter(val.balance), alignment: 'right' }]
            })
          ],
        },
        layout: {
          paddingTop: function () { return 10 },
          paddingLeft: function () { return 10 },
          paddingRight: function () { return 10 },
          paddingBottom: function () { return 10 }
        }
      },
      {
        text: 'Net Profit : ' + this.netProfit,
        alignment: 'right',
        fontSize: 12,
        margin: [0, 10, 0, 0],
        // decoration: 'underline',
        bold: true,
        //lineHeight: 2,
      }
    ]
    return data
  }
};

