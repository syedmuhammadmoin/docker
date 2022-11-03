import { WORKFLOW } from './../../../../shared/AppRoutes';
import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppConst } from 'src/app/views/shared/AppConst';
import { WorkflowService } from '../service/workflow.service';
import { Permissions } from 'src/app/views/shared/AppEnum';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { colIndex, colSimple } from 'src/app/views/shared/components/constants';

@Component({
  selector: 'kt-list-workflow',
  templateUrl: './list-workflow.component.html',
  styleUrls: ['./list-workflow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListWorkflowComponent extends AppComponentBase implements OnInit {
  columnDefs = [
    colIndex(),
    colSimple({
      headerName: 'Name', field: 'name'
    }),
    colSimple.call(this, {
      headerName: 'Doc Type', field: 'docType',
      valueFormatter: (params) => AppConst.Documents.find(x => x.id === params.value).value
    }),
    colSimple({
      headerName: 'Active', field: 'isActive',
      valueFormatter: (params) => (params.value ? 'Yes' : 'No')
    })
  ];

  constructor(
    private workflowService: WorkflowService,
    injector: Injector
  ) {

    super(injector)
  }
  ngOnInit() {
    this.raGridProperties = {
      columnDefs: this.columnDefs,
      service: this.paymentService,
      // pageName: this.pageName,
      rowDoubleClicked: this.onRowDoubleClicked.bind(this),
      componentParent: this

    }
    this.loadWorkflowList();
  }
  onRowDoubleClicked(event) {
    this.router.navigate(['/' + WORKFLOW.ID_BASED_ROUTE('edit', event.data.id)]);
  }

  loadWorkflowList() {
    this.workflowService.getWorkflows().subscribe(
      (res) => {
        this.raGridProperties.rowData = res.result;
        this.cdRef.detectChanges();
      },
      (err: any) => {
      })
  }
}
