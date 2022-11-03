// Angular
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
// RxJS
import {AuthSingletonService} from 'src/app/views/pages/auth/service/auth-singleton.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // private store: Store<AppState>,
    private authSingleton: AuthSingletonService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authSingleton.isLoggedIn();
    /*if (state.root.queryParamMap.get('o')) {
      localStorage.clear();
      localStorage.setItem('org', atob(state.root.queryParamMap.get('o')));
    }*/


    if (!isLoggedIn && state.url.includes('/auth/login')) {
      return true;
    }

    if (!isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return false
    }

    if (state.url === '/auth/login' && isLoggedIn) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    // this.router.navigate([this.selectBestRoute()])
    return true
    // this.store
    //   .pipe(
    //     select(isLoggedIn),
    //     tap(loggedIn => {
    //       if (!loggedIn) {
    //         this.router.navigateByUrl('/auth/login');
    //       }
    //     })
    //   );
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  selectBestRoute(): string {
    if (!this.authSingleton.getCurrentUser()) {
      return '/auth/login';
    }
    return '/dashboard';
  }
}
