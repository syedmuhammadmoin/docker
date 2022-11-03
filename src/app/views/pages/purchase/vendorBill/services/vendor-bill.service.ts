import {Injectable, Injector} from '@angular/core';
import {IVendorBill} from '../model/IVendorBill';
import {HttpHeaders} from '@angular/common/http';

import {IWorkflow} from '../model/IWorkflow';
import {ITransactionRecon} from '../model/ITransactionRecon';
import {Observable} from 'rxjs/internal/Observable';
import {AppConst} from 'src/app/views/shared/AppConst';
import {AppServiceBase} from '../../../../shared/app-service-base';
import {IPaginationResponse} from "../../../../shared/IPaginationResponse";
import {IApiResponse} from "../../../../shared/IApiResponse";


@Injectable({
  providedIn: 'root'
})

export class VendorBillService extends AppServiceBase<IVendorBill> {

  baseUrl = AppConst.remoteServiceBaseUrl + 'bill';

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  createVendorBill(ivendorBill: IVendorBill): Observable<any> {
    return this.httpClient.post<IVendorBill>(this.baseUrl, ivendorBill, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getVendorBills(): Observable<any> {
    return this.httpClient.get<IVendorBill[]>(this.baseUrl)
  }

  getBillAgingReport(): Observable<any> {
    return this.httpClient.get<IVendorBill[]>(this.baseUrl + '/getAgingReport')
  }

  getVendorBillMaster(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`)
  }

  getVendorBillDetail(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/` + 'details/' + `${id}`)
  }

  updateVendorBill(billModel: IVendorBill): Observable<any> {
    return this.httpClient.put(this.baseUrl + `/${billModel.id}`, billModel)
  }

  workflow(workflow: IWorkflow): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/workflow', workflow);
  }

  createTransitionReconcile(transactionRecon: ITransactionRecon): Observable<any> {
    return this.httpClient.post<any>(AppConst.remoteServiceBaseUrl + 'TransactionRecon', transactionRecon, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  unReconcileDocument(transactionRecon: ITransactionRecon): Observable<any> {
    return this.httpClient.post<any>(AppConst.remoteServiceBaseUrl + 'TransactionRecon/unreconcile', transactionRecon, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  resetToDraft(billId): Observable<IApiResponse<boolean>> {
    return this.httpClient.post<IApiResponse<boolean>>((AppConst.remoteServiceBaseUrl + `bill/reset/${billId}`), {id: billId}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getRecords(params: any): Observable<IPaginationResponse<Array<IVendorBill>>> {
    return super.getRecords(params, 'billDate', this.baseUrl);
  }

  /*private handleError(errorResponse: HttpErrorResponse) {
      if (errorResponse.error instanceof ErrorEvent) {
          console.error('Client Side Error :', errorResponse.error.message);
      } else {
          console.error('Server Side Error :', errorResponse);
      }
      return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }*/

}

