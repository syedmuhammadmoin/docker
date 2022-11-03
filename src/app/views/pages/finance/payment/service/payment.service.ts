import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {IPaginationResponse} from 'src/app/views/shared/IPaginationResponse';
import {IWorkflow} from '../../../purchase/vendorBill/model/IWorkflow';
import {IPayment} from '../model/IPayment';
import {AppConst} from '../../../../shared/AppConst';
import {AppServiceBase} from "../../../../shared/app-service-base";

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends AppServiceBase<IPayment> {

  baseUrl = AppConst.remoteServiceBaseUrl;

  constructor(injector: Injector) {
    super(injector)
  }

  getPayments(selectedDocument): Observable<IPaginationResponse<IPayment[]>> {
    const url = this.baseUrl + selectedDocument;
    return this.httpClient.get<IPaginationResponse<IPayment[]>>(url)
  }

  getPaymentById(selectedDocument, id: number): Observable<IApiResponse<IPayment>> {
    const url = this.baseUrl + selectedDocument;
    return this.httpClient.get<IApiResponse<IPayment>>(url + '/' + id)
  }

  addPayment(selectedDocument, payment: IPayment): Observable<IApiResponse<IPayment>> {
    const url = this.baseUrl + selectedDocument;
    return this.httpClient.post<IApiResponse<IPayment>>(`${url}`, payment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  resetToDraft(selectedDocument, paymentId): Observable<IApiResponse<IPayment>> {
    const url = this.baseUrl + selectedDocument + '/reset/' + paymentId;
    return this.httpClient.post<IApiResponse<IPayment>>(url, {})
  }

  updatePayment(selectedDocument, payment: IPayment): Observable<void> {
    const url = this.baseUrl + selectedDocument;
    return this.httpClient.put<void>(url + `/${payment.id}`, payment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  paymentWorkflow(body: IWorkflow): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/workflow', body)
  }

  getRecords(params: any, selectedDocument) {
    const url = this.baseUrl + selectedDocument;
    return super.getRecords(params, 'paymentDate', url);
  }

  // for error handling.....
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
