import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { AppConst } from 'src/app/views/shared/AppConst';
import { colIndex, colSimple } from 'src/app/views/shared/components/constants';
import { CreateStatusComponent } from '../create-status/create-status.component';
import { StatusService } from '../service/status.service';

@Component({
  selector: 'kt-list-status',
  templateUrl: './list-status.component.html',
  styleUrls: ['./list-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListStatusComponent extends AppComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private statusService: StatusService,
  ) {
    super(injector)
  }
  columnDefs = [
    colIndex(),
    colSimple({
      headerName: 'Status', field: 'status',
    }),
    colSimple({
      headerName: 'State', field: 'state',
      valueFormatter: (params) =>AppConst.DocStatus[params.value].viewValue
    })
  ]
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs
    }
    this.getAllStatus();
  }

  getAllStatus() {
    this.statusService.getStatuses().subscribe((res) => {
      this.raGridProperties.rowData = res.result;
      this.cdRef.detectChanges()
    });
  }

  onRowDoubleClicked(event: any) {
    this.addStatusDialog(event.data.id)
  }

  addStatusDialog(id?) {
    const dialogRef = this.dialog.open(CreateStatusComponent, {
      width: '740px',
      data: id
    });
    // Recalling getStates function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      this.statusService.getStatuses().subscribe((res) => {
        this.raGridProperties.rowData =  res.result;
        this.cdRef.detectChanges();
      })
    })
  }

}
