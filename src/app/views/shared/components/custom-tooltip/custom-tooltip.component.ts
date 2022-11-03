import {Component} from '@angular/core';
import {ITooltipAngularComp} from 'ag-grid-angular';

@Component({
  selector: 'kt-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.scss']
})

export class CustomTooltipComponent implements ITooltipAngularComp {

  public title: any;

  agInit(params): void {
    this.title = params?.context ||  'Double Click to Edit Data'
  }
}
