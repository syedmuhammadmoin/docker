import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppComponentBase } from '../../app-component-base';

@Component({
  selector: 'kt-btn-form-draft',
  templateUrl: './btn-form-draft.component.html',
  styleUrls: ['./btn-form-draft.component.scss']
})
export class BtnFormDraftComponent  extends AppComponentBase {
  @Input() saveDisplay: boolean = true;
  @Input() submitDisplay: boolean = true;
  @Input() permissionz: any
  @Input() validate : FormAction
  @Output() resetAction = new EventEmitter<any>();
  @Output() submitAction = new EventEmitter<any>();
  constructor(injector: Injector) {
    super(injector);
  }
}
interface FormAction {
  form: FormGroup
  errors: any
  messages: any
}
