import {Injectable} from '@angular/core';
import {GridApi} from 'ag-grid-community';

@Injectable({
  providedIn: 'root'
})
export class PaginationHelperService {
  private readonly storeName: string;
  private readonly pageNumber: Map<string, number>;

  constructor() {
    this.storeName = 'page-numbers';
    this.pageNumber = new Map<string, number>();
  }

  setPageNumber(pageName: string, pageNumber: number) {
    this.pageNumber.set(pageName, pageNumber);
    localStorage.setItem(this.storeName, JSON.stringify(Array.from(this.pageNumber.entries())));
  }

  goToPage(gridApi: GridApi, pageName: string) {
    const pageToNavigate = this.getPageNumber(pageName);
    if (gridApi) {
      gridApi.paginationGoToPage(pageToNavigate - 1);
    }
  }

  onPaginationChanged(pageName: string, params) {
    if (params.newPage) {
      this.setPageNumber(pageName, params.api.paginationGetCurrentPage() + 1);
      if (params.api.paginationGetCurrentPage() + 1 !== 1) {
        this.goToPage(params.api, pageName)
      }
    }
  }

  private getPageNumber(pageName: string) {
    let pageNumber;
    const store = new Map(JSON.parse(localStorage.getItem(this.storeName)));
    if (!this.isEmptyObject(store)) {
      pageNumber = store.get(pageName)
    }
    return pageNumber;
  }

  private isEmptyObject(value) {
    return Object.keys(value).length === 0 && value.constructor === Object;
  }
}
