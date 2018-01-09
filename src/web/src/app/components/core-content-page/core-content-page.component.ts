import { Component, OnInit, AfterViewInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { HttpClient } from '@angular/common/http';
import { DisplayGlobalNavService } from '../../shared/display-global-nav.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-core-content-page',
  templateUrl: './core-content-page.component.html',
  providers: [PagesService]
})
export class CoreContentPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class.ids-row--col-sm-9') iuxRow: any = true;
  public pageType: any = 'home.CoreContentPage';
  public page: any;
  public body: any;
  public streamfields: any;
  public sidebar: any = true;
  public notFound = false;
  public loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private http: HttpClient,
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
            this.streamfields = res['body'];
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        err => {
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
            this.streamfields = res.items[0].body;
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        err => {
          console.error(err);
        }
      );
  }

  ngOnDestroy() {
    this.globalNav.displaySidebarNav = false;
  }

}
