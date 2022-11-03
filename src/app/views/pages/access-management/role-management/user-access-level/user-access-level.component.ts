import { Component, Input, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { IOrganizationAccessLevel } from '../../model/IOrganizationAccessLevel';
import { AccessManagementService } from '../../service/access-management.service';
import { IApiResponse } from 'src/app/views/shared/IApiResponse';


/**
 * Node for access level
 */
 export class AccessLevelNode {
  //children: AccessLevelNode[];
  departments?:  AccessLevelNode[];
  warehouses? : AccessLevelNode[];
  locations? : AccessLevelNode[];
  name: string;
  id:number;
  isSelected:boolean;
}

/** Flat access level node with expandable and level information */
export class AccessLevelFlatNode {
  name: string;
  level: number;
  expandable: boolean;
  id:number;
  isSelected:boolean;
}
 
  /**
  * @title Tree with checkboxes
  */
@Component({
  selector: 'kt-user-access-level',
  templateUrl: './user-access-level.component.html',
  styleUrls: ['./user-access-level.component.scss']
})

export class UserAccessLevelComponent implements OnChanges {

  @Input() roleId: number;
  @Input() userScopeData : IOrganizationAccessLevel[];

  dataChange = new BehaviorSubject<AccessLevelNode[]>([]);

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<AccessLevelFlatNode, AccessLevelNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<AccessLevelNode, AccessLevelFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: AccessLevelFlatNode | null = null;

  treeControl: FlatTreeControl<AccessLevelFlatNode>;

  treeFlattener: MatTreeFlattener<AccessLevelNode, AccessLevelFlatNode>;

  dataSource: MatTreeFlatDataSource<AccessLevelNode, AccessLevelFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<AccessLevelFlatNode>(true /* multiple */);

  constructor(private accessManagementService: AccessManagementService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );
    this.treeControl = new FlatTreeControl<AccessLevelFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.dataChange.subscribe((data: AccessLevelNode[]) => {
      this.dataSource.data = data;
      this.checkAll()
    });
  }

  checkAll(){
    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
    if(this.treeControl.dataNodes[i].isSelected) {
        this.checklistSelection.toggle(this.treeControl.dataNodes[i]);
        this.checkAllParentsSelection(this.treeControl.dataNodes[i])
      //this.treeControl.expand(this.treeControl.dataNodes[i])
    }
   }
  }
  
  ngOnChanges(): void {
    this.initialize()
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `AccessLevelNode` with nested file node as children.
    let data: any[] = []
    if(this.roleId && this.userScopeData) {
      
      data = this.userScopeData

       // Notify the change.
      this.dataChange.next(data);
    }
    else if (!this.roleId) {
      this.accessManagementService.getUserScope().subscribe((res: IApiResponse<IOrganizationAccessLevel[]>) => {

        data = res.result;
        
         // Notify the change.
        this.dataChange.next(data);
       })
    }
  }

  getLevel = (node: AccessLevelFlatNode) => node.level;

  isExpandable = (node: AccessLevelFlatNode) => node.expandable;

  getChildren = (node: AccessLevelNode): AccessLevelNode[] => node.departments || node.warehouses || node.locations;

  hasChild = (_: number, _nodeData: AccessLevelFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: AccessLevelFlatNode) => _nodeData.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: AccessLevelNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
        ? existingNode
        : new AccessLevelFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.id=node.id;
     flatNode.isSelected = node.isSelected;
    // flatNode.expandable = !!node.children;
    flatNode.expandable = !!(node.departments || node.warehouses || node.locations);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: AccessLevelFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: AccessLevelFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: any): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: any): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: AccessLevelFlatNode): void {
    let parent: AccessLevelFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: AccessLevelFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: AccessLevelFlatNode): AccessLevelFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}
















