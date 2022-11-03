import {IDepartment} from '../model/IDepartment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable, Injector} from '@angular/core';
import {IPaginationResponse} from 'src/app/views/shared/IPaginationResponse';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {AppConst} from '../../../../shared/AppConst';
import {AppServiceBase} from "../../../../shared/app-service-base";

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends AppServiceBase<IDepartment> {

  baseUrl = AppConst.remoteServiceBaseUrl + 'Department';

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  getDepartments(): Observable<IPaginationResponse<IDepartment[]>> {
    return this.httpClient.get<IPaginationResponse<IDepartment[]>>(this.baseUrl)
  }

  getDepartmentsDropdown(): Observable<IApiResponse<IDepartment[]>> {
    return this.httpClient.get<IApiResponse<IDepartment[]>>(this.baseUrl + '/dropdown')
  }

  getDepartment(id: number): Observable<IApiResponse<IDepartment>> {
    return this.httpClient.get<IApiResponse<IDepartment>>(`${this.baseUrl}/${id}`)
  }

  addDepartment(department: IDepartment): Observable<IDepartment> {
    return this.httpClient.post<IDepartment>(`${this.baseUrl}`, department, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateDepartment(department: IDepartment): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${department.id}`, department, {
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
