import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {AppConst} from "../../../../shared/AppConst";

@Injectable({
  providedIn: 'root'
})
export class OrganizationSwitchService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  switchOrganizationByOrganizationId(organizationId): Observable<any> {
    return this.httpClient.post(AppConst.remoteServiceBaseUrl + 'Auth/ChangeOrganization', organizationId)
  }

  organizationsByUserToken(): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'Organization/UsersOrganization/')
  }
}
