import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { DisplayGlobalNavService } from '../../shared/display-global-nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [PagesService]
})
export class HomeComponent implements OnDestroy {
  public slugs: any;
  public pageType: any = 'home.LandingPage';
  public page: any;
  public flexibleContent: any;
  public docs: any;
  public docsBody: any;
  public streamfields: any;
  public notFound = false;
  public loading = true;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private globalNav: DisplayGlobalNavService,
    private router: Router
  ) {
    this.globalNav.displayGlobalNav = false;

    this.route.params.subscribe(params => {

      const url = this.router.routerState.snapshot.url;
      const preview = url.match(/id=\d{1,10}/g);
      preview ? this.getPreviewContent(preview) : this.getPageContent();

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
            this.flexibleContent = res['content'];
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        (err) => {
          console.log(err);
        }
    );

  }

  getPageContent() {
    this.pagesService
      .getPage('home', this.pageType)
      .subscribe(
        (res: any) => {
          if (res && res.items.length) {
            this.page = res.items[0];
            this.flexibleContent = res.items[0].content;
            this.notFound = false;
            this.loading = false;
          } else {
            this.notFound = true;
          }
        },
        (err) => {
          console.log(err);
        }
    );
  }

  ngOnDestroy() {
    this.globalNav.displayGlobalNav = true;
  }
}
