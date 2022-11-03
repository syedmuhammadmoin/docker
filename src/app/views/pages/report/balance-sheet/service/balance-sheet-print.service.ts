import {BehaviorSubject} from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BalanceSheetPrintService {
  balanceSheetPrintData = new BehaviorSubject<any>([]);
  currentData = this.balanceSheetPrintData.asObservable();
  constructor() {}

  setBalanceSheetDataForPrintComponent(data: any[]) {
    this.balanceSheetPrintData.next(data);
  }

}
