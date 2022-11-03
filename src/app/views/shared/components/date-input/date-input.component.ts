import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlContainer, FormControl, FormControlDirective, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'kt-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DateInputComponent,
    multi: true
  }]
})
export class DateInputComponent implements OnInit, Validators {

  @ViewChild(FormControlDirective, {static: true}) formControlDirective: FormControlDirective;

  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() placeholder: string;
  @Input() hintText: string;
  @Input() errorMessage: string;
  @Input() maxDate: Date;
  @Input() minDate: Date;
  @Input() dateMessage: string;
  @Input() dateCondition: boolean;


  @Input() matFormFieldClass: any | [] | string;

  @Output() blurEvent = new EventEmitter<any>();

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
  }

  get control() {
    return this.formControl || this.controlContainer.control.get(this.formControlName);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor.writeValue(obj);
  }

  blur() {
    this.blurEvent.emit()
  }
}
