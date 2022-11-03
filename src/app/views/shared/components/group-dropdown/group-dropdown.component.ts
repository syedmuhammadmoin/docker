import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'kt-group-dropdown',
  templateUrl: './group-dropdown.component.html',
  styleUrls: ['./group-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: GroupDropdownComponent,
    multi: true
  }]
})
export class GroupDropdownComponent implements OnInit {
  @ViewChild(FormControlDirective, {static: true}) formControlDirective: FormControlDirective;
  // Not in Use
  @ViewChild('customGroupSelect') customSelect: ElementRef

  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() optionList: Observable<any> | any;
  @Input() propertyName: string = 'name';
  @Input() propertyValue: string = 'id';
  @Input() secondaryPropertyName: string;
  @Input() placeholder: string;
  @Input() errorMessage: string;
  @Input() groupPropertyName: string;
  @Input() groupChildrenName: string;
  @Input() clickEventButtonName: string;
  @Input() matSelectClass: any | [] | string
  @Input() matFormFieldClass: any | [] | string
  @Input() isDisabled: boolean;
  @Input() isDisabledNone: boolean = true;
  @Input() isMultiple: boolean;
  @Input() maxSelectionCount: number
  @Input() callBackFunction: (param: any) => any

  @Output() selectionChangeEvent = new EventEmitter<any>()
  @Output() clickEvent = new EventEmitter<any>();
  @Output() blurEvent = new EventEmitter<any>();


  filterControl: FormControl = new FormControl();
  filteredOptionList: ReplaySubject<any[]> = new ReplaySubject<[]>(1);
  isLoading: boolean;
  private options: any = [];
  private selectedOptions = []
  constructor(
    // @Self() public controlDir: NgControl,
    private controlContainer: ControlContainer) {
    // this.controlDir.valueAccessor = this;
  }
  get control() {
    return this.formControl || this.controlContainer.control.get(this.formControlName);
  }
  ngOnInit(): void {
    if (this.optionList instanceof Observable) {
      this.isLoading = true;
      this.optionList.subscribe((res) => {
        this.options = (res && res.result) ? res.result : res;
        if (this.options && this.options.length > 0) {
          this.options = this.callBackFunction ? this.options.flatMap(this.callBackFunction) : this.options
          if (this.options.length > 0 || res?.isSuccess) this.isLoading = false;
          // @ts-ignore
          this.filteredOptionList.next(this.options?.slice());
        }
      });
    } else {
      this.options = this.callBackFunction ? this.optionList.flatMap(this.callBackFunction) : this.optionList;
      this.filteredOptionList.next(this.options?.slice());
    }

    // listen for search field value changes
    this.filterControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.filterOptionGroups();
      });
  }
  emitClickEvent() {
    this.clickEvent.emit();
  }
  blur() {
    this.blurEvent.emit()
  }

  /*onTouched() {}
  onChange(event) {}*/

  selectionChange(event) {
    if (this.maxSelectionCount && this.selectedOptions.length <= this.maxSelectionCount) {
      this.selectedOptions = event.value
    }
    this.selectionChangeEvent.emit(event)
  }

  isOptionDisabled(id): boolean {
    return (this.selectedOptions.length >= this.maxSelectionCount && !this.selectedOptions.find(x => x === id));
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
  }
  protected filterOptionGroups() {
    if (!this.optionList) {
      return;
    }
    // get the search keyword
    let search = this.filterControl.value;
    const optionGroupsCopy = this.copyBankGroups(this.options);
    if (!search) {
      // @ts-ignore
      this.filteredOptionList.next(optionGroupsCopy);
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredOptionList.next(
      // @ts-ignore
      optionGroupsCopy.filter(optionGroup => {
        const showOptionGroup = optionGroup[this.groupPropertyName].toLowerCase().indexOf(search) > -1;
        if (!showOptionGroup) {
          optionGroup[this.groupChildrenName] = optionGroup[this.groupChildrenName].filter(child => child[this.propertyName].toLowerCase().indexOf(search) > -1);
        }
        return optionGroup[this.groupChildrenName].length > 0;
      })
    );
  }

  protected copyBankGroups(optionGroups: any[]) {
    const optionGroupsCopy = [];
    optionGroups.forEach(optionGroup => {
      optionGroupsCopy.push({
        [this.groupPropertyName]: optionGroup[this.groupPropertyName],
        // @ts-ignore
        [this.groupChildrenName]: optionGroup[this.groupChildrenName].slice()
      });
    });
    return optionGroupsCopy;
  }
  public hasRequired() {
    if(this.control && this.control?.validator){
      return this.control.validator('required' as any)
    }
  }
}
