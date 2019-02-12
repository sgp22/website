import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconLookupComponent } from './icon-lookup.component';
import { IconLookupService } from './icon-lookup.service';
import { IconDownloadComponent } from './icon-download.component';
import { FormsModule } from '@angular/forms';
import { FilterPipeModule } from 'src/app/shared/filter.pipe.module';

@NgModule({
  declarations: [
    IconLookupComponent,
    IconDownloadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FilterPipeModule
  ],
  exports: [ IconLookupComponent ],
  providers: [ IconLookupService ]
})
export class IconLookupModule { }
