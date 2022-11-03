import {Injectable, Injector} from '@angular/core';
import {IInvoice} from '../model/IInvoice';
import {HttpHeaders} from '@angular/common/http';
import {IWorkflow} from '../../../purchase/vendorBill/model/IWorkflow';
import {ITransactionRecon} from '../../../purchase/vendorBill/model/ITransactionRecon';
import {IPaginationResponse} from 'src/app/views/shared/IPaginationResponse';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {Observable} from 'rxjs/internal/Observable';
import {AppConst} from "../../../../shared/AppConst";
import {AppServiceBase} from "../../../../shared/app-service-base";


@Injectable({
  providedIn: 'root'
})

export class InvoiceService extends AppServiceBase<IInvoice> {

  baseUrl = AppConst.remoteServiceBaseUrl + 'Invoice';

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  getInvoices(): Observable<IPaginationResponse<IInvoice[]>> {
    return this.httpClient.get<IPaginationResponse<IInvoice[]>>(this.baseUrl)
  }
  getAgingReport(): Observable<IPaginationResponse<IInvoice[]>> {
    return this.httpClient.get<IPaginationResponse<IInvoice[]>>(this.baseUrl + '/getAgingReport')
  }

  getInvoiceById(id: number): Observable<IApiResponse<IInvoice>> {
    return this.httpClient.get<IApiResponse<IInvoice>>(`${this.baseUrl}/${id}`)
  }

  createInvoice(Invoice: IInvoice): Observable<IApiResponse<IInvoice>> {
    return this.httpClient.post<IApiResponse<IInvoice>>(this.baseUrl, Invoice, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateInvoice(invoiceModel: IInvoice): Observable<IApiResponse<IInvoice>> {
    return this.httpClient.put<IApiResponse<IInvoice>>(this.baseUrl + `/${invoiceModel.id}`, invoiceModel)
  }

  workflow(workflow: IWorkflow): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/workflow', workflow);
  }

  reconcilePayment(transactionRecon: ITransactionRecon): Observable<any> {
    return this.httpClient.post<ITransactionRecon>((AppConst.remoteServiceBaseUrl + 'TransactionRecon'), transactionRecon, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  unReconcileDocument(transactionRecon: ITransactionRecon): Observable<any> {
    return this.httpClient.post<ITransactionRecon>((AppConst.remoteServiceBaseUrl + 'TransactionRecon/unreconcile'), transactionRecon, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  resetToDraft(invoiceId): Observable<IApiResponse<boolean>> {
    return this.httpClient.post<IApiResponse<boolean>>((AppConst.remoteServiceBaseUrl + `invoice/reset/${invoiceId}`), {id: invoiceId}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getRecords(params: any) {
    return super.getRecords(params, 'invoiceDate', this.baseUrl);
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



