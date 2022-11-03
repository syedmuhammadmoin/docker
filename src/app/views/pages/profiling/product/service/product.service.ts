import {IProduct} from '../model/IProduct';
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

export class ProductService extends AppServiceBase<IProduct> {

  baseUrl = AppConst.remoteServiceBaseUrl + 'Product';

  constructor(injector: Injector) {
    super(injector);
  }

  getProducts(): Observable<IPaginationResponse<IProduct[]>> {
    return this.httpClient.get<IPaginationResponse<IProduct[]>>(this.baseUrl)
  }

  getProductsDropdown(): Observable<IApiResponse<IProduct[]>> {
    return this.httpClient.get<IApiResponse<IProduct[]>>(this.baseUrl + '/dropdown')
  }

  getProduct(id: number): Observable<IApiResponse<IProduct>> {
    return this.httpClient.get<IApiResponse<IProduct>>(`${this.baseUrl}/${id}`)
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>(`${this.baseUrl}`, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateProduct(product: IProduct): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${product.id}`, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getRecords(params: any): Observable<IPaginationResponse<Array<IProduct>>> {
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
