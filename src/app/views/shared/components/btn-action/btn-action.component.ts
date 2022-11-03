import { Component, Output, EventEmitter, Input, Injector } from '@angular/core';
import { AppComponentBase } from '../../app-component-base';

@Component({
  selector: 'kt-btn-action',
  templateUrl: './btn-action.component.html',
  styleUrls: ['./btn-action.component.scss']
})
export class BtnActionComponent extends AppComponentBase {
  @Input() editDisplay: boolean;
  @Input() btnText: string;
  @Input() permissionz: any
  @Output() clickEvent = new EventEmitter<any>();
  constructor(injector: Injector) {
    super(injector);
  }
}
