import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { AppComponentBase } from "../../../shared/app-component-base";
import { ConfirmPasswordValidator, CustomValidator } from "../register/confirm-password.validator";
import { AuthenticationService } from "../service/authentication.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'kt-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetPasswordComponent extends AppComponentBase implements OnInit {
  success: boolean;
  loading: boolean;
  setPasswordForm: FormGroup;
  // validation messages
  validationMessages = {
    password: {
      required: 'Password is required.',
      hasNumber: 'Must contain atleast 1 number is required',
      hasCapitalCase: 'Must contain atleast 1 in Capital Case!',
      hasSmallCase: 'Must contain atleast 1 in Small Case!',
      hasSpecialCharacters: 'Must contain atleast 1 in Special Character!',
      minlength: 'Must be atleast 8 characters long'

    },
    confirmPassword: {
      ConfirmPassword: 'Password & Confirm Password did\'nt\ match'
    },
  };
  // keys for validation
  formErrors = {
    password: '',
    confirmPassword: '',
  };
  showRequirements = false;
  token

  constructor(
    injector: Injector,
    private authService: AuthenticationService,
  ) {
    super(injector)
    this.activatedRoute.queryParams.subscribe((res) => {
      this.token = res.token;
    })
  }

  ngOnInit(): void {
    this.setPasswordForm = this.fb.group({
      password: ['', Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidator.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        CustomValidator.patternValidator(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, { hasSpecialCharacters: true }),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8)
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required,
      ])],
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  submit() {
    if (this.setPasswordForm.invalid) {
      return
    }
    this.loading = true
    this.authService.setNewPassword(this.setPasswordForm.value.password, this.setPasswordForm.value.confirmPassword, this.token)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((res) => {
        if (res.result) {
          this.router.navigate(['/auth/login'])
        }
      }, error => {
        this.loading = false
        this.cdRef.detectChanges();
      })
  }

  keydown() {
    setTimeout(() => {
      if (this.setPasswordForm.controls.password.invalid && this.setPasswordForm.controls.password.dirty) {
        this.showRequirements = true
        this.cdRef.detectChanges()
      } else {
        this.showRequirements = false;
        this.cdRef.detectChanges()
      }
    }, 1000)
  }
}
