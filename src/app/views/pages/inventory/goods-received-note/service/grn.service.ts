import {Injectable, Injector} from '@angular/core';
import {IGRN} from '../model/IGRN';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {IWorkflow} from '../../../purchase/vendorBill/model/IWorkflow';
import {AppConst} from "../../../../shared/AppConst";
import {AppServiceBase} from "../../../../shared/app-service-base";


@Injectable({
  providedIn: 'root'
})

export class GrnService extends AppServiceBase<IGRN> {

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  getAllGRNs(): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'GoodsReceivingNote')
  }

  getGRNMasterById(id: number): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'GoodsReceivingNote/' + id)
  }

  createGRN(grnModel: IGRN): Observable<any> {
    return this.httpClient.post<IGRN>(AppConst.remoteServiceBaseUrl + 'GoodsReceivingNote', grnModel, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  workflow(workflow: IWorkflow): Observable<any> {
    return this.httpClient.post(AppConst.remoteServiceBaseUrl + 'GoodsReceivingNote' + '/workflow', workflow);
  }

  updateGRN(grnModel: IGRN): Observable<any> {
    return this.httpClient.put(AppConst.remoteServiceBaseUrl + `GoodsReceivingNote/${grnModel.id}`, grnModel)
  }

  getRecords(params) {
    return super.getRecords(params, 'grnDate', AppConst.remoteServiceBaseUrl + 'GoodsReceivingNote');
  }
}












