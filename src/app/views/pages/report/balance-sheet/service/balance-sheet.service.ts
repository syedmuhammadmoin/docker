import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import {AppConst} from "../../../../shared/AppConst";
import { IBalanceSheet } from '../model/IBalanceSheet';
import { environment } from 'src/environments/environment';
import { IApiResponse } from 'src/app/views/shared/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class BalanceSheetService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getBalanceSheetReport(body: any): Observable<any> {
    const url = AppConst.remoteServiceBaseUrl + 'BalanceSheet'
    return this.httpClient.post(url, body);
  }


}


