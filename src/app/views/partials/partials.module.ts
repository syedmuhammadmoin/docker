// Angular
import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import {
  ActionNotificationComponent,
} from './content/crud';
import {
  QuickUserPanelComponent,
  ScrollTopComponent,
  SplashScreenComponent,
  Subheader1Component,
  UserProfile4Component
} from './layout';
// General
import { NoticeComponent } from './content/general/notice/notice.component';
import { PortletModule } from './content/general/portlet/portlet.module';
// SVG inline
import { OrganizationSwitchComponent } from './layout/organization-switch/organization-switch.component';
import { SharedModule } from "../shared/shared.module";

const exportz = [
  ScrollTopComponent,
    NoticeComponent,
    ActionNotificationComponent,
    QuickUserPanelComponent,
    ScrollTopComponent,
    SplashScreenComponent,
    Subheader1Component,
    UserProfile4Component,
    OrganizationSwitchComponent,
]
@NgModule({
  declarations: [
    ...exportz
  ],
  exports: [
    ...exportz,
    PortletModule,
  ],
  imports: [
    CoreModule,
    PortletModule,
    SharedModule,
  ],
})
export class PartialsModule {
}
