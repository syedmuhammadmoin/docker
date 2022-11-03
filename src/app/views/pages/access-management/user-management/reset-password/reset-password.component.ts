import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { AppComponentBase } from 'src/app/views/shared/app-component-base';
import { FormGroup, Validators } from "@angular/forms";
import { PasswordGenerator } from 'src/app/views/shared/helpers/password-generator';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AccessManagementService } from '../../service/access-management.service';
import { IResetPassword } from "../../model/IResetPassword";

@Component({
  selector: 'kt-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent extends AppComponentBase implements OnInit {

  isLoading: any;
  resetPassForm: FormGroup;

  validationMessages = {
    adminPassword: {
      required: 'Administrator Password is Required'
    },
  };

  formErrors = {
    adminPassword: ''
  };

  constructor(
    injector: Injector,
    private accessManagementService: AccessManagementService,
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public _id: any,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.resetPassForm = this.fb.group({
      adminPassword: ['', Validators.required],
      password: PasswordGenerator.generatePassword(),
    })
  }

  onCloseResetPassDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.resetPassForm.markAllAsTouched();
    if (!this._id) {
      this.onCloseResetPassDialog();
      return
    }
    if (this.resetPassForm.invalid) {
      return;
    }
    this.isLoading = true;
    const body = { ...this.resetPassForm.value } as IResetPassword;
    body.confirmPassword = body.password
    body.userId = this._id
    this.accessManagementService.resetPassword(body).subscribe((res) => {
      this.toastService.success('' + res.message, 'Password')
      this.isLoading = false;
      this.onCloseResetPassDialog();
    }, (err) => {
      this.toastService.error('' + err?.error?.message, 'Reset Error!')
      this.isLoading = false;
      this.cdRef.detectChanges();
    })
  }

  reset() {
    this.formErrors = {
      adminPassword: ''
    };
    this.resetPassForm.get('adminPassword').reset()
    this.logValidationErrors(this.resetPassForm, this.formErrors, this.validationMessages)
  }
}
