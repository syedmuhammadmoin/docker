import {IBankAccount} from '../model/IBankAccount';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable, Injector} from '@angular/core';
import {IPaginationResponse} from 'src/app/views/shared/IPaginationResponse';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {AppConst} from "../../../../shared/AppConst";
import {AppServiceBase} from "../../../../shared/app-service-base";

@Injectable({
  providedIn: 'root',
})

export class BankAccountService extends AppServiceBase<IBankAccount> {

  baseUrl = AppConst.remoteServiceBaseUrl + 'bankaccount';

  constructor(injector: Injector) {
    super(injector);
  }

  getBankAccounts(): Observable<IPaginationResponse<IBankAccount[]>> {
    return this.httpClient.get<IPaginationResponse<IBankAccount[]>>(this.baseUrl)
  }

  getBankAccountsDropdown(): Observable<IApiResponse<IBankAccount[]>> {
    return this.httpClient.get<IApiResponse<IBankAccount[]>>(this.baseUrl + '/dropdown')
  }

  getBankAccount(id: number): Observable<IApiResponse<IBankAccount>> {
    return this.httpClient.get<IApiResponse<IBankAccount>>(`${this.baseUrl}/${id}`)
  }

  addBankAccount(bankAccount: IBankAccount): Observable<IBankAccount> {
    return this.httpClient.post<IBankAccount>(`${this.baseUrl}`, bankAccount, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateBankAccount(bankAccount: IBankAccount): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${bankAccount.id}`, bankAccount, {
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
