import {Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {IDepartment } from 'src/app/views/pages/profiling/department/model/IDepartment';
import {DepartmentService } from 'src/app/views/pages/profiling/department/service/department.service';

@Injectable()
export class DepartmentResolverService implements Resolve<IDepartment[]> {

  constructor(private departmentService : DepartmentService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDepartment[]> | Promise<IDepartment[]> | IDepartment[] {
    return //this.departmentService.getDepartments();
  }
}



  


