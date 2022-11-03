import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IStatus} from '../model/IStatus';
import {Observable} from 'rxjs/internal/Observable';
import {AppConst} from '../../../../shared/AppConst';

@Injectable({
  providedIn: 'root'
})

export class StatusService {

  constructor(private httpClient: HttpClient) {
  }

  getStatuses(): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'status');
  }

  createStatus(body: IStatus): Observable<any> {
    return this.httpClient.post(AppConst.remoteServiceBaseUrl + 'status', body);
  }

  updateStatus(body: IStatus): Observable<any> {
    return this.httpClient.put(AppConst.remoteServiceBaseUrl + 'status/' + body.id, body);
  }

  getStatus(id: any): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'status/' + id);
  }
}
