// Angular
import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// RxJS
import {Observable, Subject} from 'rxjs';
import {finalize, takeUntil, tap} from 'rxjs/operators';
// Translate
import {TranslateService} from '@ngx-translate/core';
// Store
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/reducers';
// Auth
import {AuthNoticeService, AuthService, Login, User} from '../../../../core/auth';
import {DecodeTokenService} from '../../../shared/decode-token.service';
import {LayoutUtilsService} from '../../../../core/_base/crud';
import {AppConst} from '../../../shared/AppConst';

/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
  EMAIL: 'superadmin@vizalys.com',
  PASSWORD: 'Admin123!@#'
};

@Component({
  selector: 'kt-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {

  // Public params
  loginForm: FormGroup;
  loading = false;
  isLoggedIn$: Observable<boolean>;
  errors: any = [];
  user: User = new User();
  appconst = AppConst
  password: any;
  show = false;
  // currentUserInfo: IUserInformation

  private unsubscribe: Subject<any>;

  private returnUrl: any;

  // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  /**
   * Component constructor
   *
   * @param router: Router
   * @param auth: AuthService
   * @param authNoticeService: AuthNoticeService
   * @param translate: TranslateService
   * @param store: Store<AppState>
   * @param fb: FormBuilder
   * @param cdr
   * @param route
   * @param decodeService
   * @param layoutUtilService
   */
  constructor(
    private router: Router,
    private auth: AuthService,
    private authNoticeService: AuthNoticeService,
    private translate: TranslateService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private decodeService: DecodeTokenService,
    private layoutUtilService: LayoutUtilsService
  ) {
    this.unsubscribe = new Subject();
    /*const orgId = localStorage.getItem('org');
    if (orgId) {
      this.auth.getApplicationToken(orgId).subscribe((res) => {
        if (res.isSuccess) {
          localStorage.setItem(environment.authTokenKey, res.result.token)
          this.showOverlay = false;
          this.router.navigate(['/dashboard'])
        }
      })
    } else {
      this.showOverlay = false;
    }*/
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {

    this.password = 'password';
    this.initLoginForm();

    // redirect back to the returnUrl before login
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl || '/';
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.authNoticeService.setNotice(null);
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  /**
   * Form initalization
   * Default params, validators
   */
  initLoginForm() {
    // demo message to show
    if (!this.authNoticeService.onNoticeChanged$.getValue()) {
      const initialNotice = `Use account
			<strong>${DEMO_PARAMS.EMAIL}</strong> and password
			<strong>${DEMO_PARAMS.PASSWORD}</strong> to continue.`;
      // this.authNoticeService.setNotice(initialNotice, 'info');
    }

    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        // Validators.email,
        // Validators.minLength(3),
        // Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
      ])
      ],
      password: ['', Validators.compose([
        Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(100)
      ])
      ]
    });
  }

  /**
   * Form Submit
   */
  async submit() {
    const controls = this.loginForm.controls;
    /** check form */
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const authData = {
      email: controls.email.value,
      password: controls.password.value
    };

    /*this.auth.login(authData.email, authData.password)
    .pipe(
    tap(res => {
    })
    )
    .subscribe(
    (res) => {},
    (err) => alert(err?.error?.message));*/
    this.auth
      .login(authData.email, authData.password, localStorage.getItem('org'))
      .pipe(
        tap(async res => {
          if (res.isSuccess) {
            // this.currentUserInfo = res.result;
            // localStorage.setItem(environment.authTokenKey, res.result.token)
            this.store.dispatch(new Login({authToken: res.result.token}));
            // const decodedToken = await this.decodeService.decode(res.message);
            // this.store.dispatch(new UserLoaded({user: this.decodeService.setUser(decodedToken)}));
            await this.router.navigateByUrl(this.returnUrl); // Main page
          } else {
            this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
          }
        }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe(
        () => {
        },
        (e) => {
          // this.layoutUtilService.showActionNotification(e?.error?.message, null, 5000, true, false)
          // this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN') + ', ' + e?.error?.message, 'danger');
        });
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  resetPassword() {
    // this.router.navigate(['/' + AUTH.FORGOT_PASSWORD])
    window.open(`${AppConst.websiteBaseUrl}/fp`, '_self');
  }
}
