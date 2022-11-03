import {Injectable} from '@angular/core';
import {IStock} from '../model/IStock';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AppConst} from "../../../../shared/AppConst";

@Injectable({
  providedIn: 'root'
})

export class StockService {

  constructor(private httpClient: HttpClient) {
  }

  getAllStocks(): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'stock')
  }

  getStockMasterById(id: number): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'stock/' + id)
  }

  getStockDetailById(id: number): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'stock/d/' + id)
  }

  createStock(stockModel: IStock): Observable<any> {
    return this.httpClient.post<IStock>(AppConst.remoteServiceBaseUrl + 'stock', stockModel, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
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







