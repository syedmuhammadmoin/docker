import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConst } from '../../AppConst';
import { IApiResponse } from '../../IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class UserSettingService {
  constructor(
    private httpClient: HttpClient
  ) {
  }
  updateDateFormate(data: any): Observable<IApiResponse<any>>{
    return this.httpClient.put<any>(AppConst.remoteServiceBaseUrl + 'auth/users', data)
  }
}
