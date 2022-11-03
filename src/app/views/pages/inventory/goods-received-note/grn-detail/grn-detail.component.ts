import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { LayoutUtilsService } from '../../../../../core/_base/crud';
import { ActionButton, DocType, DocumentStatus, Permissions } from 'src/app/views/shared/AppEnum';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { GOODS_RECEIVED_NOTE } from 'src/app/views/shared/AppRoutes';
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { colSimple, colSimpleNumber } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-grn-detail',
  templateUrl: './grn-detail.component.html',
  styleUrls: ['./grn-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GrnDetailComponent extends AppComponentBase implements OnInit {
  // routing variables
  public GOODS_RECEIVED_NOTE = GOODS_RECEIVED_NOTE;
  docType = DocType
  action = ActionButton
  docStatus = DocumentStatus

  // handling register payment button
  isDisabled: boolean;

  // kt busy loading
  isLoading: boolean;

  // need for routing
  grnId: number;


  // For ag grid
  // Variables for Goods Received Note data
  grnMaster: any;

  constructor(
    private layoutUtilService: LayoutUtilsService,
    injector: Injector
  ) {
    super(injector)
  }
  columnDefs = [
    colSimple({
      headerName: 'Item', field: 'itemName',
    }),
    colSimple({
      headerName: 'Description', field: 'description',
    }),
    colSimpleNumber.call(this, {
      headerName: 'Quantity', field: 'quantity',
    }),
    colSimple({
      headerName: 'Location', field: 'locationName',
    }),
  ];
  raGridProperties: Partial<IRaGridProperties> = {
    columnDefs: this.columnDefs,
    style: {"height": "250px", "margin-top": "10px"}

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.getGRNMasterData(id);
        this.grnId = id;
        this.cdRef.markForCheck();
      } else {
        this.layoutUtilService.showActionNotification('Cannot find record with out id parameter', null, 5000, true, false)
        this.router.navigate(['/' + GOODS_RECEIVED_NOTE.LIST])
      }
    });
  }
  private getGRNMasterData(id: number) {
    this.grnService.getGRNMasterById(id).subscribe((res) => {
      this.grnMaster = res.result;
      this.raGridProperties.rowData = res.result.goodsReceivingNoteLines;
      this.cdRef.markForCheck();
    })
  }

  workflow(action: any) {
    this.isLoading = true
    this.grnService.workflow({ action, docId: this.grnMaster.id })
      .subscribe((res) => {
        this.getGRNMasterData(this.grnId);
        this.toastService.success('' + res.message, 'GRN');
      }, (err) => {
        this.toastService.error('' + err.error.message, 'GRN')
      }, () => {
        this.isLoading = false;
        this.cdRef.detectChanges();
      })
  }
}
