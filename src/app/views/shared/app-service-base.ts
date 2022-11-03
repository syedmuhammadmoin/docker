import { Injector } from '@angular/core';
import { DateHelperService } from './helpers/date-helper';
import { AppConst } from './AppConst';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { IPaginationResponse } from "./IPaginationResponse";

export abstract class AppServiceBase<T> {
  dateHelperService: DateHelperService
  httpClient: HttpClient

  protected constructor(injector: Injector) {
    this.dateHelperService = injector.get(DateHelperService)
    this.httpClient = injector.get(HttpClient);
  }

  getRecords(params: any, dateParamName, url): Observable<IPaginationResponse<Array<T>>> {
    return this.httpClient.get<IPaginationResponse<Array<T>>>(url, {
      params: this.getfilterParams(
        params, this.dateHelperService.transformDate(
          params?.filterModel?.[dateParamName]?.dateFrom, 'MM/d/y')
      )
    });
  }
  getfilterParams(params: any, date?: any, name?: any) {
    let status = '';
    if (params?.filterModel?.status?.values.length === 1) {
      AppConst.filterStatus.forEach((val) => val.value === params.filterModel.status.values[0] ? status = (val.id).toString() : '')
    }
    const fm = params?.filterModel
    let httpParams = new HttpParams()
      .set('pageStart', params.startRow)
      .set('pageEnd', params.endRow)
      .set('docNo', fm?.docNo?.filter || fm?.cnic?.filter || '')
      .set('businessPartner', (
        fm?.businessPartner?.filter ||
        fm?.vendor?.filter ||
        fm?.vendorName?.filter ||
        fm?.customerName?.filter ||
        fm?.businessPartnerName?.filter ||
        fm?.bankName?.filter ||
        name) || '')
      .set('department',
        (fm?.department?.filter) ||
        (fm?.departmentName?.filter) || '')
      .set('docDate', date || '')
      .set('dueDate', this.dateHelperService.transformDate(fm?.dueDate?.dateFrom, 'MM/d/y') || '')
      .set('state', status)
      .set('name',
        (fm?.name?.filter) ||
        (fm?.productName?.filter) ||
        (fm?.businessPartner?.filter) ||
        fm?.cashAccountName?.filter ||
        fm?.accountTitle?.filter || '')
      .set('warehouse', (fm?.warehouse?.filter) || (fm?.warehouseName?.filter) || '')
      .set('location', (fm?.location?.filter) || '')
      .set('account', (fm?.account?.filter) || '')
    return httpParams
  }
}
