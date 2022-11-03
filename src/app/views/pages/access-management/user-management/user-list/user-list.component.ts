import { Component, OnInit, Injector } from '@angular/core';
import { colAction, colIndex, colSimple } from 'src/app/views/shared/components/constants';
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { ServiceInjectorAngular } from 'src/app/views/shared/service-injector-angular';
import { AccessManagementService } from '../../service/access-management.service';
import { InviteUserComponent } from '../invite-user/invite-user.component';

@Component({
  selector: 'kt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent extends ServiceInjectorAngular implements OnInit {
  constructor(private accessManagementService: AccessManagementService,
    injector: Injector
  ) {
    super(injector)
  }
  raGridProperties: Partial<IRaGridProperties>;
  ngOnInit() {
    this.raGridProperties =  {
      columnDefs: [
        colIndex(),
        colSimple({
          headerName: 'Email',
          field: 'email'
        }),
        colSimple({
          headerName: 'Status',
          field: 'status',
        }),
        colAction({
          cellRendererParams: {
            onClick: this.onAction.bind(this),
            label: 'Re-send Invitation',
          }
        })
      ],
    }
    this.getUsers();
  }
  createUserDialog(id?: any): void {
    const dialogRef = this.dialog.open(InviteUserComponent, {
      width: '800px',
      // height: '750px',
      data: id,
    });
    // Recalling getInvoiceMasterData function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }
  onAction(data){
    this.createUserDialog(data)
  }
  getUsers() {
    this.accessManagementService.getUsers().subscribe((res: any) => {
      this.raGridProperties.rowData = res.result
      this.cdRef.detectChanges();
    });
  }
}



