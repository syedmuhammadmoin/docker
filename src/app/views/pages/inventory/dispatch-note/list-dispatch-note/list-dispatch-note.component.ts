import { DISPATCH_NOTE } from '../../../../shared/AppRoutes';
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { colDate, colDropDownStatus, colText } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-dispatch-note',
  templateUrl: './list-dispatch-note.component.html',
  styleUrls: ['./list-dispatch-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListDispatchNoteComponent extends AppComponentBase implements OnInit {


  pageName = 'dispatchNotePageNumber';

  constructor(
    injector: Injector
  ) {
    super(injector);
  }
  columnDefs = [
    colText({
      headerName: 'GDN #',
      field: 'docNo',
    }),
    colText({
      headerName: 'Customer',
      field: 'customerName',
    }),
    colDate.call(this, {
      headerName: 'GDN Date',
      field: 'docDate',
    }),
    colDropDownStatus()
  ];
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.dispatchNoteService,
      pageName: this.pageName,
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this
    }
  }
  onRowDoubleClicked(event: any) {
    this.router.navigate(['/' + DISPATCH_NOTE.ID_BASED_ROUTE('details', event.data.id)], { relativeTo: this.activatedRoute })
  }
}



