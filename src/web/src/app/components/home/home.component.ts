import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
    private globalNav: DisplayGlobalNavService
  ) {
    this.globalNav.displayGlobalNav = false;
    this.route.params.subscribe(params => {
      this.pagesService.getPage('home', this.pageType).subscribe(
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
        err => {
          console.log(err);
        }
      );
    });
  }

  ngOnDestroy() {
    this.globalNav.displayGlobalNav = true;
  }
}
