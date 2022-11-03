import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {IRoleModel} from "../model/IRoleModel";
import {IUserModel} from "../model/IUserModel";
import {IResetPassword} from '../model/IResetPassword';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {IOrganizationAccessLevel} from '../model/IOrganizationAccessLevel';
import {AppConst} from "../../../shared/AppConst";

@Injectable({
  providedIn: 'root'
})

export class AccessManagementService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getClaims(): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'auth/claims');
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'auth/users');
  }

  getRoles(): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'auth/roles')
  }

  getRole(id: any): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'auth/roles/' + id)
  }

  getUser(id: any): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'auth/users/' + id)
  }

  createUser(body: IUserModel): Observable<any> {
    return this.httpClient.post(AppConst.remoteServiceBaseUrl + 'auth/users', body);
  }

  createRole(body: IRoleModel): Observable<any> {
    return this.httpClient.post(AppConst.remoteServiceBaseUrl + 'auth/roles', body)
  }

  updateUser(body: IUserModel): Observable<any> {
    return this.httpClient.put(AppConst.remoteServiceBaseUrl + 'auth/users/' + body.id, body);
  }

  updateRole(body: IRoleModel): Observable<any> {
    return this.httpClient.put(AppConst.remoteServiceBaseUrl + 'auth/roles/' + body.id, body)
  }

  resetPassword(body: IResetPassword): Observable<any> {
    return //this.httpClient.put(AppConst.remoteServiceBaseUrl + `Auth/Users/ResetPass/${body.userId}`, body)
  }

  changePassword(body: IResetPassword): Observable<any> {
    return this.httpClient.put(AppConst.remoteServiceBaseUrl + `Auth/Users/changePassword/${body.loginUserId}`, body)
  }

  getUserScope(): Observable<IApiResponse<IOrganizationAccessLevel[]>> {
    return this.httpClient.get<IApiResponse<IOrganizationAccessLevel[]>>(AppConst.remoteServiceBaseUrl + 'UserScope')
  }

  getUserScopeById(): Observable<any> {
    return
  }

  inviteUser(email, roleId): Observable<IApiResponse<boolean>> {
    const url = AppConst.remoteServiceBaseUrl + 'auth/inviteUser'
    return this.httpClient.post<IApiResponse<boolean>>(url, {email, roleId})
  }
  resendInvite(email, roleId): Observable<IApiResponse<boolean>> {
    const url = AppConst.remoteServiceBaseUrl + 'auth/resendInvite'
    return this.httpClient.post<IApiResponse<boolean>>(url, {email, roleId})
  }
}

