import {Injectable, Injector} from '@angular/core';
import {IBankStatement} from '../model/IBankStatement';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IPaginationResponse} from 'src/app/views/shared/IPaginationResponse';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {AppConst} from "../../../../shared/AppConst";
import {AppServiceBase} from "../../../../shared/app-service-base";

@Injectable({
  providedIn: 'root'
})

export class BankStatementService extends AppServiceBase<IBankStatement> {

  baseUrl = AppConst.remoteServiceBaseUrl + 'bankStmt';

  constructor(injector: Injector) {
    super(injector)
  }

  getBankStatements(): Observable<IPaginationResponse<IBankStatement[]>> {
    return this.httpClient.get<IPaginationResponse<IBankStatement[]>>(this.baseUrl)
  }

  getBankStatement(id: number): Observable<IApiResponse<IBankStatement>> {
    return this.httpClient.get<IApiResponse<IBankStatement>>(`${this.baseUrl}/${id}`)
  }

  addBankStatement(model: { data: IBankStatement, files: File }): Observable<any> {
    const object: IBankStatement = model.data
    let params = new HttpParams();
    params = params.append('data', JSON.stringify(object));
    const formData = new FormData();
    formData.append('files', model.files);
    const options = {
      body: formData,
      params: params
    }
    return this.httpClient.request('post', `${this.baseUrl}`, options)
  }

  updateBankStatement(project: IBankStatement): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${project.id}`, project, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getRecords(params: any) {
    return super.getRecords(params, '', this.baseUrl);
  }

  // for error handling.....
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}


