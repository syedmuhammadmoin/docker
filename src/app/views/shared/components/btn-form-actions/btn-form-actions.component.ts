import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppComponentBase } from '../../app-component-base';

@Component({
  selector: 'kt-btn-form-actions',
  templateUrl: './btn-form-actions.component.html',
  styleUrls: ['./btn-form-actions.component.scss']
})
export class BtnFormActionsComponent extends AppComponentBase {
  @Input() editDisplay: boolean;
  @Input() permissionz: any
  @Input() validate : FormAction
  @Output() resetAction = new EventEmitter<any>();
  @Output() toggleEdit = new EventEmitter<any>();
  constructor(injector: Injector) {
    super(injector);
  }
}
interface FormAction {
  form: FormGroup
  errors: any
  messages: any
}
