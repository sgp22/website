import { TestBed } from '@angular/core/testing';
import { PreviewLoaderDirective } from './preview-loader.directive';
import { ViewContainerRef } from '@angular/core';

describe('PreviewLoaderDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewContainerRef]
    });
  });

  it('should create an instance', () => {
    /* tslint:disable */
    let viewContainerRef: ViewContainerRef;
    /* tslint:enable */
    const directive = new PreviewLoaderDirective(viewContainerRef);
    expect(directive).toBeTruthy();
  });
});
