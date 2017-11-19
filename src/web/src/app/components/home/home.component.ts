import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { DisplayGlobalNavService } from '../../shared/display-global-nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [PagesService]
})

export class HomeComponent implements OnDestroy {

  public slugs: any;
  public page: any;
  public docs: any;
  public docsBody: any;
  public streamfields: any;
  public loading = true;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private globalNav: DisplayGlobalNavService
  ) {
    this.globalNav.displayGlobalNav = false;
    this.pagesService.getAll()
      .subscribe((pages: any) => {
        pages.items.filter((page) => {
          if (page.meta.slug === 'home') {
            this.page = page;
            this.loading = false;
          }
        });
      });
  }

  ngOnDestroy() {
    this.globalNav.displayGlobalNav = true;
  }

}
