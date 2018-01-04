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
  @ViewChild('blockTemplate') blockTemplate;
  @ViewChild('docsTemplate') docsTemplate;
  @ViewChild(ComponentLoaderComponent) componentLoader: ComponentLoaderComponent;
  page;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService
  ) { }

  ngAfterContentInit() {

    this.route.params.subscribe(params => {

      const keys = Object.keys(params);

      if (params.slug === 'develop') {
        this.componentLoader.loadComponent(null, null, this.docsTemplate, {});
        return;
      }

      switch (keys.length) {
        case 0:
          this.fetchData('home', 'home.LandingPage', this.homeTemplate);
          break;
        case 1:
          this.fetchData(params.slug, 'home.LandingPage', this.landingTemplate);
          break;
        case 2:
          this.fetchData(params.childSlug, 'home.CoreContentPage', this.coreTemplate);
          break;
        case 3:
          this.pagesService.getAll().subscribe(data => {
            data['items'].filter(page => {
              const slug = page.meta.slug;
              if (slug === params.grandChildSlug) {
                switch (page.meta.type) {
                  case 'home.CoreContentPage':
                    this.page = page;
                    this.componentLoader.loadComponent(page.meta.type, page.meta.slug, this.coreTemplate, this.page);
                    break;
                  case 'home.BlocksPage':
                    this.page = page;
                    this.componentLoader.loadComponent(page.meta.type, page.meta.slug, this.blockTemplate, this.page);
                    break;
                  default:
                    this.page = page;
                    this.componentLoader.loadComponent(page.meta.type, page.meta.slug, this.elementsTemplate, this.page);
                }
              }
            });
          });
          break;
        default:
          console.log('page not found!');
          break;
      }

    });

  }

  fetchData(paramsSlug, pageType, template, data = {}) {
    this.pagesService.getAll().subscribe(d => {
      d['items'].filter(page => {
        const slug = page.meta.slug;
        if (slug === paramsSlug) {
          this.page = page;
          this.componentLoader.loadComponent(pageType, page.meta.slug, template, this.page);
        }
      });
    });
  }

}
