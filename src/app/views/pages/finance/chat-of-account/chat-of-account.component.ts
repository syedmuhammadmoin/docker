import {Component, Injector, OnInit} from '@angular/core';
import {CreateLevel3Component} from './level3/create-level3/create-level3.component';
import {CreateLevel4Component} from './level4/create-level4/create-level4.component';
import {ChartOfAccountService} from './service/chart-of-account.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {AccountType} from "../../../shared/AppEnum";
import {AppComponentBase} from "../../../shared/app-component-base";

/**
 * Each node has a name and an optional list of children.
 */
interface AccountsNode {
  id: number,
  name: string;
  children?: AccountsNode[];
  accountType: AccountType | undefined
}

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  id: number,
  name: string;
  level: number;
  accountType: AccountType | undefined
}


@Component({
  selector: 'kt-chat-of-account',
  templateUrl: './chat-of-account.component.html',
  styleUrls: ['./chat-of-account.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatOfAccountComponent extends AppComponentBase implements OnInit {
  nestedNodeMap = new Map<AccountsNode, FlatNode>();
  accountType = AccountType
  // @ts-ignore


  _transformer = (node: AccountsNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id,
      accountType: node.accountType,
      level,
    };
  }
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    injector: Injector,
    private chartOfAccService: ChartOfAccountService,
  ) {
    super(injector)
  }

  ngOnInit()
    :
    void {
    this.chartOfAccService.getChartOfAccount().subscribe((data) => {
      this.dataSource.data = data.result;
      this.cdRef.detectChanges();
    });
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  addNewItem(node
    :
    FlatNode
  ) {
    if (node.level == 1) {
      const dialogRef = this.dialog.open(CreateLevel3Component, {
        width: '800px',
        data: { parentId: node.id }
      });
      // Recalling getBankAccounts function on dialog close
      dialogRef.afterClosed().subscribe(() => {
        this.chartOfAccService.getChartOfAccount().subscribe((res) => {
          this.dataSource.data = res.result;
          this.expandParents(node)
          this.cdRef.detectChanges();
        })
      });
    }
    if (node.level == 2) {
      const dialogRef = this.dialog.open(CreateLevel4Component, {
        width: '800px',
        data: { parentId: node.id }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.chartOfAccService.getChartOfAccount().subscribe((res) => {
          this.dataSource.data = res.result;
          this.expandParents(node)
          this.cdRef.detectChanges();
        })
      });
    }
    // const parentNode = this.flatNodeMap.get(node);
    // this._database.insertItem(parentNode!, '');
    // this.treeControl.expand(node);
  }

  editItem(node
    :
    any
  ) {
    if (node.level === 2 && node.id) {
      const dialogRef = this.dialog.open(CreateLevel3Component, {
        width: '800px',
        data: { modelId: node.id }
      });
      // Recalling getBankAccounts function on dialog close
      dialogRef.afterClosed().subscribe(() => {
        this.chartOfAccService.getChartOfAccount().subscribe((res) => {
          this.dataSource.data = res.result;
          this.expandParents(node)
          this.cdRef.detectChanges();
        })
      });
    }
    if (node.level === 3 && node.id) {
      const dialogRef = this.dialog.open(CreateLevel4Component, {
        width: '800px',
        data: { modelId: node.id }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.chartOfAccService.getChartOfAccount().subscribe((res) => {
          this.dataSource.data = res.result;
          this.expandParents(node)
          this.cdRef.detectChanges();
        })
      });
    }
  }

  expandNode(nodeToOpen
    :
    FlatNode
  ) {
    this.nestedNodeMap.forEach((node) => {
      if (node.id === nodeToOpen.id) {
        this.treeControl.expand(node);
      }
      if (node.id === nodeToOpen.id) {
        this.treeControl.expand(node);
      }
    });
  }

  expandParents(node
    :
    FlatNode
  ) {
    const parent = this.getParent(node);
    this.treeControl.expand(parent);

    if (parent && parent.level > 0) {
      this.expandParents(parent);
    }
  }

  getParent(node
    :
    FlatNode
  ) {
    // const { treeControl } = this;
    const currentLevel = this.treeControl.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    // const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    const startIndex = this.treeControl.dataNodes.indexOf(this.treeControl.dataNodes.find(x => x.id === node.id)) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.treeControl.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
  }
}
