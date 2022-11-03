import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import { IBankAccount } from 'src/app/views/pages/finance/bank-account/model/IBankAccount';
import { BankAccountService } from 'src/app/views/pages/finance/bank-account/service/bankAccount.service';

@Injectable()

export class BankAccountResolverService implements Resolve<IBankAccount[]> {
  
  constructor(private bankAccountService: BankAccountService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBankAccount[]> | Promise<IBankAccount[]> | IBankAccount[] {
    return //this.bankAccountService.getBankAccounts();
  }
}
  
