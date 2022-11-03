import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IWorkflow } from '../model/IWorkflow';
import { Observable } from 'rxjs/internal/Observable';
import {AppConst} from "../../../../shared/AppConst";

@Injectable({
  providedIn: 'root'
})

export class WorkflowService {

  constructor( private httpClient: HttpClient) { }

  getWorkflows(): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'workflow')
  }

  createWorkflow(body: IWorkflow): Observable<any> {
    return this.httpClient.post(AppConst.remoteServiceBaseUrl + 'workflow', body)
  }

  updateWorkflow(body: IWorkflow): Observable<any> {
    return this.httpClient.put(AppConst.remoteServiceBaseUrl + 'workflow/' + body.id, body);
  }

  getWorkflow(id: any): Observable<any> {
    return this.httpClient.get(AppConst.remoteServiceBaseUrl + 'workflow/' + id);
  }
}
