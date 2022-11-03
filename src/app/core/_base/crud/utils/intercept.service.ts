// Angular
import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// RxJS
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {AuthenticationService} from 'src/app/views/pages/auth/service/authentication.service';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /*handleSuccessResponse(event) {

  }*/

  constructor(
    private _injector: Injector,
    private authenticationService: AuthenticationService,
    private toastService: ToastrService,
    private route: Router,
  ) {
  }

  // intercept request and add token
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.modifiedRequest(request))
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && !request.url.includes('auth/login') && error.status === 401) {
            return this.handle401Error(request, next)
            // return this.tryAuthWithRefreshToken(request, next, error);
          } else if (error instanceof HttpErrorResponse && request.url.includes('auth/refreshToken') && error.status === 400) {
            // TODO: This should be handled using response.isAuthenticated after global exception handling from backend.
            this.toastService.info('Please login again to continue', 'Session Expired')
            localStorage.clear();
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          } else {
            return this.handleErrorResponse(error);
          }
        }),
        // switchMap(event => {
        //   return this.handleSuccessResponse(event);
        // })
      );
  }

  handleErrorResponse(error) {
    let message: string
    let title: string;
    switch (error.status) {
      case 400:
        message = error?.error?.message ?? 'Please verify form fields are correct, if issue persists please contact System Administrator'
        title = 'Bad Request'
        break;
      /*case 401:
        message = error?.error?.message ?? 'Unauhtorised access, Please login again.'
        title = 'Unauthorised'
        this.route.navigateByUrl('/login')
        break;*/
      case 403:
        message = error?.error?.message ?? 'You don\'\t have permission to access this resource'
        title = 'Forbidden'
        // this.route.navigateByUrl('/error/unauthorized')
        break;
      case 404:
        message = error?.error?.message ?? 'Requested resource not found.'
        title = 'Resource Not Found'
        // window.location.href = '/error/404'
        // this.route.navigateByUrl('/error/404')
        break;
      case 408:
        message = error?.error?.message ?? 'Requested resource timed out.'
        title = 'Request Timeout'
        break;
      case 500:
        message = error?.error?.message ?? 'Something went wrong, Please try again later.'
        title = 'Internal Server Error'
        // this.route.navigateByUrl('/error/500')
        break;
      default:
        message = error?.error?.message ?? 'Please try again later, If issue persists please contact System Administrator';
        title = 'General Processing Error'
        break;
    }
    this.toastService.error(message, title);
    return throwError(error)
  }

  /*tryAuthWithRefreshToken(request, next, error) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.tryGetRefreshTokenService().pipe(
        switchMap((authResult: boolean) => {
          this.isRefreshing = false;
          if (authResult) {
            this.refreshTokenSubject.next(authResult);
            let modifiedRequest = this.normalizeRequestHeaders(request);
            return next.handle(modifiedRequest);
          } else {
            return this.handleErrorResponse(error);
          }
        }));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(authResult => authResult != null),
        take(1),
        switchMap(authResult => {
          let modifiedRequest = this.normalizeRequestHeaders(request);
          return next.handle(modifiedRequest);
        }));
    }
  }*/

  /*protected tryGetRefreshTokenService(): Observable<boolean> {
    let _refreshTokenService = this._injector.get(RefreshTokenService, null);

    if (_refreshTokenService) {
      return _refreshTokenService.tryAuthWithRefreshToken();
    }
    return of(false);
  }*/

  /*return next.handle(request).pipe(
  tap(
    event => {
      if (event instanceof HttpResponse) {
        // http response status code
      }
    },
    error => {
      let message: string
      let title: string;
      switch (error.status) {
        case 400:
          message = error?.error?.message ?? 'Please verify form fields are correct, if issue persists please contact System Administrator'
          title = 'Bad Request'
          break;
        case 401:
          message = error?.error?.message ?? 'Unauhtorised access, Please login again.'
          title = 'Unauthorised'
          this.route.navigateByUrl('/login')
          break;
        case 403:
          message = error?.error?.message ?? 'You don\'\t have permission to access this resource'
          title = 'Forbidden'
          // this.route.navigateByUrl('/error/unauthorized')
          break;
        case 404:
          message = error?.error?.message ?? 'Requested resource not found.'
          title = 'Resource Not Found'
          // window.location.href = '/error/404'
          // this.route.navigateByUrl('/error/404')
          break;
        case 408:
          message = error?.error?.message ?? 'Requested resource timed out.'
          title = 'Request Timeout'
          break;
        case 500:
          message = error?.error?.message ?? 'Something went wrong, Please try again later.'
          title = 'Internal Server Error'
          // this.route.navigateByUrl('/error/500')
          break;
        default:
          message = error?.error?.message ?? 'Please try again later, If issue presists please contact System Administrator';
          title = 'General Processing Error'
          break;
      }
      this.toastService.error(message, title);
    }
  )
);*/

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authenticationService.refreshToken()
        .pipe(
          switchMap((res) => {
            this.isRefreshing = false;
            if (res.isSuccess) {
              localStorage.setItem(environment.authTokenKey, res.result.token);
              this.refreshTokenSubject.next(res.result.token);
              return next.handle(this.modifiedRequest(request));
            }
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.authenticationService.signOut().subscribe()
            this.handleErrorResponse(err);
            return throwError(err)
          })
        )
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.modifiedRequest(request)))
    );
  }

  private modifiedRequest(request: HttpRequest<any>) {
    return request.clone({
      withCredentials: true,
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem(environment.authTokenKey)}`,
        'Content-Type': 'application/json'
      }
    });
  }
}
