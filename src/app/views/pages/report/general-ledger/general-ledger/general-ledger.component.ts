import { NgxsCustomService } from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { GeneralLedgerService } from '../service/general-ledger.service';
import { IGeneralLedger } from '../model/IGeneralLedger';
import { finalize } from 'rxjs/operators';
import { isEmpty } from 'lodash';
import { AppConst } from '../../../../shared/AppConst';
import { GeneralLedgerPrintService } from '../service/general-ledger-print.service';
import { colGroup, colSimpleAmount, colSimpleLeft } from 'src/app/views/shared/components/constants';


function sumFunc(params) {
  if (params && params.values) {
    this.balance = params?.values[params?.values?.length - 1];
  }
  return this.balance;
}

function debitSum(params) {
  if (params?.values.length < 1) { return; }
  let debitSum = 0;
  params?.values?.forEach((value) => {
    if (value) {
      debitSum += +value;
    }
  });
  const netDebitSum = debitSum;
  return netDebitSum !== 0 ? netDebitSum : 0;
}

function creditSum(params) {
  let result = 0;
  params.values.forEach((value) => {
    if (typeof value === 'number') {
      result += value;
    }
  });
  const netResult = result;
  return netResult !== 0 ? netResult : 0;
}


@Component({
  selector: 'kt-general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.scss'],
  providers: [NgxsCustomService]
})
export class GeneralLedgerComponent extends AppComponentBase implements OnInit {

  constructor(
    private generalLedgerService: GeneralLedgerService,
    private printService: GeneralLedgerPrintService,
    public ngxsService: NgxsCustomService,
    private injector: Injector,
  ) {
    super(injector);
  }

  documents = AppConst.Documents;
  docTypeValue = AppConst.DocTypeValue;
  dateCondition: boolean;
  minDate: Date;
  // for resetting form
  @ViewChild('formDirective') private formDirective: NgForm;

  // gridOptions: GridOptions;

  openingBalance = 0;
  balance = 0;


  // data for PDF
  recordsData: any = [];
  disability = true;

  // Busy Loading
  isLoading: boolean;

  // Limit Date
  maxDate: Date = new Date();

  // Declaring FormGroup
  generalLedgerForm: FormGroup;

  // Declaring Model
  // Initializing generalLedger model...
  generalLedgerModel: IGeneralLedger = {} as IGeneralLedger;
  // Validation Messages
  validationMessages = {
    docDate: {
      required: 'Start Date is required'
    },
    docDate2: {
      required: 'End Date is required'
    }
  };

  // Error keys for validation messages
  formErrors = {
    docDate: '',
    docDate2: ''
  };
  private formSubmitAttempt = true;
  columnDefs = [
    colGroup.call(this, {
      headerName: 'Account', field: 'accountName',
    }),
    colSimpleLeft.call(this, {
      headerName: 'Date', field: 'docDate'
    }),
    colSimpleLeft.call(this, {
      headerName: 'Document No', field: 'docNo',
      valueFormatter: (params) => {
        return params?.value && this.docTypeValue[params.value];
      }
    }),
    colSimpleLeft.call(this, {
      headerName: 'Description', field: 'description'
    }),
    colSimpleAmount.call(this, {
      headerName: 'Debit',
      field: 'debit',
      aggFunc: debitSum.bind(this),
      valueFormatter: (params) => {
        return this.valueFormatterAmount(params.value, '+ve');
      }
    }),
    colSimpleAmount.call(this, {
      headerName: 'Credit',
      field: 'credit',
      aggFunc: creditSum.bind(this),
      valueFormatter: (params) => {
        return this.valueFormatterAmount(params.value, '-ve');
      }
    }),
    colSimpleAmount.call(this, {
      headerName: 'Balance',
      field: 'balance',
      aggFunc: sumFunc.bind(this),
      colId: 'balance',
    })
  ];
  onRowDoubleClicked($event: any) {
  }
  ngOnInit() {
    // AG Grid Options
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      gridOptions: {
        suppressAggFuncInHeader: true
      },
      autoGroupColumnDef: {
        headerName: 'Account',
        minWidth: 300,
        cellRendererParams: {
          suppressCount: true,
          checkbox: false,
        },
      }
    };
    // initializing formGroup
    this.generalLedgerForm = this.fb.group({
      docDate: ['', [Validators.required]],
      docDate2: ['', [Validators.required]],
      accountName: [null],
      businessPartnerName: [null],
      organization: [null],
      department: [null],
      warehouse: [null],
      location: [null]
    });

    // get customer from state
    this.ngxsService.getBusinessPartnerFromState();
    // get Ware house location from state
    this.ngxsService.getWarehouseFromState();
    // get Accounts of level 4 from state
    this.ngxsService.getAccountLevel4FromState();
    // get location from state
    this.ngxsService.getLocationFromState();
    // get department from state
    this.ngxsService.getDepatmentFromState();

