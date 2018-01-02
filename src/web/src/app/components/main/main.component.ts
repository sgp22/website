import { Component, AfterContentInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { ComponentLoaderComponent } from '../component-loader/component-loader.component';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  providers: [PagesService]
})
export class MainComponent implements AfterContentInit {
  @ViewChild('homeTemplate') homeTemplate;
  @ViewChild('landingTemplate') landingTemplate;
  @ViewChild('coreTemplate') coreTemplate;
  @ViewChild('elementsTemplate') elementsTemplate;
  @ViewChild(ComponentLoaderComponent) componentLoader: ComponentLoaderComponent;
  page;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngAfterContentInit() {

    this.route.params.subscribe(params => {
      const keys = Object.keys(params);
      switch (keys.length) {
        case 0:
          this.componentLoader.loadComponent('home.LandingPage', params.slug, this.homeTemplate, {});
          break;
        case 1:
          this.componentLoader.loadComponent('home.LandingPage', params.slug, this.landingTemplate, {});
          break;
        case 2:
          this.componentLoader.loadComponent('home.CoreContentPage', params.childSlug, this.coreTemplate, {});
          break;
        case 3:
          this.pagesService.getAll().subscribe(data => {
            data['items'].filter(page => {
              const slug = page.meta.slug;
              if (slug === params.grandChildSlug) {
                if(page.meta.type === 'home.CoreContentPage') {
                  this.page = page;
                  this.componentLoader.loadComponent(page.meta.type, page.meta.slug, this.coreTemplate, this.page);
                } else {
                  this.page = page;
                  this.componentLoader.loadComponent(page.meta.type, page.meta.slug, this.elementsTemplate, this.page);
                }
              }
            });
          });
      }

    });

  }

  fetchData() {}

}
