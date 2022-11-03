import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { AppConst } from '../../../../shared/AppConst';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { IUserModel } from '../../model/IUserModel';
import { IUserRole } from '../../model/IUserRole';
import { AppComponentBase } from '../../../../shared/app-component-base';
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AccessManagementService } from "../../service/access-management.service";

@Component({
  selector: 'kt-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent extends AppComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private accessManagementService: AccessManagementService,
    public dialogRef: MatDialogRef<InviteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {email?: string}
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this.inviteUserForm = this.fb.group({
      email: [this.data?.email, [Validators.required, Validators.email]]
    })
    this.getRoles();
  }
  searchText: string;
  currentIndex = 0
  appConsts = AppConst
  inviteUserForm: FormGroup
  userModel: IUserModel
  userRole: IUserRole[] = []
  isSelected = false;
  isLoading: boolean


  validationMessages = {
    email: {
      required: 'Email is Required!',
      email: 'Please enter valid Email!'
    },
  }

  formErrors = {
    email: '',
  };

  @ViewChild('formDirective') private formDirective: NgForm;

  reset() {
    this.formDirective.resetForm();
  }
  onRoleChange(role: IUserRole, $event: MatCheckboxChange) {
    this.isSelected = true
    this.userRole[this.userRole.indexOf(role)].selected = $event.checked
  }

  onCloseUserDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.inviteUserForm.markAllAsTouched();
    if (!this.userRole.some((x) => x.selected === true)) {
      this.toastService.warning('Atleast 1 Role is required', 'Form Error');
      this.currentIndex = 1;
      return
    }

    if (this.inviteUserForm.invalid) {
      return
    }
    this.isLoading = true;
    this.userModel = { ...this.inviteUserForm.value }
    const roleId = this.userRole.find(x => x.selected === true).roleId
    if(!this.data?.email){
      this.accessManagementService.inviteUser(this.userModel.email, roleId)
      .subscribe((res) => {
        this.isLoading = false
        this.toastService.success('Invited Successfully', 'New User');
        this.onCloseUserDialog();
      }, (err) => {
        this.isLoading = false;
        // this.toastService.error('' + err?.error?.message, 'Error');
      })
    } else {
      this.accessManagementService.resendInvite(this.data.email, roleId).subscribe({
        complete: () => this.isLoading = false,
        next: () => {
          this.toastService.success('Invitation mail sent Successfully', 'Email Sent')
          this.onCloseUserDialog();
        },
        error: () => {
          this.toastService.error('Problem with service please try later', 'Invitation Error')
        }
      })
    }

  }

  getRoles() {
    this.accessManagementService.getRoles().subscribe((res) => {
      res.result.forEach(element => {
        this.userRole.push({ roleId: element.id, roleName: element.normalizedName, selected: false })
      });
    })
  }

}
