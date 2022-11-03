import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IAccount } from "../../../pages/profiling/category/model/IAccount";
import { Observable } from "rxjs";
import { CategoryService } from "../../../pages/profiling/category/service/category.service";

@Injectable()
export class AccountResolverService implements Resolve<IAccount[]>{
  accountList: IAccount[];

  constructor(private accountService: CategoryService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAccount[]> | Promise<IAccount[]> | IAccount[] {

    return //this.accountService.getAccounts();
  }
}
