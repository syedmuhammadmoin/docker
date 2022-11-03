import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {PermissionService} from 'src/app/views/pages/auth/service/permission.service';

@Injectable({providedIn: 'root'})
export class PermissionGuard implements CanActivate {
  constructor(
    private _permissionChecker: PermissionService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.data && route.data.array.filter(item => this._permissionChecker.isGranted(item.permission)).length > 0) {
      return true;
    }

    if (!route.data || !route.data['array']) {
      return true;
    }
    this.router.navigate(['/error/unauthorized'])
    return false;
  }
}
