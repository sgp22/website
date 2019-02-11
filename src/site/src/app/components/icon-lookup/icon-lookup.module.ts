import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconLookupComponent } from './icon-lookup.component';
import { IconLookupService } from './icon-lookup.service';
import { IconDownloadComponent } from './icon-download.component';

@NgModule({
  declarations: [ IconLookupComponent, IconDownloadComponent ],
  imports: [
    CommonModule
  ],
  exports: [ IconLookupComponent ],
  providers: [ IconLookupService ]
})
export class IconLookupModule { }
