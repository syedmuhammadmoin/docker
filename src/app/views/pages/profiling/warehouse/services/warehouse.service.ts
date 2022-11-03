import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IWarehouse} from '../model/IWarehouse'
import {IPaginationResponse} from 'src/app/views/shared/IPaginationResponse';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {AppConst} from "../../../../shared/AppConst";
import {AppServiceBase} from "../../../../shared/app-service-base";

@Injectable({
  providedIn: 'root'
})

export class WarehouseService extends AppServiceBase<IWarehouse>{

  baseUrl = AppConst.remoteServiceBaseUrl + 'Warehouse';

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  getWarehouses(): Observable<IPaginationResponse<IWarehouse[]>> {
    return this.httpClient.get<IPaginationResponse<IWarehouse[]>>(this.baseUrl)
  }

  getWarehousesDropdown(): Observable<IApiResponse<IWarehouse[]>> {
    return this.httpClient.get<IApiResponse<IWarehouse[]>>(this.baseUrl + '/dropdown')
  }

  getWarehouse(id: number): Observable<IApiResponse<IWarehouse>> {
    return this.httpClient.get<IApiResponse<IWarehouse>>(`${this.baseUrl}/${id}`)
  }

  addWarehouse(warehouse: IWarehouse): Observable<IWarehouse> {
    return this.httpClient.post<IWarehouse>(`${this.baseUrl}`, warehouse, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateWarehouse(warehouse: IWarehouse): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${warehouse.id}`, warehouse, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  deleteWarehouse(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
  }

  getRecords(params: any){
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
