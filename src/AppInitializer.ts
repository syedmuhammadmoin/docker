import {AppConst} from './app/views/shared/AppConst';
import {HttpClient} from '@angular/common/http';
import {PlatformLocation} from '@angular/common';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "./environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AppInitializer {

  constructor(
    private _platformLocation: PlatformLocation,
    private httpClient: HttpClient
  ) {
  }

  init(): () => Promise<boolean> {
    return () => new Promise<boolean>((resolve, reject) => {
      AppConst.appBaseHref = this.getBaseHref();
      const appBaseUrl = this.getDocumentOrigin() + AppConst.appBaseHref;
      this.getApplicationConfig(appBaseUrl, async () => {
        await this.singleSignOn();
        resolve(true);
      })
    });
  }

  private getApplicationConfig(appRootUrl: string, callback: () => void) {
    return this.httpClient.get<any>(`${appRootUrl}assets/${environment.appConfig}`)
      .subscribe((res) => {
        AppConst.appBaseUrl = res.appBaseUrl;
        AppConst.remoteServiceBaseUrl = res.remoteServiceBaseUrl;
        AppConst.websiteBaseUrl = res.websiteBaseUrl;

        /*try {
          const id = localStorage.getItem('org')
          if (id) {
            this.getApplicationToken(AppConst.remoteServiceBaseUrl, id)
              .subscribe((result: any) => {
                localStorage.setItem('token', result.result.token);
              })
          }
        } catch (e) {
          console.error('AppInitialize-GetAuthentication-Token' + e.toString())
        }*/
        callback();

      })
  }

  private getBaseHref(): string {
    const baseUrl = this._platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
      return baseUrl;
    }

    return '/';
  }

  private getDocumentOrigin(): string {
    if (!document.location.origin) {
      const port = document.location.port ? ':' + document.location.port : '';
      return (
        document.location.protocol + '//' + document.location.hostname + port
      );
    }

    return document.location.origin;
  }

  private getApplicationToken(baseUrl: string, orgId): Observable<any> {
    return this.httpClient.post(baseUrl + 'Auth/openOrganization/' + orgId, {})
  }

  private async singleSignOn() {
    try {
      let params = (new URL(document.location.toString())).searchParams;
      const orgId = atob(params.get('o'))
      // const queryParam = document.location.href.split('o')[3].toString()
      // const orgId = atob(queryParam.substr(1, queryParam.length - 1))
      if (!isNaN(+orgId)) {
        const result = await this.getApplicationToken(AppConst.remoteServiceBaseUrl, orgId).toPromise();
        localStorage.setItem(environment.authTokenKey, result.result.token);
        // document.location.href = '/dashboard'
        /*this.getApplicationToken(AppConst.remoteServiceBaseUrl, orgId)
          .subscribe((result: any) => {
            localStorage.setItem('token', result.result.token);
            document.location.href = '/dashboard'
          });*/
      }
    } catch (e) {
      console.error('AppInitialize-GetAuthentication-Token' + e.toString())
    }
  }
}
