import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PagesService } from 'src/app/shared/pages.service';
import { PreviewLoaderDirective } from './preview-loader.directive';
import { CoreContentPageComponent } from '../core-content-page/core-content-page.component';
import { BlogPostPageComponent } from '../blog-post-page/blog-post-page.component';

@Component({
  selector: 'preview-loader',
  templateUrl: './preview-loader.component.html',
  styleUrls: ['./preview-loader.component.scss']
})
export class PreviewLoaderComponent implements OnInit {
  @ViewChild(PreviewLoaderDirective, { static: true }) previewLoader: PreviewLoaderDirective;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const apiUrl = `http://localhost/api/v2/page_preview/1/?content_type=home.blogpostpage&token=id=102:1hdKPS:NojcN5faN0tnH5ZM4ZQLK2TDU0Y&format=json`;
      this.pagesService.getPreview(apiUrl)
        .subscribe(res => {
          this.loadComponent(res['meta']['type'], res);
        })
    });
  }

  loadComponent(type, res) {
    if (type === 'home.CoreContentPage') {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CoreContentPageComponent);
      const viewContainerRef = this.previewLoader.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<CoreContentPageComponent>componentRef.instance).pageContent = res;
    }

    if (type === 'home.BlogPostPage') {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BlogPostPageComponent);
      const viewContainerRef = this.previewLoader.viewContainerRef;
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<BlogPostPageComponent>componentRef.instance).pageContent = res;
    }
  }

}
