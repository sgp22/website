import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from 'src/app/shared/pages.service';
import { PreviewLoaderDirective } from './preview-loader.directive';
import { CoreContentPageComponent } from '../core-content-page/core-content-page.component';
import { BlogPostPageComponent } from '../blog-post-page/blog-post-page.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'preview-loader',
  templateUrl: './preview-loader.component.html'
})
export class PreviewLoaderComponent implements OnInit {
  @ViewChild(PreviewLoaderDirective, { static: true }) previewLoader: PreviewLoaderDirective;
  public apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        const apiUrl = `${this.apiUrl}/api/v2/page_preview/1/?content_type=${params.content_type}&token=${params.token}&format=json`;
        this.pagesService.getPreview(apiUrl)
          .subscribe(res => {
            this.loadComponent(res['meta']['type'], res);
          });
      });
    this.route.params.subscribe(params => {

    });
  }

  loadComponent(type: string, res: any) {
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

    if (type === 'home.LandingPage') {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LandingPageComponent);
      const viewContainerRef = this.previewLoader.viewContainerRef;
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<LandingPageComponent>componentRef.instance).pageContent = res;
    }
  }

}
