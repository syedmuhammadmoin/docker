import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Observer,} from 'rxjs';
import {APP_ROUTES, AUTH} from 'src/app/views/shared/AppRoutes';
import {environment} from 'src/environments/environment';
import {IApiResponse} from "../../../shared/IApiResponse";
import {AppConst} from "../../../shared/AppConst";
import {AuthService} from "../../../../core/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  showOverlay = new BehaviorSubject(true);

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
  }

  signIn(email: string, password: string): Observable<any> {
    return this.httpClient.post(AppConst.remoteServiceBaseUrl + '/' + APP_ROUTES.AUTH + '/' + AUTH.LOGIN, {
      email,
      password
    });
  }

  signOut(): Observable<boolean> {
    const signOutObservable = new Observable((observer: Observer<boolean>) => {
      try {
        localStorage.clear();
        observer.next(true);
      } catch (err) {
        observer.error(err)
      }
    });
    return signOutObservable
  }

  setNewPassword(password, confirmPassword, token): Observable<IApiResponse<boolean>> {
    return this.httpClient.post<IApiResponse<boolean>>(AppConst.remoteServiceBaseUrl + 'auth/resetForgetPassword', {
      password,
      confirmPassword,
      token,
    })
  }

  singleSignOn(orgId) {
    this.auth.getApplicationToken(orgId).subscribe((res) => {
      if (res.isSuccess) {
        localStorage.setItem(environment.authTokenKey, res.result.token)
        this.showOverlay.next(false);
        this.router.navigate(['/dashboard'])
      }
    })
  }

  refreshToken(): Observable<IApiResponse<any>> {
    return this.httpClient.post<IApiResponse<any>>(AppConst.remoteServiceBaseUrl + 'auth/refreshToken', {})
  }
}
