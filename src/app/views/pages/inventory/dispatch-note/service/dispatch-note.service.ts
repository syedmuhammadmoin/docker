import {Injectable, Injector} from '@angular/core';
import {IDispatchNote} from '../model/IDispatchNote';
import {Observable} from 'rxjs';
import {IWorkflow} from '../../../purchase/vendorBill/model/IWorkflow';
import {AppConst} from '../../../../shared/AppConst';
import {AppServiceBase} from '../../../../shared/app-service-base';
import {IPaginationResponse} from '../../../../shared/IPaginationResponse';


@Injectable({
  providedIn: 'root'
})

export class DispatchNoteService extends AppServiceBase<IDispatchNote> {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  getAllDispatchNotes(): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'GoodsDispatchNote')
  }

  getDispatchNoteMasterById(id: number): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'GoodsDispatchNote/' + id)
  }

  createDispatchNote(dispatchNoteModel: IDispatchNote): Observable<any> {
    return this.httpClient.post<IDispatchNote>(AppConst.remoteServiceBaseUrl + 'GoodsDispatchNote', dispatchNoteModel)
  }

  workflow(workflow: IWorkflow): Observable<any> {
    return this.httpClient.post(AppConst.remoteServiceBaseUrl + 'GoodsDispatchNote' + '/workflow', workflow);
  }

  updateGDN(gdnModel: IDispatchNote): Observable<any> {
    return this.httpClient.put(AppConst.remoteServiceBaseUrl + `GoodsDispatchNote/${gdnModel.id}`, gdnModel)
  }

  getRecords(params: any): Observable<IPaginationResponse<Array<IDispatchNote>>> {
    return super.getRecords(params, 'docDate', AppConst.remoteServiceBaseUrl + 'GoodsDispatchNote');
  }
}
