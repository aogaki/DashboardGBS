import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { LogFormComponent } from './log-form/log-form.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { NbDatepickerModule } from '@nebular/theme';

const PAGES_COMPONENTS = [PagesComponent];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    NbDatepickerModule
  ],
  declarations: [...PAGES_COMPONENTS, LogFormComponent, ImageUploaderComponent]
})
export class PagesModule {}
