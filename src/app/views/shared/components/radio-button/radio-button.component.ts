import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, Validators } from '@angular/forms';

@Component({
  selector: 'kt-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit , ControlValueAccessor, Validators {
  @ViewChild(FormControlDirective, {static: true}) formControlDirective: FormControlDirective;
  @Input() formControl: FormControl;
  @Input() formControlName: string;
  // @Input() control: ControlSetting
  @Input() placeholder: string;
  @Input() readonly: boolean;
  @Input() hintText: string;
  @Input() errorMessage: string | any;
  @Input() matFormFieldClass: any | [] | string;
  @Input() value: number | string | any = null;
  @Input() inputClass: any | [] | string = 'full-width';
  @Input() isDisabled: boolean;
  @Input() list: SelectOptions[] = [];
  @Output() blurEvent = new EventEmitter<any>();
  @Output() changeEvent = new EventEmitter<any>();

  constructor (private controlContainer: ControlContainer) { }

  ngOnInit(): void { this.value = this.control?.value }
  get control() {
    return this.formControl || this.controlContainer.control.get(this.formControlName)
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
  onChange(event) {
    this.changeEvent.emit(event)
  }
}
export interface SelectOptions {
  id: string;
  title: string;
  objectz: any
}
export interface ControlSetting {
  id: string
  control: FormControl | string
  placeholder: string
  readonly: boolean
  hintText: string
  value: string
  disabled: boolean
}
