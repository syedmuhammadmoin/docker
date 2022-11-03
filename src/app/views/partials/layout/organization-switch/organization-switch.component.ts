import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {AuthSingletonService} from "../../../pages/auth/service/auth-singleton.service";
import {OrganizationSwitchService} from "./service/organization-switch.service";
import {finalize} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {CreateOrganizationComponent} from "../../../pages/profiling/organization/create-organization/create-organization.component";

@Component({
  selector: 'kt-organization-switch',
  templateUrl: './organization-switch.component.html',
  styleUrls: ['./organization-switch.component.scss']
})
export class OrganizationSwitchComponent implements OnInit {

  isLoading = true;
  currentOrganization: any;
  userOrganisations: any;

  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private authSingleton: AuthSingletonService,
    private switchOrganizationService: OrganizationSwitchService
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUserOrganizations();

  }

  switchOrganisation(organizationId: any) {
    this.switchOrganizationService.switchOrganizationByOrganizationId(organizationId).subscribe((res: any) => {
      localStorage.clear();
      localStorage.setItem(environment.authTokenKey, res.result.token)
      window.location.reload();
    })
  }

  on_click() {
    const elem = document.getElementById('atag');
    elem.classList.toggle('down');
    // elem.classList.toggle('fa-rotate-270');
  }

  getCurrentOrganization() {
    this.currentOrganization = this.userOrganisations.find(x => x.organizationId === this.authSingleton.getCurrentUser().organization);
  }

  getCurrentUserOrganizations() {
    this.switchOrganizationService.organizationsByUserToken()
      .pipe(finalize(() => {
        this.isLoading = false
        this.cdr.detectChanges();
      }))
      .subscribe((res: any) => {
        this.userOrganisations = res.result;
        this.getCurrentOrganization();
        this.cdr.detectChanges();
      })
  }

  editOrganization() {
    this.openDialog(this.authSingleton.getCurrentUser().organization)
  }

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(CreateOrganizationComponent, {
      width: '800px',
      data: id
    });
    // Recalling getOrganization function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      // window.location.reload()
    });
  }
}
