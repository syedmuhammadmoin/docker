import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfitLossPrintService {

  profitLossData = new BehaviorSubject([])
  printprofitLossData = this.profitLossData.asObservable();

  constructor() { }

  setPrintData(data: any) {
    this.profitLossData.next(data);
  }
}
