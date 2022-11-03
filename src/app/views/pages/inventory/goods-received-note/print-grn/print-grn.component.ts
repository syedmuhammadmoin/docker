import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../shared/app-component-base';

@Component({
  selector: 'kt-print-grn',
  templateUrl: './print-grn.component.html',
  styleUrls: ['./print-grn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PrintGrnComponent extends AppComponentBase implements OnInit {
  grnMaster: any;
  grnLines: any;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.getGrnMasterData(id);
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

  getGrnMasterData(id: number) {
    this.grnService.getGRNMasterById(id).subscribe(res => {
      this.grnMaster = res.result;
      this.grnLines = res.result.goodsReceivingNoteLines;
      this.cdRef.markForCheck();
    },
      (err: any) => {
      })
  }
}
