import {ICashAccount} from '../model/ICashAccount';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../../../../environments/environment';
import {Injectable, Injector} from '@angular/core';
import {IPaginationResponse} from 'src/app/views/shared/IPaginationResponse';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {AppConst} from "../../../../shared/AppConst";
import {AppServiceBase} from "../../../../shared/app-service-base";

@Injectable({
  providedIn: 'root',
})

export class CashAccountService extends AppServiceBase<ICashAccount> {

  baseUrl = AppConst.remoteServiceBaseUrl + 'CashAccount';

  constructor(injector: Injector) {
    super(injector);
  }

  getCashAccounts(): Observable<IPaginationResponse<ICashAccount[]>> {
    return this.httpClient.get<IPaginationResponse<ICashAccount[]>>(this.baseUrl)
  }

  getCashAccountsDropdown(): Observable<IApiResponse<ICashAccount[]>> {
    return this.httpClient.get<IApiResponse<ICashAccount[]>>(this.baseUrl + '/dropdown')
  }

  getCashAccount(id: number): Observable<IApiResponse<ICashAccount>> {
    return this.httpClient.get<IApiResponse<ICashAccount>>(`${this.baseUrl}/${id}`)
  }

  addCashAccount(cashAccount: ICashAccount): Observable<ICashAccount> {
    return this.httpClient.post<ICashAccount>(`${this.baseUrl}`, cashAccount, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateCashAccount(cashAccount: ICashAccount): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${cashAccount.id}`, cashAccount, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getRecords(params: any) {
    return super.getRecords(params, '', this.baseUrl);
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