    // handling dueDate logic
    this.generalLedgerForm.get('docDate').valueChanges.subscribe((value) => {
      this.minDate = new Date(value);
      this.dateCondition = this.generalLedgerForm.get('docDate2').value < this.generalLedgerForm.get('docDate').value;
    });
  }

  onSubmit() {
    this.generalLedgerForm.markAllAsTouched();
    if (this.generalLedgerForm.invalid) {
      this.logValidationErrors(this.generalLedgerForm, this.formErrors, this.validationMessages);
      return;
    }
    this.mapFormValueToModel();
    this.isLoading = true;
    this.generalLedgerService.getLedger(this.generalLedgerModel).pipe(
      finalize(() => {
        // this.cdRef.detectChanges();
      })
    ).subscribe((res) => {
      // this.setColumnDef()
      this.raGridProperties.rowData = res.result;
      this.recordsData = res.result;
      this.cdRef.detectChanges();
      // for PDF
      (!isEmpty(res.result)) ? this.disability = false : this.disability = true;
      if (isEmpty(res.result)) {
        this.toastService.info('No Records Found !', 'General Ledger');
      }
      this.isLoading = false;

    });
  }
  setColumnDef() {

  }
  reset() {
    this.formDirective.resetForm();
    this.formSubmitAttempt = false;
    this.recordsData = [];
    this.raGridProperties.rowData = [];
    this.isLoading = false;
    // for PDF
    this.disability = true;
  }

  // Mapping value from form to model
  mapFormValueToModel() {
    const form = this.generalLedgerForm.value;
    this.generalLedgerModel.docDate = this.transformDate(form.docDate, 'yyyy-MM-dd') || '';
    this.generalLedgerModel.docDate2 = this.transformDate(form.docDate2, 'yyyy-MM-dd') || '';
    this.generalLedgerModel.accountName = form.accountName || '';
    this.generalLedgerModel.businessPartnerName = form.businessPartnerName || '';
    this.generalLedgerModel.locationName = form.location || '';
    this.generalLedgerModel.departmentName = form.department || '';
    this.generalLedgerModel.warehouseName = form.warehouse || '';
    // this.generalLedgerModel.organization = form.organization || '';
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }
  // PDF Content
  contentData() {
    const form = this.generalLedgerForm.value;
    return [
      {
        text: 'VIZALYS',
        bold: true,
        fontSize: 10,
        alignment: 'center',
        // color: 'lightblue',
        margin: [0, 35, 0, 10]
      },
      {
        text: 'GENERAL LEDGER REPORT',
        bold: true,
        decoration: 'underline',
        fontSize: 20,
        alignment: 'center',
        // color: 'green',
        margin: [0, 5, 0, 10]
      },
      {
        text: 'Report for : ' + this.transformDate(form.docDate, 'MMM d, y') + ' - ' + this.transformDate(form.docDate2, 'MMM d, y'),
        alignment: 'center',
        fontSize: 12,
        margin: [0, 0, 0, 10]
      },
      {
        text: 'Business Partner : ' + (form.businessPartnerName || 'N/A'),
        fontSize: 10,
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
        table: {
          widths: [70, 180, 180, 70, 70, 70],
          body: [
            [{
              text: 'Doc#',
              style: 'tableHeader',
              // margin: [10, 5, 10, 5]
            },
            {
              text: 'Account',
              style: 'tableHeader'
            },
            {
              text: 'Description',
              style: 'tableHeader',
              // margin: [36, 5, 130, 5]
            },
            {
              text: 'Debit',
              style: 'tableHeader',
              alignment: 'right'
            },
            {
              text: 'Credit',
              style: 'tableHeader',
              alignment: 'right'
            },
            {
              text: 'Balance',
              style: 'tableHeader',
              alignment: 'right'
            },
            ],
            ...this.recordsData.map((val) => {
              return [
                val.docNo,
                val.accountName,
                val.description,
                { text: this.valueFormatter(val.debit), alignment: 'right' },
                { text: this.valueFormatter(val.credit), alignment: 'right' },
                { text: this.valueFormatter(val.balance), alignment: 'right' }];
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
          // paddingRight: function (i) { return (i === 1 || i === 2) ? 10 : 5 },
          paddingRight() {
            return 10;
          },
          paddingBottom() {
            return 10;
          }
        }
      }
    ];
  }
  printLedger(data: any) {
    const form = this.generalLedgerForm.value;

    this.printService.setLedgerDataForPrintComponent(data);
    // setTimeout(() => {
    this.router.navigate(['/report/ledger/print'], {
      queryParams: {
        from: this.dateHelperService.transformDate(form.docDate, 'MMM d, y'),
        to: this.dateHelperService.transformDate(form.docDate2, 'MMM d, y'),
        account: (form.account || 'All'),
        businessPartner: (form?.businessPartnerName || 'All'),
        location: (form.location || 'All'),
        department: (form.department || 'All'),
        warehouse: (form.warehouse || 'All'),
        organization: (form.organization || 'All'),
      }
    });
    // }, 3000)
  }
}
