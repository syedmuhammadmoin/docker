import {Injectable, Injector} from '@angular/core';
import {ICreditNote} from '../model/ICreditNote';
import {HttpHeaders} from '@angular/common/http';
import {IWorkflow} from '../../../purchase/vendorBill/model/IWorkflow';
import {IPaginationResponse} from 'src/app/views/shared/IPaginationResponse';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {Observable} from 'rxjs/internal/Observable';
import {AppConst} from "../../../../shared/AppConst";
import {AppServiceBase} from "../../../../shared/app-service-base";

@Injectable({
  providedIn: 'root'
})

export class CreditNoteService extends AppServiceBase<ICreditNote>{

  baseUrl = AppConst.remoteServiceBaseUrl + 'CreditNote';

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  getCreditNotes(): Observable<IPaginationResponse<ICreditNote[]>> {
    return this.httpClient.get<IPaginationResponse<ICreditNote[]>>(this.baseUrl)
  }

  getCreditNoteById(id: number): Observable<IApiResponse<ICreditNote>> {
    return this.httpClient.get<IApiResponse<ICreditNote>>(`${this.baseUrl}/${id}`)
  }

  createCreditNote(creditNote: ICreditNote): Observable<IApiResponse<ICreditNote>> {
    return this.httpClient.post<IApiResponse<ICreditNote>>(this.baseUrl, creditNote, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  resetToDraft(creditNoteId): Observable<IApiResponse<boolean>> {
    return this.httpClient.post<IApiResponse<boolean>>((AppConst.remoteServiceBaseUrl + `creditNote/reset/${creditNoteId}`), {id: creditNoteId}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateCreditNote(creditNoteModel: ICreditNote): Observable<IApiResponse<ICreditNote>> {
    return this.httpClient.put<IApiResponse<ICreditNote>>(this.baseUrl + `/${creditNoteModel.id}`, creditNoteModel)
  }

  workflow(workflow: IWorkflow): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/workflow', workflow);
  }

  getRecords(params: any) {
    return super.getRecords(params, 'noteDate', this.baseUrl);
  }

  /*private handleError(errorResponse: HttpErrorResponse) {
      if (errorResponse.error instanceof ErrorEvent) {
          console.error('Client Side Error :', errorResponse.error.message);
      } else {
          console.error('Server Side Error :', errorResponse);
      }
      return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }*/

}
