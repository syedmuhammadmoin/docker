import { NgxPermissionsModule } from 'ngx-permissions';
// Angular
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// Perfect Scrollbar
import { CoreModule } from '../../core/core.module';
import { HeaderComponent } from './header/header.component';
import { AsideLeftComponent } from './aside/aside-left.component';
import { FooterComponent } from './footer/footer.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { BrandComponent } from './brand/brand.component';
import { TopbarComponent } from './header/topbar/topbar.component';
import { MenuHorizontalComponent } from './header/menu-horizontal/menu-horizontal.component';
import { PartialsModule } from '../partials/partials.module';
import { BaseComponent } from './base/base.component';
import { PagesModule } from '../pages/pages.module';
import { HtmlClassService } from './html-class.service';
import { HeaderMobileComponent } from './header/header-mobile/header-mobile.component';
import { PermissionEffects, permissionsReducer, RoleEffects, rolesReducer } from '../../core/auth';
import { MatImportModule } from '../shared/modules/mat-import.module';
import { OtherImportModule } from '../shared/modules/other-import.module';

const exportz = [
  BaseComponent,
  FooterComponent,
  HeaderComponent,
  BrandComponent,
  HeaderMobileComponent,
  SubheaderComponent,
  TopbarComponent,
  AsideLeftComponent,
  MenuHorizontalComponent,
]
@NgModule({
  declarations: [
   ...exportz
  ],
  exports: [
   ...exportz
  ],
  providers: [
    HtmlClassService,
  ],
  imports: [
    OtherImportModule,
    MatImportModule,
    NgxPermissionsModule.forChild(),
    StoreModule.forFeature('roles', rolesReducer),
    StoreModule.forFeature('permissions', permissionsReducer),
    EffectsModule.forFeature([PermissionEffects, RoleEffects]),
    PagesModule,
    PartialsModule,
    CoreModule,
    TranslateModule.forChild(),
  ]
})
export class ThemeModule {
}
