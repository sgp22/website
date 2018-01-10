import { Component, OnInit, DoCheck, AfterViewInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { DisplayGlobalNavService } from '../../shared/display-global-nav.service';

@Component({
  selector: 'app-element-page',
  templateUrl: './element-page.component.html',
  providers: [PagesService]
})
export class ElementPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class.ids-row--col-sm-9') iuxRow: any = true;
  public pageType: any = 'home.ElementsPage';
  public page: any;
  public options: any;
  public types: any;
  public states: any;
  public body: any;
  public sidebar: any = true;
  public descriptors: any;
  public notFound = false;
  public loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private globalNav: DisplayGlobalNavService
  ) {
    this.globalNav.displaySidebarNav = true;
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  ngAfterViewInit() {

    this.route.params.subscribe(params => {

      const slug = params['slug'];
      const url = this.router.routerState.snapshot.url;
      const preview = url.match(/id=\d{1,10}/g);
      preview ? this.getPreviewContent(preview) : this.getPageContent(slug);

    });

  }

  getPreviewContent(preview) {

    const id = `${preview.toString().match(/\d{1,10}/g)}/?preview=true`;

    this.pagesService
      .getPreview(id)
      .subscribe(
        (res: any) => {
          if (res) {
            this.page = res;
            this.types = res['types'];
            this.options = res['options'];
            this.states = res['states'];
            this.descriptors = res['descriptors'];
            this.body = res.items[0].body;
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        (err) => {
          console.error(err);
        }
      );

  }

  getPageContent(slug) {

    this.pagesService
      .getPage(slug, this.pageType)
      .subscribe(
        (res: any) => {
          if (res && res.items.length) {
            this.page = res.items[0];
            this.types = res.items[0].types;
            this.options = res.items[0].options;
            this.states = res.items[0].states;
            this.descriptors = res.items[0].descriptors;
            this.body = res.items[0].body;
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        (err) => {
          console.error(err);
        }
      );

  }

  ngOnDestroy() {
    this.globalNav.displaySidebarNav = false;
  }

}
