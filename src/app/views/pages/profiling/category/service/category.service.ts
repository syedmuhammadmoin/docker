import {ICategory} from '../model/ICategory';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable, Injector} from '@angular/core';
import {IPaginationResponse} from 'src/app/views/shared/IPaginationResponse';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {AppConst} from '../../../../shared/AppConst';
import {AppServiceBase} from '../../../../shared/app-service-base';

@Injectable({
  providedIn: 'root',
})

export class CategoryService extends AppServiceBase<ICategory> {

  baseUrl = AppConst.remoteServiceBaseUrl + 'Category';

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  getCategories(): Observable<IPaginationResponse<ICategory[]>> {
    return this.httpClient.get<IPaginationResponse<ICategory[]>>(this.baseUrl)
  }

  getCategoriesDropdown(): Observable<IApiResponse<ICategory[]>> {
    return this.httpClient.get<IApiResponse<ICategory[]>>(this.baseUrl + '/dropdown')
  }

  getCategory(id: number): Observable<IApiResponse<ICategory>> {
    return this.httpClient.get<IApiResponse<ICategory>>(`${this.baseUrl}/${id}`)
  }

  addCategory(category: ICategory): Observable<ICategory> {
    return this.httpClient.post<ICategory>(this.baseUrl, category, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateCategory(category: ICategory): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${category.id}`, category, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getRecords(params: any) {
    return super.getRecords(params, '', this.baseUrl);
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
