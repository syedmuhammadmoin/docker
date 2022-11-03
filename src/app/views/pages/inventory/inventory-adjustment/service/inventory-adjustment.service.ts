import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../../../../environments/environment';
import {IInventoryAdjustment} from '../model/IInventoryAdjustment';
import {AppConst} from "../../../../shared/AppConst";

@Injectable({
  providedIn: 'root'
})

export class InventoryAdjustmentService {
  // base url
  baseUrl = AppConst.remoteServiceBaseUrl + 'InventoryAdjustment';

  constructor(private httpClient: HttpClient) {
  }

  // get all inventory records
  getInventoryAdjustments(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl).pipe(catchError(this.handleError));
  }

  // get invrntory by id method
  getInventoryAdjustmentMaster(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
  }


  // add inventory adjustment method
  createInventoryAdjustment(IAdjustment: IInventoryAdjustment): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, IAdjustment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  // update inventory  adjustment method
  updateInventoryAdjustment(inventoryAdjustmentModel: IInventoryAdjustment): Observable<any> {
    return this.httpClient.put(this.baseUrl + `/${inventoryAdjustmentModel.id}`, inventoryAdjustmentModel)
  }

  // error handler method
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}


