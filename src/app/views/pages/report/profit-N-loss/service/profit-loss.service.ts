import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {IProfitLoss} from '../model/IProfitLoss';
import {Observable} from 'rxjs/internal/Observable';
import {AppConst} from "../../../../shared/AppConst";

@Injectable({
  providedIn: 'root'
})
export class ProfitLossService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  getProfitNLoss(body: IProfitLoss): Observable<any> {
    return this.httpClient.post(AppConst.remoteServiceBaseUrl + 'PNL', body)
  }
}
