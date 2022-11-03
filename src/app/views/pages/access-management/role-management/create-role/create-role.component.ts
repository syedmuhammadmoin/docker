import {Component, Inject, Injector, OnInit, Optional, ViewChild} from '@angular/core';
import {FormGroup, NgForm, Validators} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {AppConst} from 'src/app/views/shared/AppConst';
import {IRoleClaim} from '../../model/IRoleClaim';
import {IRoleModel} from '../../model/IRoleModel';
import {AccessManagementService} from '../../service/access-management.service';
import {UserAccessLevelComponent} from '../user-access-level/user-access-level.component';

@Component({
  selector: 'kt-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})

export class CreateRoleComponent extends AppComponentBase implements OnInit {

  @ViewChild(UserAccessLevelComponent) accessLevelComponent!: UserAccessLevelComponent;

  searchText: string
  currentIndex = 0
  appConsts = AppConst
  roleForm: FormGroup
  roleModel: IRoleModel
  roleClaims: IRoleClaim[] = []
  //locationIds: number[] = []
  //title name
  titleName: string = "Create Role ";

  //Hide Submit And Cancel button
  isEditButtonShow: boolean = false;

  //accessLevelModel: IOrganizationAccessLevel[]

  isLoading: boolean
  // validation messages
  validationMessages = {
    roleName: {
      required: 'Role name is required.',
    },
  };
  // keys for validation
  formErrors = {
    roleName: '',
  };
  selectAllPropertyName = 'Select All';

  constructor(
    private accessManagementService: AccessManagementService,
    @Optional() @Inject(MAT_DIALOG_DATA) readonly _id: any,
    public dialogRef: MatDialogRef<CreateRoleComponent>,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.roleForm = this.fb.group({
      roleName: ['', this.vs.TEXT()]
    });

    if (this._id) {
      this.isEditButtonShow = true;
      this.titleName = 'Role Details';
      this.isLoading = true;
      //disable all fields
      this.roleForm.disable();
      this.getRoleById(this._id);
    } else {
      this.getClaims();
      this.roleModel = {
        id: null,
        roleName: '',
        roleClaims: [],
        //locationIds: []
      }
    }
  }

  @ViewChild('formDirective') private formDirective: NgForm;
  selectAll = false;

  reset() {
    this.formDirective.resetForm();
    this.roleClaims.map((x) => {
      x.selected = false;
      return x;
    })
  }

  getRoleById(id: any) {
    this.accessManagementService.getRole(id).subscribe((arg) => {
      this.isLoading = false
      this.roleModel = arg.result;
      this.patchRole(this.roleModel);
    });
  }

  patchRole(roleModel: IRoleModel) {
    this.roleForm.patchValue({
      roleName: roleModel.roleName,
    })
    this.roleClaims = roleModel.roleClaims.map(x => {
      if (x.selected) {
        this.selectAll = true;
      }
      x.viewValue = this.appConsts.PermissionsDisplayName[x.value]
      return x;
    });
    this.roleModel.id = this._id;
    this.isRoleSelected();
  }

  onSubmit() {
    this.roleForm.markAllAsTouched();
    if (this.roleForm.invalid) {
      return
    }

    if (this.roleClaims.filter(x => x.selected === true).length < 2) {
      this.toastService.warning('Atleast 2 Permissions is required !', 'Role');
      this.currentIndex = 1;
      return
    }

    // if(!this.accessLevelComponent.checklistSelection.selected.length){
    //   this.toastService.warning('Atleast 1 Access Level is required', 'Form Error');
    //   this.currentIndex = 2;
    //   return
    // }

    this.isLoading = true;
    this.roleModel = {...this.roleForm.value, id: this._id};
    this.roleModel.roleClaims = this.roleClaims;

    //get access Level location ids
    // this.accessLevelComponent.checklistSelection.selected.map((node: any) => {
    //   if(node.level === 3){
    //      this.locationIds.push(node.id)
    //   }
    // })
    //this.roleModel.locationIds = this.locationIds

    if (this.roleModel.id) {
      this.accessManagementService.updateRole(this.roleModel).subscribe((res) => {
        this.isLoading = false;
        this.toastService.success('Updated Successfully', this.roleModel.roleName + '');
        this.onRoleDialogClose();
      }, (err) => {
        this.isLoading = false;
        // this.toastService.error('' + err?.error?.message, 'Error');
      })
    } else {
      this.accessManagementService.createRole(this.roleModel).subscribe((res) => {
        this.isLoading = false
        this.toastService.success('Created Successfully', 'New Role');
        this.onRoleDialogClose();
      }, (err) => {
        this.isLoading = false
        // this.toastService.error('' + err?.error?.message, 'Error');
      })
    }
  }

  onRoleDialogClose() {
    this.dialogRef.close();
  }

  toggleEdit() {
    this.isEditButtonShow = false;
    this.titleName = 'Edit Role'
    this.roleForm.enable()
  }

  getClaims() {
    this.accessManagementService.getClaims().subscribe((res) => {
      res.result.forEach(element => {
        this.roleClaims.push(
          {
            type: 'permission',
            value: element,
            selected: false,
            viewValue: this.appConsts.PermissionsDisplayName[element]
          })
      });
      // this.roleClaims = res.result;
    })
  }

  onPermissionChange(permission: IRoleClaim, $event: MatCheckboxChange) {
    this.roleClaims[this.roleClaims.indexOf(permission)].selected = $event.checked;
    this.isRoleSelected();
  }

  selectAllClaims($event: MatCheckboxChange) {
    this.roleClaims.map((x) => {
      x.selected = $event.checked;
    })
    this.isRoleSelected();
  }

  isRoleSelected() {
    if (this.roleClaims.some(x => x.selected === true)) {
      this.selectAll = true
      this.selectAllPropertyName = 'Unselect All'
    } else {
      this.selectAll = false;
      this.selectAllPropertyName = 'Select All'
    }
  }
}

