import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[previewLoader]'
})
export class PreviewLoaderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
