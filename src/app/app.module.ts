import { AccountLevel4State } from './core/shared-state/account-state/store/account-level4.state';
import { CityState } from './core/shared-state/account-state/store/city.state';
import { StateState } from './core/shared-state/account-state/store/state.state';
import { CountryState } from './core/shared-state/account-state/store/country.state';
import { WarehouseState } from './views/pages/profiling/warehouse/store/warehouse.state';
import { DepartmentState } from './views/pages/profiling/department/store/department.state';
import { LocationState } from './views/pages/profiling/location/store/location.state';
import { OrganizationState } from './views/pages/profiling/organization/store/organization.state';
import { CategoryState } from './views/pages/profiling/category/store/category.state';
import { CommonModule } from '@angular/common';
// Angular
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// SVG inline
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxPermissionsModule } from 'ngx-permissions';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// State
import { metaReducers, reducers } from './core/reducers';
// NGXS state management
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

// Components
import { AppComponent } from './app.component';
// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ThemeModule } from './views/theme/theme.module';
// Partials
import { PartialsModule } from './views/partials/partials.module';
// Layout Services
import {
  DataTableService,
  KtDialogService,
  LayoutConfigService,
  LayoutRefService,
  MenuAsideService,
  MenuConfigService,
  MenuHorizontalService,
  PageConfigService,
  SplashScreenService,
  SubheaderService
} from './core/_base/layout';
// Auth
import { AuthModule } from './views/pages/auth/auth.module';
import { AuthService } from './core/auth';
// CRUD
import {
  HttpUtilsService,
  LayoutUtilsService,
  TypesUtilsService
} from './core/_base/crud';
// Config
import { LayoutConfig } from './core/_config/layout.config';

import { AccountResolverService } from './views/shared/resolver/account/account-resolver.service';
import { BusinessPartnerResolverService } from './views/shared/resolver/businessPartner/business-partner-resolver.service';
import { LocationResolverService } from './views/shared/resolver/location/location-resolver.service';
import { ProductResolverService } from './views/shared/resolver/product/product-resolver.service';
import { SharedModule } from './views/shared/shared.module';
import { BankAccountResolverService } from './views/shared/resolver/bankAccount/bank-account-resolver.service';
import { DepartmentResolverService } from './views/shared/resolver/department/department-resolver.service';
import { BusinessPartnerState } from './views/pages/profiling/business-partner/store/business-partner.state';
import { ProductState } from './views/pages/profiling/product/store/product.state.state';
import { BankAccountState } from './views/pages/finance/bank-account/store/bank-account.state';
import { AppInitializer } from "../AppInitializer";
import { PayableAccountState } from "./views/pages/finance/chat-of-account/store/payable-account.state";
import { AccountReceivablesState } from "./views/pages/finance/chat-of-account/store/account-receivables.state";
import { OtherAccountState } from "./views/pages/finance/chat-of-account/store/other-account.state";
import { CashAccountState } from "./views/pages/finance/cash-account/store/cash-account.state";
import { OrganizationModule } from "./views/pages/profiling/organization/organization.module";

// tslint:disable-next-line:class-name
// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   wheelSpeed: 0.5,
//   swipeEasing: true,
//   minScrollbarLength: 40,
//   maxScrollbarLength: 300
// };

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
  // initialize app by loading default demo layout config
  return () => {
    if (appConfig.getConfig() === null) {
      appConfig.loadConfigs(new LayoutConfig().configs);
    }
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    NgxsModule.forRoot([
      BusinessPartnerState,
      CategoryState,
      OrganizationState,
      DepartmentState,
      LocationState,
      ProductState,
      WarehouseState,
      AccountLevel4State,
      PayableAccountState,
      AccountReceivablesState,
      OtherAccountState,
      CountryState,
      StateState,
      CityState,
      BankAccountState,
      CashAccountState
    ]),
    // NgxsReduxDevtoolsPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument(),
    AuthModule.forRoot(),
    OrganizationModule.forRoot(),
    TranslateModule.forRoot(),
    InlineSVGModule.forRoot(),
    CoreModule,
    PartialsModule,
    ThemeModule,
    SharedModule
  ],
  exports: [BrowserAnimationsModule],
  providers: [
    AuthService,
    LayoutConfigService,
    LayoutRefService,
    MenuConfigService,
    PageConfigService,
    KtDialogService,
    DataTableService,
    SplashScreenService,
    BusinessPartnerResolverService,
    LocationResolverService,
    AccountResolverService,
    ProductResolverService,
    BankAccountResolverService,
    DepartmentResolverService,
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    // },
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializer) => appInitializer.init(),
      deps: [AppInitializer],
      multi: true,
    },
    {
      // layout config initializer
      provide: APP_INITIALIZER,
      useFactory: initializeLayoutConfig,
      deps: [LayoutConfigService],
      multi: true
    },

    // template services
    SubheaderService,
    MenuHorizontalService,
    MenuAsideService,
    HttpUtilsService,
    TypesUtilsService,
    LayoutUtilsService
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
