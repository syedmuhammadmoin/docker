import { Injector, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

export abstract class ServiceInjectorAngular {
  datePipe: DatePipe
  toastService: ToastrService
  activatedRoute: ActivatedRoute
  router: Router
  cdRef: ChangeDetectorRef
  fb: FormBuilder
  dialog: MatDialog
  http: HttpClient
  translate: TranslateService

  protected constructor(injector: Injector) {
    this.datePipe = injector.get(DatePipe);
    this.toastService = injector.get(ToastrService);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.cdRef = injector.get(ChangeDetectorRef);
    this.fb = injector.get(FormBuilder)
    this.dialog = injector.get(MatDialog)
    this.http = injector.get(HttpClient)
    this.translate = injector.get(TranslateService)
  }
}
