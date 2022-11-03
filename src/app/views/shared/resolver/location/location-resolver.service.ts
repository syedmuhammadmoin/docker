import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ILocation} from "../../../pages/profiling/location/model/ILocation";
import {Observable} from "rxjs";
import {LocationService} from "../../../pages/profiling/location/service/location.service";

@Injectable()
export class LocationResolverService implements Resolve<ILocation[]>{

  constructor(private locationService: LocationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILocation[]> | Promise<ILocation[]> | ILocation[] {
    return //this.locationService.getLocations();
  }
}
