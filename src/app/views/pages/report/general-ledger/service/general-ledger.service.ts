import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { AppConst } from 'src/app/views/shared/AppConst';

@Injectable({
  providedIn: 'root'
})
export class GeneralLedgerService {
  baseUrl = AppConst.remoteServiceBaseUrl + 'GeneralLedger';

  constructor(private httpClient: HttpClient) {
  }

  getLedger(generalLedger): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}`, generalLedger, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  // for error handling.....
  /*private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }*/
}
