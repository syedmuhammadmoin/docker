// Angular
import {ChangeDetectorRef, Component, Injector, OnInit, ViewChild} from '@angular/core';
// Chart
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ChartComponent
} from 'ng-apexcharts';
import {DashboardService} from "./services/dashboard.service";
import {IPayableReceivable} from "./models/IPayableReceivable";
import {IBankAccountSummary} from "./models/IBankAccountSummary";
import {IExpenseIncomeSummary} from "./models/IExpenseIncomeSummary";
import {forkJoin} from "rxjs";
import {AppComponentBase} from "../../shared/app-component-base";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  colors: any;
};


@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent extends AppComponentBase implements OnInit {

  receivable: IPayableReceivable
  payable: IPayableReceivable
  bankAccountSummary: IBankAccountSummary
  incomeExpenseSummary: IExpenseIncomeSummary

  isLoading = true;

  @ViewChild('pie-chart') pieChart: ChartComponent;
  public pieChartOptions: Partial<PieChartOptions>;

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    injector: Injector,
    private cdr: ChangeDetectorRef,
    private dashboardService: DashboardService
  ) {
    super(injector)
    /*setTimeout(() => {
      this.isLoading = false
      this.cdr.detectChanges();
    }, 3000)*/
    this.chartOptions = {
      series: [
        {
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'sales Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep'
        ]
      }
    };
    this.pieChartOptions = {
      colors: ['#2988BC', '#ED8C72'],
      series: [44, 55],
      fill: {
        type: 'default',
        /*colors: [
          '#039be5', '#0288d1', '#03a9f4', '#4fc3f7'
        ]*/
      },
      dataLabels: {
        /*style: {
          colors: ['#039be5', '#0288d1', '#03a9f4', '#4fc3f7']
        },*/
        enabled: false
      },
      title: {
        text: 'Income & Expense',
        align: 'left'
      },
      legend: {
        show: true,
        horizontalAlign: 'center',
        position: 'bottom',
        /*markers: {
          fillColors: ['#039be5', '#0288d1', '#03a9f4', '#4fc3f7']
        }*/
      },
      /*tooltip: {
        style: {
          fontSize: '20px'
        },
        /!*marker: {
          fillColors: ['#039be5', '#0288d1', '#03a9f4', '#4fc3f7']
        }*!/
      },*/
      chart: {
        toolbar: {
          show: true
        },
        type: 'pie',
        height: 350,
      },
      labels: ['Income', 'Expense'],
      responsive: [
        /*{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }*/
      ]
    };
  }

  ngOnInit(): void {

    forkJoin({
      payable: this.dashboardService.getPayable(),
      receivable: this.dashboardService.getReceivables(),
      bankAccSum: this.dashboardService.getBankAccountsSummary(),
      incomeExpenseSum: this.dashboardService.getExpenseAndIncomeSummary()
    }).subscribe(({payable, receivable, bankAccSum, incomeExpenseSum}) => {
      this.payable = payable.result;
      this.receivable = receivable.result;
      this.bankAccountSummary = bankAccSum.result;
      this.incomeExpenseSummary = incomeExpenseSum.result;
      this.pieChartOptions.series = [this.incomeExpenseSummary.incomeTotal, this.incomeExpenseSummary.expenseTotal]
      this.isLoading = false
      this.cdr.detectChanges();
    })

    /*this.dashboardService.getBankAccountsSummary()
      .subscribe((res) => {
        this.bankAccountSummary = res.result;
      })
    this.dashboardService.getExpenseAndIncomeSummary()
      .subscribe((res) => {
        this.incomeExpenseSummary = res.result;
      })
    this.dashboardService.getPayable()
      .subscribe((res) => {
        this.payable = res.result;
      })
    this.dashboardService.getReceivables()
      .subscribe((res) => {
        this.receivable = res.result;
      })*/
  }
}
