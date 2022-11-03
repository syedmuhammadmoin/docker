import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrialBalancePrintService {
  trialBalanceData = new BehaviorSubject([])
  printTrialBalanceData = this.trialBalanceData.asObservable();

  constructor() {}

  setPrintData(data: any) {
    this.trialBalanceData.next(data);
  }
}
