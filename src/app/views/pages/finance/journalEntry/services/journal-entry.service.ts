import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IJournalEntry} from '../model/IJournalEntry';
import {IWorkflow} from '../../../purchase/vendorBill/model/IWorkflow';
import {IPaginationResponse} from 'src/app/views/shared/IPaginationResponse';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {AppConst} from '../../../../shared/AppConst';
import {AppServiceBase} from "../../../../shared/app-service-base";


@Injectable({
  providedIn: 'root'
})

export class JournalEntryService extends AppServiceBase<IJournalEntry> {

  baseUrl = AppConst.remoteServiceBaseUrl + 'journalEntry';

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  getJournalEntries(): Observable<IPaginationResponse<IJournalEntry[]>> {
    return this.httpClient.get<IPaginationResponse<IJournalEntry[]>>(this.baseUrl)
  }

  getJournalEntryById(id: number): Observable<IApiResponse<IJournalEntry>> {
    return this.httpClient.get<IApiResponse<IJournalEntry>>(this.baseUrl + '/' + id)
  }

  addJournalEntry(journalEntry: IJournalEntry): Observable<IApiResponse<IJournalEntry>> {
    return this.httpClient.post<IApiResponse<IJournalEntry>>(this.baseUrl, journalEntry, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateJournalEntry(JVModel: IJournalEntry): Observable<IApiResponse<IJournalEntry>> {
    return this.httpClient.put<IApiResponse<IJournalEntry>>(this.baseUrl + `/${JVModel.id}`, JVModel, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }


  workflow(workflow: IWorkflow): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/workflow', workflow);
  }

  getRecords(params: any): Observable<IPaginationResponse<Array<IJournalEntry>>> {
    return super.getRecords(params, 'date', this.baseUrl);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
