import { AppComponentBase } from './app-component-base';
import { Injector } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { CustomTooltipComponent } from './components/custom-tooltip/custom-tooltip.component';
import { IPaginationResponse } from './IPaginationResponse';

export abstract class AppListComponentBase<T> extends AppComponentBase {
  constructor(injector: Injector) {
    super(injector);
    // this.serviceClass = injector.get(typeof this.serviceClass);
  }
}
