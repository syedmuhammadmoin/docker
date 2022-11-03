import {Injectable, Injector} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {IPurchaseRequisition} from '../model/IPurchaseRequisition';
import {IWorkflow} from '../../vendorBill/model/IWorkflow';
import {Observable} from 'rxjs/internal/Observable';
import {AppConst} from 'src/app/views/shared/AppConst';
import {AppServiceBase} from '../../../../shared/app-service-base';
import {IApiResponse} from "../../../../shared/IApiResponse";

@Injectable({
  providedIn: 'root'
})

export class PurchaseRequisitionService extends AppServiceBase<IPurchaseRequisition> {

  constructor(injector: Injector) {
    super(injector);
  }

  getAllPurchaseOrders(): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'Requisition');
  }

  getRequisitionMasterById(id: number): Observable<IApiResponse<IPurchaseRequisition>> {
    return this.httpClient.get<IApiResponse<IPurchaseRequisition>>(AppConst.remoteServiceBaseUrl + 'Requisition/' + id);
  }

  // getPurchaseDetailById(id: number): Observable<any> {
  //   return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'purchaseOrder/d/' + id);
  // }

  createRequisitionOrder(purchaseRequisitionModel: IPurchaseRequisition): Observable<any> {
    return this.httpClient.post<IPurchaseRequisition>(AppConst.remoteServiceBaseUrl + 'Requisition', purchaseRequisitionModel, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  updateRequisitionOrder(poModel: IPurchaseRequisition): Observable<any> {
    return this.httpClient.put(AppConst.remoteServiceBaseUrl + `Requisition/${poModel.id}`, poModel)
  }

  workflow(workflow: IWorkflow): Observable<any> {
    return this.httpClient.post(AppConst.remoteServiceBaseUrl + 'Requisition/workflow', workflow);
  }

  getRecords(params: any) {
    return super.getRecords(params, 'poDate', AppConst.remoteServiceBaseUrl + 'Requisition');
  }
}
