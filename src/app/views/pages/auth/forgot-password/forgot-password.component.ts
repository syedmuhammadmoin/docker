// Angular
import {ChangeDetectorRef, Component, Injector, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
// RxJS
import {finalize, takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
// Translate
import {TranslateService} from '@ngx-translate/core';
// Auth
import {AuthNoticeService, AuthService} from '../../../../core/auth';
import {AppComponentBase} from "../../../shared/app-component-base";

@Component({
  selector: 'kt-forgot-password',
  templateUrl: './forgot-password.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent extends AppComponentBase implements OnInit, OnDestroy {
  // Public params
  forgotPasswordForm: FormGroup;
  loading = false;
  errors: any = [];

  private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  formErrors = {
    email: '',
  };
  validationMessages = {
    email: {
      required: 'Email is Required!',
      email: 'Please enter valid Email!'
    },
  };
  success = false;

  /**
   * Component constructor
   *
   * @param authService
   * @param authNoticeService
   * @param translate
   * @param router
   * @param fb
   * @param cdr
   * @param injector
   */
  constructor(
    private authService: AuthService,
    public authNoticeService: AuthNoticeService,
    private injector: Injector
  ) {
    super(injector)
    this.unsubscribe = new Subject();
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    this.initRegistrationForm();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  /**
   * Form initalization
   * Default params, validators
   */
  initRegistrationForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
      ])
      ]
    });
  }

  /**
   * Form Submit
   */
  submit() {
    const controls = this.forgotPasswordForm.controls;
    /** check form */
    if (this.forgotPasswordForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    const email = controls.email.value;
    this.authService.requestResetPassword(email).pipe(
      tap(response => {
        if (response.result) {
          this.success = true
          /*this.authNoticeService.setNotice(this.translate.instant('AUTH.FORGOT.SUCCESS'), 'success');
          this.router.navigateByUrl('/' + APP_ROUTES.AUTH + '/' + AUTH.LOGIN);*/
        }
      }),
      takeUntil(this.unsubscribe),
      finalize(() => {
        this.loading = false;
        this.cdRef.markForCheck();
      })
    ).subscribe();
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.forgotPasswordForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) &&
      (control.dirty || control.touched);
    return result;
  }

  onSubmit() {

  }

  goBack() {
    window.history.back();
  }
}
