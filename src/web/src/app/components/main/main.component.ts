import { Component, AfterContentInit, ViewChild, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { ComponentLoaderComponent } from '../component-loader/component-loader.component';
import { PagesService } from '../../shared/pages.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  providers: [PagesService]
})
export class MainComponent implements AfterContentInit, OnInit {
  @ViewChild('homeTemplate') homeTemplate;
  @ViewChild('landingTemplate') landingTemplate;
  @ViewChild('coreTemplate') coreTemplate;
  @ViewChild('elementsTemplate') elementsTemplate;
  @ViewChild('blockTemplate') blockTemplate;
  @ViewChild('docsTemplate') docsTemplate;
  @ViewChild('docsLandingTemplate') docsLandingTemplate;
  @ViewChild('notFoundTemplate') notFoundTemplate;
  @ViewChild('sidebarPlaceholder', { read: ViewContainerRef }) sidebarPlaceholder: ViewContainerRef;
  @ViewChild(ComponentLoaderComponent) componentLoader: ComponentLoaderComponent;
  public page;
  public section;
  public sidebarNav;
  public hasGrandchildren: boolean;
  public globalNav;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pagesService: PagesService
  ) { }

  ngOnInit() {}

  ngAfterContentInit() {

    this.route.params.subscribe(params => {

      const keys = Object.keys(params);
      this.docsComponents(keys, params);
      this.cmsComponents(keys, params);


    });

  }

  cmsComponents(keys, params) {
    switch (keys.length) {
      case 0:
        this.fetchData('homepage', 'home.LandingPage', this.homeTemplate);
        break;
      case 1:
        this.fetchData(params.slug, 'home.LandingPage', this.landingTemplate, {}, true);
        break;
      case 2:
        this.fetchData(params.childSlug, 'home.CoreContentPage', this.coreTemplate, {}, true);
        break;
      case 3:
        this.pagesService.getAll().subscribe(data => {

          if (this.pageExists(data['items'], params.grandChildSlug)) {

            this.getSideBar(data);

            data['items'].filter(page => {
              const slug = page.meta.slug;
              if (slug === params.grandChildSlug) {
                switch (page.meta.type) {
                  case 'home.CoreContentPage':
                    this.getPageContent(page, this.coreTemplate);
                    break;
                  case 'home.BlocksPage':
                    this.getPageContent(page, this.blockTemplate);
                    break;
                  default:
                    this.getPageContent(page, this.elementsTemplate);
                    break;
                }
              }
            });

          } else {
            this.componentLoader.loadComponent(null, null, this.notFoundTemplate, {});
          }

        });
        break;
      default:
        this.componentLoader.loadComponent(null, null, this.notFoundTemplate, {});
        break;
    }
  }

  docsComponents(keys, params) {
    if (params.slug === 'develop') {
      switch (keys.length) {
        case 1:
          this.fetchData(params.slug, 'home.LandingPage', this.docsLandingTemplate, {}, false);
          break;
        case 2:
          this.componentLoader.loadComponent(null, null, this.notFoundTemplate, {});
          break;
        default:
          this.componentLoader.loadComponent(null, null, this.docsTemplate, {});
          break;
      }
      return;
    }
  }

  pageExists(page, paramsSlug) {
    const index = page.findIndex(p => p.meta.slug === paramsSlug);
    if (index !== -1) {
      return true;
    }
  }

  fetchData(paramsSlug, pageType, template, data = {}, sidebar = false) {

    this.pagesService.getAll().subscribe(d => {

      if (this.pageExists(d['items'], paramsSlug)) {
        d['items'].filter(page => {
          const slug = page.meta.slug;
          if (slug === paramsSlug) {
            this.getPageContent(page, template);
          }
        });
      } else {
        this.componentLoader.loadComponent(null, null, this.notFoundTemplate, {});
      }

      if (sidebar === true) {
        this.getSideBar(d);
      }
    });

  }

  getSideBar(res) {

    const url = this.router.routerState.snapshot.url;
    const urlSegments = url.split('/');
    urlSegments.shift();
    this.section = urlSegments[0];

    res['items'].filter((item) => {
      if (item.meta.slug === this.section) {
        this.sidebarNav = item.meta.children.children.sort((thisChild, nextChild) => {
          item.meta.children.children.map(child => {
            child.children.length > 0 ? this.hasGrandchildren = true : this.hasGrandchildren = false;
            child.children.sort((thisGrandChild, nextGrandchild) => {
              return thisGrandChild.title > nextGrandchild.title ? 1 : -1;
            });
          });
          return thisChild.menu_order > nextChild.menu_order ? 1 : -1;
        });
      }
    });

  }

  getPageContent(page, template) {

    let requestParam;
    const url = this.router.routerState.snapshot.url;
    const preview = url.match(/preview=true&id=\d{1,10}/g);
    const previewId = `${page.id}/?preview=true`;
    preview ? requestParam = previewId : requestParam = page.id;

    this.pagesService
      .getPage(requestParam)
      .subscribe(
        (res: any) => {
          this.page = res;
          this.componentLoader.loadComponent(page.meta.type, page.meta.slug, template, this.page);
          window.scrollTo(0, 0);
        },
        (err) => {
          console.error(err);
        }
      );

  }

}
