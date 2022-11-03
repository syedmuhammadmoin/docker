import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup, NgForm, Validators } from "@angular/forms";
import { Observable } from "rxjs/internal/Observable";
import { User } from "src/app/core/auth/_models/user.model";
import { OffcanvasOptions } from "src/app/core/_base/layout/directives/offcanvas.directive";
import { AuthenticationService } from "src/app/views/pages/auth/service/authentication.service";
import { AppComponentBase } from "src/app/views/shared/app-component-base";
import { ACCESS_MANAGEMENT, APP_ROUTES } from "src/app/views/shared/AppRoutes";
import { UserSettingService } from "src/app/views/shared/services/user-setting/user-setting.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'kt-quick-user-panel',
  templateUrl: './quick-user-panel.component.html',
  styleUrls: ['./quick-user-panel.component.scss']
})
export class QuickUserPanelComponent extends AppComponentBase implements OnInit {

  isLoading: boolean;

  @ViewChild('formDirective') private formDirective: NgForm;
  formErrors = {
    dateFormat: '',
    timezone: ''
  }
  user$: Observable<User>;
  user: User;
  dark_theme:'';
  // Public properties
  offcanvasOptions: OffcanvasOptions = {
    overlay: true,
    baseClass: 'offcanvas',
    placement: 'right',
    closeBy: 'kt_quick_user_close',
    toggleBy: 'kt_quick_user_toggle'
  };
  public form: FormGroup

  constructor(
    private authService: AuthenticationService,
    private injector: Injector,
    private userSettingService: UserSettingService,
  ) {
    super(injector)
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.user = this.decodeService.getUser();
    this.initForm()
    // this.user$ = this.store.pipe(select(currentUser));
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
    // if(localStorage.getItem('darktheme')){
    //   localStorage.removeItem('darktheme');
    // }
    // else{
    //   localStorage.setItem('darktheme', 'dark-theme');
    // }
    (localStorage.getItem('darktheme')) ? localStorage.removeItem('darktheme') : localStorage.setItem('darktheme', 'dark-theme');

  }

  /**
   * Log out
   */
  logout() {
    this.authService.signOut().subscribe((isLoggedOut) => {
      if (isLoggedOut) {
        this.router.navigate(['/auth/login']);
      } else {
        this.toastService.error('Something went wrong, we\'re\ working on it. We will notify you when it\'s\ done', 'Error')
      }
    })
    // this.store.dispatch(new Logout());
  }

  initForm() {
    this.form = this.fb.group({
      dateFormat: [this.user.dateFormat, [Validators.required]],
      timezone: null
    });


  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }
    this.isLoading = true;
    this.userSettingService.updateDateFormate(this.form.value).subscribe(() => {
      this.authService.refreshToken().subscribe((res) => {
        if (res.isSuccess) {
          localStorage.setItem(environment.authTokenKey, res.result.token);
          window.location.reload();
        }
      });
    });
  }

  changePassword() {
    this.router.navigate(['/' + APP_ROUTES.ACCESS_MANAGEMENT + '/' + ACCESS_MANAGEMENT.CHANGE_PASSWORD])
  }
}
