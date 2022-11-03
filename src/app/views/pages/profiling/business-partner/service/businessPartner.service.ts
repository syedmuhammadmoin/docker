import {IBusinessPartner} from '../model/IBusinessPartner';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../../../../environments/environment';
import {Injectable, Injector} from '@angular/core';
import {IPaginationResponse} from 'src/app/views/shared/IPaginationResponse';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {AppConst} from 'src/app/views/shared/AppConst';
import {AppServiceBase} from "../../../../shared/app-service-base";


@Injectable({
  providedIn: 'root',
})

export class BusinessPartnerService extends AppServiceBase<IBusinessPartner> {

  baseUrl = AppConst.remoteServiceBaseUrl + 'BusinessPartner';

  constructor(injector: Injector) {
    super(injector);
  }

  getBusinessPartners(): Observable<IPaginationResponse<IBusinessPartner[]>> {
    return this.httpClient.get<IPaginationResponse<IBusinessPartner[]>>(this.baseUrl)
  }

  getBusinessPartnersDropdown(): Observable<IApiResponse<IBusinessPartner[]>> {
    return this.httpClient.get<IApiResponse<IBusinessPartner[]>>(this.baseUrl + '/dropdown')
  }

  getBusinessPartner(id: number): Observable<IApiResponse<IBusinessPartner>> {
    return this.httpClient.get<IApiResponse<IBusinessPartner>>(`${this.baseUrl}/${id}`)
  }

  addBusinessPartner(businessPartner: IBusinessPartner): Observable<IBusinessPartner> {
    return this.httpClient.post<IBusinessPartner>(`${this.baseUrl}`, businessPartner, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateBusinessPartner(businessPartner: IBusinessPartner): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${businessPartner.id}`, businessPartner, {
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
