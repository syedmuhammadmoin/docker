import { Injectable } from '@angular/core';
import {BusinessPartnerService} from "../../../pages/profiling/business-partner/service/businessPartner.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IBusinessPartner} from "../../../pages/profiling/business-partner/model/IBusinessPartner";
import {Observable} from "rxjs";

@Injectable()
export class BusinessPartnerResolverService implements Resolve<IBusinessPartner[]>{

  constructor(private businessPartnerService: BusinessPartnerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBusinessPartner[]> | Promise<IBusinessPartner[]> | IBusinessPartner[] {
    return //this.businessPartnerService.getBusinessPartners();
  }
}
