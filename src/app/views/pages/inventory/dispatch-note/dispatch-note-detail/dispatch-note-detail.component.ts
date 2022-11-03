import {DISPATCH_NOTE} from './../../../../shared/AppRoutes';
import {ChangeDetectionStrategy, Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {ActionButton, DocType, DocumentStatus} from 'src/app/views/shared/AppEnum';
import {IRaGridProperties} from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import {colSimple, colSimpleNumber} from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-dispatch-note-detail',
  templateUrl: './dispatch-note-detail.component.html',
  styleUrls: ['./dispatch-note-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DispatchNoteDetailComponent extends AppComponentBase implements OnInit {
  // routing variables
  public DISPATCH_NOTE = DISPATCH_NOTE
  docType = DocType
  action = ActionButton
  docStatus = DocumentStatus

  // handling register payment button
  isDisabled: boolean;

  // kt busy loading
  isLoading: boolean;

  // need for routing
  gdnId: number;

  // Variables for dispatch Note data
  dispatchNoteMaster: any;
  dispatchNoteLines: any;
  constructor(
    injector: Injector
  ) {
    super(injector)
  }
  columnDefs = [
    colSimple({
      headerName: 'Item', field: 'itemName'
    }),
    colSimple({
      headerName: 'Description', field: 'description'
    }),
    colSimpleNumber.call(this, {
      headerName: 'Quantity', field: 'quantity'
    }),
    colSimple({
      headerName: 'Location', field: 'locationName'
    })
  ];
  raGridProperties: Partial<IRaGridProperties> = {
    columnDefs: this.columnDefs,
    style: {"height": "250px", "margin-top": "10px"}
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.isLoading = true
        this.getDispatchNoteMasterData(id);
        this.gdnId = id;
        this.cdRef.markForCheck();
      } else {
        this.toastService.info('Cannot find record with out id parameter', 'Records Not Found')
        this.router.navigate(['/' + DISPATCH_NOTE.LIST])
      }
    });
  }

  // Getting Dispatch Note master data
  private getDispatchNoteMasterData(id: number) {
    this.dispatchNoteService.getDispatchNoteMasterById(id).subscribe((res) => {
      this.dispatchNoteMaster = res.result;
      this.raGridProperties.rowData = res.result.goodsDispatchNoteLines;
      this.isLoading = false;
      this.cdRef.markForCheck();
    }, (error => {
      this.isLoading = false;
    }))
  }

  workflow(action: any) {
    this.isLoading = true
    this.dispatchNoteService.workflow({ action, docId: this.dispatchNoteMaster.id })
      .subscribe((res) => {
        this.getDispatchNoteMasterData(this.gdnId);
        this.toastService.success(res.message, 'GDN');
      }, (err) => {
        this.toastService.error(err.error.message, 'GDN')
      }, () => {
        this.isLoading = false;
        this.cdRef.detectChanges();
      })
  }
}
