import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import {Observable, ReplaySubject} from 'rxjs';
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'kt-simple-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DropdownComponent,
    multi: true
  }]
})
export class DropdownComponent implements OnInit, ControlValueAccessor, Validators {

  @ViewChild(FormControlDirective, {static: true}) formControlDirective: FormControlDirective;
  @ViewChild('customSelect') customSelect: ElementRef
  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() optionList: Observable<any> | any;
  // @Input() optionList: any = []
  @Input() isInnerHtml: boolean;
  @Input() isSecondaryInnerHtml: boolean;
  @Input() propertyName: string;
  @Input() propertyValue: string;
  @Input() isRequired = true;
  @Input() secondaryPropertyName: string;
  @Input() placeholder: string;
  @Input() searchPlaceholder: string;
  @Input() hintText: string;
  @Input() errorMessage: string;
  @Input() clickEventButtonName: string;
  @Input() matFormFieldClass: any | [] | string;
  @Input() matSelectClass: any | [] | string;
  @Input() isDisabled: boolean;
  @Input() isDisabledNone = true;
  @Input() callBackFunction: (param: any) => any
  @Input() isMultiple = false;
  @Input() maxSelectionCount: number
  @Output() clickEvent = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any>();

  // @Input() isLoading$: Observable<any>;
  @Output() blurEvent = new EventEmitter<any>();
  @Output() dataLoaded = new EventEmitter<boolean>();
  isLoading: boolean
  filterControl: FormControl = new FormControl();
  filteredOptionList: ReplaySubject<[]> = new ReplaySubject<[]>(1);
  private options: any = [];
  private selectedOptions = []

  constructor(
    private controlContainer: ControlContainer) {
  }

  get control() {
    return this.formControl || this.controlContainer.control.get(this.formControlName);
  }

  /*onTouched() {}
  onChange(event) {}*/

  ngOnInit(): void {
    this.isDisabledNone = this.isRequired;
    if (this.optionList instanceof Observable) {
      this.isLoading = true;
      this.optionList.subscribe((res) => {
        this.options = (res && res.result) ? res.result : res;
        if (this.options && this.options.length > 0) {
          this.options = this.callBackFunction ? this.options.flatMap(this.callBackFunction) : this.options
          if (this.options.length > 0 || res?.isSuccess) this.isLoading = false;
          // @ts-ignore
          this.filteredOptionList.next(this.options?.slice());
        } else {
          this.filteredOptionList.next([])
          this.control.patchValue(null)
        }
      });
    } else {
      this.options = this.callBackFunction ? this.optionList.flatMap(this.callBackFunction) : this.optionList;
      // @ts-ignore
      this.filteredOptionList.next(this.options?.slice());
    }

    // listen for search field value changes
    this.filterControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.filterBanks();
      });
  }

  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
    // this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
    // this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor.writeValue(obj);
    // this.customSelect.nativeElement.value = obj;
  }

  emitClickEvent() {
    this.clickEvent.emit();
  }

  selectionChangeEvent(event) {
    if (this.maxSelectionCount && this.selectedOptions.length <= this.maxSelectionCount) {
      this.selectedOptions = event.value
    }
    this.selectionChange.emit(event);
  }

  blur() {
    this.blurEvent.emit()
  }

  isOptionDisabled(id): boolean {
    return (this.selectedOptions.length >= this.maxSelectionCount && !this.selectedOptions.find(x => x === id));
  }

  protected filterBanks() {
    if (!this.options) {
      return;
    }
    // get the search keyword
    let search = this.filterControl.value;
    if (!search) {
      // @ts-ignore
      this.filteredOptionList.next([...this.options]);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredOptionList.next(
      // @ts-ignore
      this.options.filter((option) => option[this.propertyName].toString().toLowerCase().indexOf(search) > -1)
    );

    /*this.options.filter((option: any) => {
        if (typeof option[this.propertyName] === 'number') {
          option[this.propertyName].indexOf(search) > -1
        } else {
          option[this.propertyName].toLowerCase().indexOf(search) > -1
        }
      })*/
  }
  public hasRequired() {
    if(this.control && this.control?.validator){
      return this.control.validator('required' as any)
    }
  }
}
