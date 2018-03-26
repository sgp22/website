import { Component, AfterContentInit, ViewChild, OnInit, ViewContainerRef, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { ComponentLoaderComponent } from '../component-loader/component-loader.component';
import { PagesService } from '../../shared/pages.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

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
  @HostBinding('class.ids-row--offset-xl-2')
  @HostBinding('class.ids-row--offset-sm-3') useGrid: boolean = true;
  public page;
  public tokenCategory;
  public section;
  public sidebarNav;
  public hasGrandchildren: boolean;
  public globalNav;
  public loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pagesService: PagesService,
    private loadingBar: LoadingBarService
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
    if(params.slug !== 'code') {
      switch (keys.length) {
        case 0:
          this.useGrid = false;
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
              this.switchPageType(data['items'], params.grandChildSlug);
            } else {
              this.componentLoader.loadComponent(null, null, this.notFoundTemplate, {});
            }

          });
          break;
        case 4:
          this.pagesService.getAll().subscribe(data => {

            if (this.pageExists(data['items'], params.greatGrandChildSlug)) {
              this.switchPageType(data['items'], params.greatGrandChildSlug);
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
  }

  docsComponents(keys, params) {
    if (params.slug === 'code') {
      switch (keys.length) {
        case 1:
          this.fetchData(params.slug, 'home.LandingPage', this.docsLandingTemplate, {}, true);
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

    this.loading = true;

    this.pagesService.getAll().subscribe(
      (d) => {

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
      },
      () => this.stopRefreshing(),
      () => this.stopRefreshing()
    );

  }

  getSideBar(res) {

    const url = this.router.routerState.snapshot.url;
    const urlSegments = url.split('/');
    urlSegments.shift();
    this.section = urlSegments[0];

    res['items'].filter((item) => {
      if (item.meta.slug === this.section) {
        if (item.meta.children.children.length === 1 && item.meta.children.children[0].children_count == 0) {
          this.hasGrandchildren = false
        }
        this.sidebarNav = item.meta.children.children.sort((thisChild, nextChild) => {
          item.meta.children.children.map(child => {
            child.children.length <= 0 ? this.hasGrandchildren = false : this.hasGrandchildren = true;
            child.children.sort((thisGrandChild, nextGrandchild) => {
              return thisGrandChild.title > nextGrandchild.title ? 1 : -1;
            });
          });
          if (this.hasGrandchildren) {
            return thisChild.menu_order > nextChild.menu_order ? 1 : -1;
          } else {
            return thisChild.title > nextChild.title ? 1 : -1;
          }
        });
      }
    });

  }

  getPageContent(page, template): void {

    let requestParam;
    const url = this.router.routerState.snapshot.url;
    const preview = url.match(/preview=true&id=\d{1,10}/g);
    const previewId = `${page.id}/?preview=true`;
    preview ? requestParam = previewId : requestParam = page.id;

    this.loading = true;
    this.loadingBar.start();

    this.pagesService
      .getPage(requestParam)
      .subscribe(
        (res: any) => {
          this.page = res;
          this.componentLoader.loadComponent(page.meta.type, page.meta.slug, template, this.page);
        },
        () => {
          this.stopRefreshing()
        },
        () => {
          this.loadingBar.complete();
          this.stopRefreshing();
          window.scrollTo(0, 0);
        }
      );

  }

  switchPageType(data, params) {
    data.filter(page => {
      const slug = page.meta.slug;
      if (slug === params) {
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
  }

  private stopRefreshing() {
    this.loading = false;
  }

}
