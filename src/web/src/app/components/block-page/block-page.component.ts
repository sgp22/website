import { Component, OnInit, DoCheck, AfterViewInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { DisplayGlobalNavService } from '../../shared/display-global-nav.service';

@Component({
  selector: 'app-block-page',
  templateUrl: './block-page.component.html',
  providers: [PagesService]
})
export class BlockPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class.iux-row--col-sm-9') iuxRow: any = true;
  public pageType: any = 'home.BlocksPage';
  public page: any;
  public options: any;
  public types: any;
  public states: any;
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

  ngOnInit() {}

  ngAfterViewInit() {

    let slug;
    let urlSegment;

    this.route.url.forEach((url) => {
      urlSegment = url[0].path;
    });

    this.route.params.forEach((params: Params) => {
      slug = params['slug'];
    });

    this.pagesService.getPage(slug, this.pageType)
      .subscribe(
        (res: any) => {
          if (res && res.items.length) {
            this.page = res.items[0];
            this.types = res.items[0].types;
            this.options = res.items[0].options;
            this.states = res.items[0].states;
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        }
      );

    this.router.events
      .filter((e) => e instanceof NavigationEnd)
      .switchMap(e => this.pagesService.getPage(slug, this.pageType))
        .subscribe(
          (res: any) => {
            if (res && res.items.length) {
              this.page = res.items[0];
              this.types = res.items[0].types;
              this.options = res.items[0].options;
              this.states = res.items[0].states;
              this.notFound = false;
            } else {
              this.notFound = true;
            }
          }
        );

  }

  ngOnDestroy() {
    this.globalNav.displaySidebarNav = false;
  }

}
