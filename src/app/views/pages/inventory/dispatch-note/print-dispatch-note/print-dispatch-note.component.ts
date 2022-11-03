import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'kt-print-dispatch-note',
  templateUrl: './print-dispatch-note.component.html',
  styleUrls: ['./print-dispatch-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PrintDispatchNoteComponent extends AppComponentBase implements OnInit {

  isLoading = true
  gridOptions: GridOptions;
  gdnMaster: any;
  gdnLines: any;

  constructor(
    injector: Injector,
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.getDispatchNoteMasterData(id);
      } else {
      }
    });
  }

  printDiv(divName: any) {
    const printContents = document.getElementById(divName).innerHTML;
    window.document.body.innerHTML = printContents
    window.document.append('<link rel="stylesheet" href="print-bill.component.scss">')
    window.print();
    window.document.close();
  }

  getDispatchNoteMasterData(id: number) {
    this.dispatchNoteService.getDispatchNoteMasterById(id).subscribe(res => {
      this.gdnMaster = res.result;
      this.gdnLines = res.result.goodsDispatchNoteLines;
      this.isLoading = false
      this.cdRef.markForCheck();
    },
      (err: any) => {
        this.isLoading = false
      })
  }
}
