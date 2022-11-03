import {Injectable, Injector} from '@angular/core';
import {IDebitNote} from '../model/IDebitNote';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IWorkflow} from '../../vendorBill/model/IWorkflow';
import {AppConst} from '../../../../shared/AppConst';
import {AppServiceBase} from '../../../../shared/app-service-base';
import {IApiResponse} from "../../../../shared/IApiResponse";

@Injectable({
  providedIn: 'root'
})

export class DebitNoteService extends AppServiceBase<IDebitNote> {

  baseUrl = AppConst.remoteServiceBaseUrl + 'DebitNote';

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  getDebitNotes(): Observable<any> {
    return this.httpClient.get<any[]>(this.baseUrl)
  }

  getDebitNoteMaster(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`)
  }

  updateDebitNote(debitNoteModel: IDebitNote): Observable<any> {
    return this.httpClient.put(this.baseUrl + `/${debitNoteModel.id}`, debitNoteModel)
  }

  resetToDraft(debitNoteId): Observable<IApiResponse<boolean>> {
    return this.httpClient.post<IApiResponse<boolean>>((AppConst.remoteServiceBaseUrl + `debitNote/reset/${debitNoteId}`), {id: debitNoteId}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  workflow(workflow: IWorkflow): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/workflow', workflow);
  }

  createDebitNote(debitNote: IDebitNote): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, debitNote, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getRecords(params: any) {
    return super.getRecords(params, 'noteDate', this.baseUrl);
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



