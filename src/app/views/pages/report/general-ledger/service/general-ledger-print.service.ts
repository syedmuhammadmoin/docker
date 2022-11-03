import {BehaviorSubject} from 'rxjs';
import {IGeneralLedger} from '../model/IGeneralLedger';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GeneralLedgerPrintService {
  ledgerPrintData = new BehaviorSubject<any>([]);
  currentData = this.ledgerPrintData.asObservable();
  constructor() {}

  setLedgerDataForPrintComponent(data: any[]) {
    this.ledgerPrintData.next(data);
  }

}
