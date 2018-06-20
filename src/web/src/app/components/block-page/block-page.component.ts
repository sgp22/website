import { Component, AfterViewInit, HostBinding } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { PagesService } from '../../shared/pages.service';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-block-page',
  templateUrl: './block-page.component.html',
  providers: [PagesService]
})

export class BlockPageComponent implements AfterViewInit {
  public pageContent: any;
  public loading = true;
  public notFound = false;
  @HostBinding('class.ids-row--offset-xl-2')
  @HostBinding('class.ids-row--offset-sm-3')
  @HostBinding('class.ids-row--col-sm-9')
  @HostBinding('class.ids-row--col-xl-10') grid = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private loadingBar: LoadingBarService
  ) { }

  ngAfterViewInit() {

    this.route.url.subscribe(urlSegment => {
      this.loadingBar.start();
      window.scroll(0, 0);
      this.pagesService.createPage(this.router.url)
        .subscribe(
          res => {
            this.pageContent = res;
          },
          err => {
            this.loadingBar.complete();
            this.notFound = true;
            this.loading = false;
          },
          () => {
            this.loadingBar.complete();
            this.loading = false;
          }
        );

      (<any>window).ga('set', {
        'dimension2': `${urlSegment[3].path}`,
        'dimension3': `${urlSegment[2].path}`,
        'dimension4': 'design'
      });
      (<any>window).ga('send', 'pageview');
    });

  }

}
