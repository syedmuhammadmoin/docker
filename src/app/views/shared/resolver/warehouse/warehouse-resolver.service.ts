import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from 'rxjs';
import {WarehouseService} from '../../../pages/profiling/warehouse/services/warehouse.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseResolverService implements Resolve<any[]>{

  constructor(private warehouseService: WarehouseService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> | Promise<any[]> | any[] {
    return //this.warehouseService.getWarehouses();
  }
}
