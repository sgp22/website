import { Component, OnInit, DoCheck, AfterViewInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { DisplayGlobalNavService } from '../../shared/display-global-nav.service';

@Component({
  selector: 'app-block-page',
  templateUrl: './block-page.component.html',
  providers: [PagesService]
})
export class BlockPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class.ids-row--col-sm-9') iuxRow: any = true;
  public pageType: any = 'home.BlocksPage';
  public page: any;
  public options: any;
  public types: any;
  public descriptors: any;
  public body: any;
  public sidebar: any = true;
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
    let slug;
    let urlSegment;
    this.route.url.forEach((url) => {
      urlSegment = url[0].path;
    });

    this.route.params.subscribe(params => {
      slug = params['slug'];
      this.pagesService
        .getPage(slug, this.pageType)
        .subscribe(
          (res: any) => {
            if (res && res.items.length) {
              this.page = res.items[0];
              this.types = res.items[0].types;
              this.options = res.items[0].options;
              this.descriptors = res.items[0]['descriptors'];
              this.body = res.items[0].body;
              this.notFound = false;
              this.loading = false;
              console.log(this.descriptors);
            } else {
              this.notFound = true;
            }
          },
          err => {
            console.log(err);
          }
        );

    });

  }

  ngOnDestroy() {
    this.globalNav.displaySidebarNav = false;
  }

}
