import {Injectable, Injector} from '@angular/core';
import {AppServiceBase} from '../../../shared/app-service-base';
import {IPayableReceivable} from '../models/IPayableReceivable';
import {Observable} from 'rxjs';
import {AppConst} from '../../../shared/AppConst';
import {IBankAccountSummary} from '../models/IBankAccountSummary';
import {IExpenseIncomeSummary} from '../models/IExpenseIncomeSummary';
import {IApiResponse} from '../../../shared/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends AppServiceBase<IPayableReceivable> {

  baseUrl = AppConst.remoteServiceBaseUrl;

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  getReceivables(): Observable<IApiResponse<IPayableReceivable>> {
    return this.httpClient.get<IApiResponse<IPayableReceivable>>(this.baseUrl + 'Dashboard/GetUnpaidInvoicesAndReceivables');
  }

  getPayable(): Observable<IApiResponse<IPayableReceivable>> {
    return this.httpClient.get<IApiResponse<IPayableReceivable>>(this.baseUrl + 'Dashboard/GetUnpaidBillsAndPayables');
  }

  getBankAccountsSummary(): Observable<IApiResponse<IBankAccountSummary>> {
    return this.httpClient.get<IApiResponse<IBankAccountSummary>>(this.baseUrl + 'Dashboard/GetBankAccountsSummary');
  }

  getExpenseAndIncomeSummary(): Observable<IApiResponse<IExpenseIncomeSummary>> {
    return this.httpClient.get<IApiResponse<IExpenseIncomeSummary>>(this.baseUrl + 'Dashboard/GetExpenseAndIncomeSummary');
  }
}
