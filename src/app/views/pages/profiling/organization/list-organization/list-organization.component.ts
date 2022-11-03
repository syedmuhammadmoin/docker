import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { NgxsCustomService } from '../../../../shared/services/ngxs-service/ngxs-custom.service';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { CreateOrganizationComponent } from '../create-organization/create-organization.component';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { IPaginationResponse } from 'src/app/views/shared/IPaginationResponse';
import { IOrganization } from '../model/IOrganization';
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { colDate, colSimple } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-organization',
  templateUrl: './list-organization.component.html',
  styleUrls: ['./list-organization.component.scss'],
  providers: [NgxsCustomService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListOrganizationComponent extends AppComponentBase implements OnInit {
  organizationList: IOrganization[];
  constructor(
    public ngxsService: NgxsCustomService,
    injector: Injector
  ) {
    super(injector)
  }

  columnDefs = [
    colSimple({
      headerName: 'Name',
      field: 'name',
    }),
    colSimple({
      headerName: 'Country',
      field: 'country',
    }),
    colSimple({
      headerName: 'Contact',
      field: 'phone',
    }),
    colSimple({
      headerName: 'Industry',
      field: 'industry',
    }),
    colDate.call(this, {
      headerName: 'Start Date',
      field: 'startDate'
    }),
    colDate.call(this, {
      headerName: 'End Date',
      field: 'endDate',
    })
  ];

  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.ngxsService.organizationService,
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
    this.getOrganizations()
  }
  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    this.openDialog(event.data.id)
  }
  // @ViewChild('raGrid', { static: true }) grid: RaGridComponent;
  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(CreateOrganizationComponent, {
      width: '800px',
      data: id
    });
    // Recalling getOrganization function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      // this.grid.gridReady()
      this.getOrganizations()
    });
  }

  getOrganizations(): void {
    this.ngxsService.organizationService.getOrganizations().
      subscribe((res: IPaginationResponse<IOrganization[]>) => {
        this.raGridProperties.rowData = res.result;
      })
  }
}
