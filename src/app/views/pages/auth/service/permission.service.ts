import { Injectable } from "@angular/core";
import { AuthSingletonService } from "./auth-singleton.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(
    private singletonService: AuthSingletonService
  ) {
  }

  isGranted(...permissionName: any): boolean {
    if(permissionName[0] == undefined) return true;

    const permissions = this.singletonService.getCurrentUserPermission();
    let isGranted = false;
    if (permissions && permissionName?.length === 1) {
      isGranted = permissions.some(x => (
        x === permissionName[0] ||
        x === permissionName[1] ||
        x === permissionName[2] ||
        x === permissionName[3]
      ))
    }
    return isGranted
  }
}
