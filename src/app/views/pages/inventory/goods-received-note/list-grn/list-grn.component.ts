import { GOODS_RECEIVED_NOTE } from '../../../../shared/AppRoutes';
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppListComponentBase } from '../../../../shared/app-list-component-base';
import { IGRN } from '../model/IGRN';
import { Permissions } from "../../../../shared/AppEnum";
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { colDate, colDropDownStatus, colText } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-grn',
  templateUrl: './list-grn.component.html',
  styleUrls: ['./list-grn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListGrnComponent extends AppListComponentBase<IGRN> implements OnInit {
  pageName = 'GrnPageNumber';
  constructor(
    injector: Injector
  ) {
    super(injector)
  }
  columnDefs = [
    colText({
      headerName: 'GRN #',
      field: 'docNo',
    }),
    colText({
      headerName: 'Vendor',
      field: 'vendorName',
    }),
    colDate.call(this, {
      headerName: 'GRN Date',
      field: 'docDate',
    }),
    colDropDownStatus()
  ];
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.grnService,
      pageName: this.pageName,
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }
  onRowDoubleClicked(event: any) {
    this.router.navigate(['/' + GOODS_RECEIVED_NOTE.ID_BASED_ROUTE('details', event.data.id)], { relativeTo: this.activatedRoute })
  }

  addgoodReceiveNote() {
    this.router.navigate(['/' + GOODS_RECEIVED_NOTE.CREATE]);
  }
}
