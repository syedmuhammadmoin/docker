import {Injectable, Injector} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {IPurchaseOrder} from '../model/IPurchaseOrder';
import {IWorkflow} from '../../vendorBill/model/IWorkflow';
import {Observable} from 'rxjs/internal/Observable';
import {AppConst} from 'src/app/views/shared/AppConst';
import {AppServiceBase} from '../../../../shared/app-service-base';

@Injectable({
  providedIn: 'root'
})

export class PurchaseOrderService extends AppServiceBase<IPurchaseOrder> {

  constructor(injector: Injector) {
    super(injector);
  }

  getAllPurchaseOrders(): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'purchaseOrder');
  }

  getPurchaseMasterById(id: number): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'purchaseOrder/' + id);
  }

  // getPurchaseDetailById(id: number): Observable<any> {
  //   return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'purchaseOrder/d/' + id);
  // }

  createPurchaseOrder(purchaseOrderModel: IPurchaseOrder): Observable<any> {
    return this.httpClient.post<IPurchaseOrder>(AppConst.remoteServiceBaseUrl + 'purchaseOrder', purchaseOrderModel, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  updatePurchaseOrder(poModel: IPurchaseOrder): Observable<any> {
    return this.httpClient.put(AppConst.remoteServiceBaseUrl + `purchaseOrder/${poModel.id}`, poModel)
  }

  workflow(workflow: IWorkflow): Observable<any> {
    return this.httpClient.post(AppConst.remoteServiceBaseUrl + 'purchaseOrder/workflow', workflow);
  }

  getRecords(params: any) {
    return super.getRecords(params, 'poDate', AppConst.remoteServiceBaseUrl + 'purchaseOrder');
  }
}
