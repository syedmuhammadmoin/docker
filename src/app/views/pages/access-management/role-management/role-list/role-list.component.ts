import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { colIndex, colSimple } from 'src/app/views/shared/components/constants';
import { IRaGridProperties } from 'src/app/views/shared/components/interfaces/ra-grid-properties.interface';
import { AccessManagementService } from '../../service/access-management.service';
import { CreateRoleComponent } from '../create-role/create-role.component';

@Component({
  selector: 'kt-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})

export class RoleListComponent extends AppComponentBase implements OnInit {
  constructor(
    private accessManagementService: AccessManagementService,
    injector: Injector
  ) {
    super(injector)
  }
  raGridProperties: Partial<IRaGridProperties> = {
    columnDefs: [
      colIndex(),
      colSimple({
        headerName: 'Role Name',
        field: 'name',
      })
    ]
  }
  ngOnInit() {
    this.getRoles();
    this.raGridProperties.rowDoubleClicked = this.onRowDoubleClicked.bind(this)
  }
  onRowDoubleClicked(event?) {
    const dialogRef = this.dialog.open(CreateRoleComponent, {
      width: '840px',
      data: event?.data?.id ?? null
    });
    // Recalling getInvoiceMasterData function on dialog close
    dialogRef.afterClosed().subscribe(() => {
      this.getRoles();
    });
  }
  getRoles() {
    this.accessManagementService.getRoles().subscribe((res: any) => {
      this.raGridProperties.rowData = res.result
      this.cdRef.detectChanges()
    });
  }
}



