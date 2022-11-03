import {Subscription} from 'rxjs';
// Angular
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from '@angular/router';
// Layout
import {LayoutConfigService, SplashScreenService, TranslationService} from './core/_base/layout';
// language list
import {locale as enLang} from './core/_config/i18n/en';
import {locale as chLang} from './core/_config/i18n/ch';
import {locale as esLang} from './core/_config/i18n/es';
import {locale as jpLang} from './core/_config/i18n/jp';
import {locale as deLang} from './core/_config/i18n/de';
import {locale as frLang} from './core/_config/i18n/fr';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[kt-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  // Public properties
  title = 'Welcome to Vizalys';
  // logo: string = './assets/media/logos/favicon.png';
  loader: false;
  // custom property fr overlay
  showOverlay = true;


  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  /**
   * Component constructor
   * @param translationService: TranslationService
   * @param router: Router
   * @param layoutConfigService: LayoutConfigService
   * @param splashScreenService: SplashScreenService
   */
  constructor(
    private translationService: TranslationService,
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    private splashScreenService: SplashScreenService
  ) {
    // this.loading=true;
    // register translations
    this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang);
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    // enable/disable loader

    document.body.classList.toggle(localStorage.getItem('darktheme'));

    this.loader = this.layoutConfigService.getConfig('page-loader.type');

    const routerSubscription = this.router.events.subscribe(event => {
      // custom loader start
      if (event instanceof NavigationStart) {
        this.showOverlay = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.showOverlay = false;
        // hide splash screen
        this.splashScreenService.hide();
        // scroll to top on every route change
        window.scrollTo(0, 0);
        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('page-loaded');
        }, 3000);
      }
    });
    this.unsubscribe.push(routerSubscription);
  }


  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

  /**
   * On Destroy
   */

  ngOnDestroy() {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }
}
