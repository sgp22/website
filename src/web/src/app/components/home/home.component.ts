import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { DisplayGlobalNavService } from '../../shared/display-global-nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PagesService]
})
export class HomeComponent implements OnInit, OnDestroy {

  public slugs: any;
  public page: any;
  public docs: any;
  public docsBody: any;
  public streamfields: any;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private globalNav: DisplayGlobalNavService
  ) {
  }

  ngOnInit() {

    this.globalNav.displayGlobalNav = false;

    this.pagesService.getAll()
      .subscribe((pages: any) => {
        pages.items.filter((page) => {
          if (page.meta.slug === 'home') {
            this.page = page;
          }
        });
      });
  }

  ngOnDestroy() {
    this.globalNav.displayGlobalNav = true;
  }

}
