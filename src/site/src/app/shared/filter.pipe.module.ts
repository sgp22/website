import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';

@NgModule({
  imports: [],
  declarations: [FilterPipe],
  exports: [FilterPipe],
})

export class FilterPipeModule {

  static forRoot() {
    return {
      ngModule: FilterPipeModule,
      providers: [],
    };
  }
}
