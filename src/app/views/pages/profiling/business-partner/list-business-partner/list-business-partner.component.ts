import { ChangeDetectionStrategy, ViewChild, Component, Injector, OnInit } from '@angular/core';
import { NgxsCustomService } from '../../../../shared/services/ngxs-service/ngxs-custom.service';
import { RowDoubleClickedEvent } from 'ag-grid-community';
import { CreateBusinessPartnerComponent } from '../create-business-partner/create-business-partner.component';
import { IBusinessPartner } from '../model/IBusinessPartner';
import { BusinessPartnerType, Permissions } from 'src/app/views/shared/AppEnum';
import { AppListComponentBase } from '../../../../shared/app-list-component-base';
import { colSimple, colText } from 'src/app/views/shared/components/constants';
import { RaGridComponent } from 'src/app/views/shared/components/ra-grid/ra-grid.component';



@Component({
  selector: 'kt-list-business-partner',
  templateUrl: './list-business-partner.component.html',
  styleUrls: ['./list-business-partner.component.scss'],
  providers: [NgxsCustomService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListBusinessPartnerComponent extends AppListComponentBase<IBusinessPartner> implements OnInit {
  constructor(
    public ngxsService: NgxsCustomService,
    injector: Injector
  ) {
    super(injector);
  }

  columnDefs = [
    colText({
      headerName: 'Name', field: 'name',
    }),
    colSimple({
      headerName: 'Entity', field: 'entity',
    }),
    colSimple.call(this, {
      headerName: 'Type',
      field: 'businessPartnerType',
      valueFormatter: (params) => BusinessPartnerType[params.value]
    }),
    colSimple({
      headerName: 'Phone No', field: 'phone',
    }),
    colSimple({
      headerName: 'Bank Account', field: 'bankAccountTitle',
    }),
    colSimple({
      headerName: 'Account No', field: 'bankAccountNumber',
    }),
  ];

  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.ngxsService.businessPartnerService,
      pageName: 'BusinessPartnerNumber',
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }
  onRowDoubleClicked(event: RowDoubleClickedEvent) {
    if (this.permission.isGranted(this.permissions.BUSINESSPARTNER_EDIT) || this.permission.isGranted(this.permissions.BUSINESSPARTNER_VIEW)) {
      this.openDialog(event.data.id)
    } else {
      this.toastService.error('You don\'t have permission to access this resource', 'Forbidden')
    }
  }

  @ViewChild('raGrid', { static: true }) grid: RaGridComponent;
  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(CreateBusinessPartnerComponent, {
      width: '800px',
      data: id
    });
      // Recalling getBusinessPartners function on dialog close
      dialogRef.afterClosed().subscribe(() => {
      this.grid.gridReady()
    });
  }
}
