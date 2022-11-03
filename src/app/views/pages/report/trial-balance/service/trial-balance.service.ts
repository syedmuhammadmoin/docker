import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ITrialBalance} from '../model/ITrialBalance';
import {environment} from '../../../../../../environments/environment';
import {Observable} from 'rxjs/internal/Observable';
import { AppConst } from 'src/app/views/shared/AppConst';

@Injectable({
  providedIn: 'root'
})
export class TrialBalanceService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  getTrialBalance(body: ITrialBalance): Observable<any> {
    return this.httpClient.post(AppConst.remoteServiceBaseUrl + 'TrialBalance', body)
  }
}
