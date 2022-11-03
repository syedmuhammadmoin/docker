import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from "../../../../shared/app-component-base";
import { DocType, DocumentStatus, Permissions } from "../../../../shared/AppEnum";
import { animate, animateChild, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'kt-detail-bank-statement',
  templateUrl: './detail-bank-statement.component.html',
  styleUrls: ['./detail-bank-statement.component.scss'],
  animations: [
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ]),
    trigger('easeInOut', [
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate("500ms ease-in", style({
          opacity: 1
        }))
      ]),
      transition('* => void', [
        style({
          opacity: 1
        }),
        animate("500ms ease-in", style({
          opacity: 0
        }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailBankStatementComponent extends AppComponentBase implements OnInit {
  docType = DocType
  bankStatement: any
  isLoading = true;
  docStatus = DocumentStatus;
  visible: boolean = true

  ngOnInit(): void {
  }

  activeClass: boolean = false
  status: boolean = true;

  constructor(
    injector: Injector,
  ) {
    super(injector)
    this.activatedRoute.params.subscribe((param) => {
      const stmtId = param?.id;
      this.getBankStatement(stmtId);
    })
  }

  onclick() {
    this.status = !this.status;
    this.activeClass = !this.activeClass;
    this.visible = !this.visible
  }

  unreconcile(line: any, payment: any) {
    this.isLoading = true;
    this.bankReconService.unReconcileStatement(line.id, payment.id)
      .subscribe((res) => {
        this.getBankStatement(this.bankStatement.id, line.id)
        this.toastService.success('Unreconciled Successfully', 'Statement')
      }, () => {
        this.isLoading = false
        this.cdRef.markForCheck();
      })
  }

  editBankStatement(id: any) {
    this.router.navigate(['/bank-statement/edit/' + this.bankStatement.id])
  }

  private getBankStatement(stmtId: any, lineId?: any) {
    this.bankStatementService.getBankStatement(stmtId).subscribe((res) => {
      this.bankStatement = res.result
      this.bankStatement.bankStmtLines.map((x) => {
        if (lineId) {
          x['isOpen'] = true;
        } else {
          x['isOpen'] = false;
        }
        return x
      });
      this.isLoading = false;
      this.cdRef.markForCheck();
    }, () => {
      this.isLoading = false
      this.cdRef.markForCheck();
    })
  }
}
